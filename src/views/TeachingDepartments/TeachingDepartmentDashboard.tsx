import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const TeachingDepartamentDashboard: React.FC = () => {
  const [teachingDepartament, setTeachingDepartament] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachingDepartament = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/teachingDepartament",
          auth.data.token
        );
        if (statusCode === 200) {
          setTeachingDepartament(data);
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
          text: "Error: unable to fetch active teachingDepartament",
          icon: "error",
        });
      }
    };

    fetchTeachingDepartament();
  }, [auth.data.token]);

  const handleToggleIsActive = async (
    teachingDepartamentId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/teachingDepartament/${teachingDepartamentId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedTeachingDepartament = teachingDepartament.map((teachingDepartament) =>
          teachingDepartament.id === teachingDepartamentId
            ? { ...teachingDepartament, is_active: !isActive }
            : teachingDepartament
        );
        setTeachingDepartament(updatedTeachingDepartament);
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
      `/approach/${id}`,
      auth.data.token
    );
    window.location.reload();
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de Departamento Docente</h1>
        <button
          onClick={() => navigate("/create-approach-dashboard")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Departamento Docente
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Docente</th>
            <th className="py-2 px-4 border-b text-center">Departamento</th>
            <th className="py-2 px-4 border-b text-center">Dedicación</th>
            <th className="py-2 px-4 border-b text-center">Modalidad</th>
            <th className="py-2 px-4 border-b text-center">Fecha Ingreso</th>
            <th className="py-2 px-4 border-b text-center">Fecha Salida</th>
          </tr>
        </thead>
        <tbody>
          {teachingDepartament.map((teachingDepartament) => (
            <tr key={teachingDepartament.id}>
              <td className="py-2 px-4 border-b text-center">
                {teachingDepartament.teaching}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {teachingDepartament.departament}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {teachingDepartament.dedication}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {teachingDepartament.mode}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {teachingDepartament.entrydate}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {teachingDepartament.departuredate}
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                
               <button
                  onClick={() =>
                    navigate(`/read-teachingDepartament/${teachingDepartament.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-teachingDepartament/${teachingDepartament.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(teachingDepartament.id)}
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

export default TeachingDepartamentDashboard;
