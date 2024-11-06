import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AnProgramDashboard: React.FC = () => {
  const [anProgram, setAnProgram] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnProgram = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/NormativeAspectProgramm",
          auth.data.token
        );
        if (statusCode === 200) {
          setAnProgram(data);
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
          text: "Error: unable to fetch active anProgram",
          icon: "error",
        });
      }
    };

    fetchAnProgram();
  }, [auth.data.token]);

  const handleToggleIsActive = async (
    approachId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/anProgram/${approachId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedAnProgram = anProgram.map((anProgram) =>
          anProgram.id === anProgram.Id
            ? { ...anProgram, is_active: !isActive }
            : anProgram
        );
        setAnProgram(updatedAnProgram);
        Swal.fire({
          title: "Success",
          text: "An Programa actualizado con exito",
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
        <h1 className="text-2xl font-bold mb-4">Tablero Programa Aspecto Normativo</h1>
        <button
          onClick={() => navigate("/create-NormativeAspectProgramm")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear An Programa
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Aspecto Normativo</th>
            <th className="py-2 px-4 border-b text-center">Programa</th>
          </tr>
        </thead>
        <tbody>
          {anProgram.map((anProgram) => (
            <tr key={anProgram.id}>
              <td className="py-2 px-4 border-b text-center">
                {anProgram.normativeaspects}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {anProgram.program}
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
               <button
                  onClick={() =>
                    navigate(`/read-anProgram/${anProgram.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-anProgram/${anProgram.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(anProgram.id)}
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

export default AnProgramDashboard;
