import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const TeacherProgramsDashboard: React.FC = () => {
  const [teacherPrograms, setTeacherPrograms] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherPrograms = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/teacher-programs",
          auth.data.token
        );
        if (statusCode === 200) {
          setTeacherPrograms(data);
        } else {
          Swal.fire({
            title: "Error",
            text: `${data.message}`,
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Error: unable to fetch active teacher-programs",
          icon: "error",
        });
      }
    };

    fetchTeacherPrograms();
  }, [auth.data.token]);

  const handleToggleIsActive = async (
    teachingDepartamentId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/teacher-programs/${teachingDepartamentId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedTeacherPrograms = teacherPrograms.map((teacherPrograms) =>
          teacherPrograms.id === teacherPrograms.Id
            ? { ...teacherPrograms, is_active: !isActive }
            : teacherPrograms
        );
        setTeacherPrograms(updatedTeacherPrograms);
        Swal.fire({
          title: "Success",
          text: "Docente Departamento actualizado con exito",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: `${data.message}`,
          icon: "error",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const deletion = async (id: any) => {
    const response = await Api.delete(
      `/teacher-programs/${id}`,
      auth.data.token
    );
    window.location.reload();
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de Programa Docente</h1>
        <button
          onClick={() => navigate("/create-teacher-programs")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Programa Docente
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Docente</th>
            <th className="py-2 px-4 border-b text-center">Programa</th>
            <th className="py-2 px-4 border-b text-center">Dedicación</th>
            <th className="py-2 px-4 border-b text-center">Modalidad</th>
            <th className="py-2 px-4 border-b text-center">Fecha Inicio</th>
            <th className="py-2 px-4 border-b text-center">Fecha Fin</th>
          </tr>
        </thead>
        <tbody>
          {teacherPrograms.map((teacherPrograms) => (
            <tr key={teacherPrograms.id}>
              <td className="py-2 px-4 border-b text-center">
                {teacherPrograms.teacherId}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {teacherPrograms.programmId}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {teacherPrograms.dedication}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {teacherPrograms.modality}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {teacherPrograms.startDate}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {teacherPrograms.endDate}
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                
               <button
                  onClick={() =>
                    navigate(`/read-teacher-programs/${teacherPrograms.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-teacher-programs/${teacherPrograms.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(teacherPrograms.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherProgramsDashboard;
