import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const ProgramPeDashboard: React.FC = () => {
  const [programPe, setProgramPe] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramPe = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/programPe",
          auth.data.token
        );
        if (statusCode === 200) {
          setProgramPe(data);
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
          text: "Error: unable to fetch active programPe",
          icon: "error",
        });
      }
    };

    fetchProgramPe();
  }, [auth.data.token]);

  const handleToggleIsActive = async (
    programPeId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/programPe/${programPeId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedProgramPe = programPe.map((programPe) =>
          programPe.id === programPeId
            ? { ...programPe, is_active: !isActive }
            : programPe
        );
        setProgramPe(updatedProgramPe);
        Swal.fire({
          title: "Success",
          text: "programPe actualizado con exito",
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
        <h1 className="text-2xl font-bold mb-4">Tablero de Programa Pe</h1>
        <button
          onClick={() => navigate("/create-approach-dashboard")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Programa Pe
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Practica Estrategia</th>
            <th className="py-2 px-4 border-b text-center">Programa</th>
          </tr>
        </thead>
        <tbody>
          {programPe.map((programPe) => (
            <tr key={programPe.id}>
              <td className="py-2 px-4 border-b text-center">
                {programPe.practicestrategy}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {programPe.program}
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
               <button
                  onClick={() =>
                    navigate(`/read-programPe/${programPe.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-programPe/${programPe.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(programPe.id)}
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

export default ProgramPeDashboard;
