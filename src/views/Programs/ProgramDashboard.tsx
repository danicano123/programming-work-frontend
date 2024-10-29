import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const ProgramDashboard: React.FC = () => {
  const [program, setProgram] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/program",
          auth.data.token
        );
        if (statusCode === 200) {
          setProgram(data);
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
          text: "Error: unable to fetch active program",
          icon: "error",
        });
      }
    };

    fetchProgram();
  }, [auth.data.token]);

  const handleToggleIsActive = async (
    programId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/program/${programId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedProgram = program.map((program) =>
          program.id === program.Id
            ? { ...program, is_active: !isActive }
            : program
        );
        setProgram(updatedProgram);
        Swal.fire({
          title: "Success",
          text: "Programa actualizado con exito",
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
        <h1 className="text-2xl font-bold mb-4">Tablero de Programa</h1>
        <button
          onClick={() => navigate("/create-program-dashboard")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Programa
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Id</th>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Tipo</th>
            <th className="py-2 px-4 border-b text-center">Nivel</th>
            <th className="py-2 px-4 border-b text-center">Fecha creación</th>
            <th className="py-2 px-4 border-b text-center">Fecha cierre</th>
            <th className="py-2 px-4 border-b text-center">Numero cohortes</th>
            <th className="py-2 px-4 border-b text-center">Cant graduados</th>
            <th className="py-2 px-4 border-b text-center">fecha actualización</th>
            <th className="py-2 px-4 border-b text-center">Ciudad</th>
            <th className="py-2 px-4 border-b text-center">Facultad</th>
          </tr>
        </thead>
        <tbody>
          {program.map((program) => (
            <tr key={program.id}>
              <td className="py-2 px-4 border-b text-center">
                {program.id}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.type}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.level}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.startdate}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.enddate}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.numbercohorts}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.numbergraduates}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.updatedate}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.city}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.faculty}
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
               <button
                  onClick={() =>
                    navigate(`/read-program/${program.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-program/${program.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(program.id)}
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

export default ProgramDashboard;
