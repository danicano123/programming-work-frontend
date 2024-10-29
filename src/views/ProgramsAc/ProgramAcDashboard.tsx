import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const ProgramAcDashboard: React.FC = () => {
  const [programAc, setProgramAc] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramAc = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/programAc",
          auth.data.token
        );
        if (statusCode === 200) {
          setProgramAc(data);
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
          text: "Error: unable to fetch active programAc",
          icon: "error",
        });
      }
    };

    fetchProgramAc();
  }, [auth.data.token]);

  const handleToggleIsActive = async (
    programAcId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/programAc/${programAcId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedProgramAc = programAc.map((programAc) =>
          programAc.id === programAc
            ? { ...programAc, is_active: !isActive }
            : programAc
        );
        setProgramAc(updatedProgramAc);
        Swal.fire({
          title: "Success",
          text: "Enfoque actualizado con exito",
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
        <h1 className="text-2xl font-bold mb-4">Tablero de Programa Ac</h1>
        <button
          onClick={() => navigate("/create-approach-dashboard")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Programa Ac
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Programa</th>
            <th className="py-2 px-4 border-b text-center">Area Conocimiento</th>
          </tr>
        </thead>
        <tbody>
          {programAc.map((programAc) => (
            <tr key={programAc.id}>
              <td className="py-2 px-4 border-b text-center">
                {programAc.program}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {programAc.knowledgearea}
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
               <button
                  onClick={() =>
                    navigate(`/read-programAc/${programAc.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-programAc/${programAc.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(programAc.id)}
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

export default ProgramAcDashboard;
