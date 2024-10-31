import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const ProgramCiDashboard: React.FC = () => {
  const [programCi, setProgramCi] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramCi = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/programCi",
          auth.data.token
        );
        if (statusCode === 200) {
          setProgramCi(data);
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
          text: "Error: unable to fetch active approach",
          icon: "error",
        });
      }
    };

    fetchProgramCi();
  }, [auth.data.token]);

  const handleToggleIsActive = async (
    approachId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/programCi/${approachId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedProgramCi = programCi.map((programCi) =>
          programCi.id === programCi.Id
            ? { ...programCi, is_active: !isActive }
            : programCi
        );
        setProgramCi(updatedProgramCi);
        Swal.fire({
          title: "Success",
          text: "Programa Ci actualizado con exito",
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
        <h1 className="text-2xl font-bold mb-4">Tablero de Programa Ci</h1>
        <button
          onClick={() => navigate("/create-approach-dashboard")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Programa Ci
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Programa</th>
            <th className="py-2 px-4 border-b text-center">Innovación automovilística</th>
          </tr>
        </thead>
        <tbody>
          {programCi.map((programCi) => (
            <tr key={programCi.id}>
              <td className="py-2 px-4 border-b text-center">
                {programCi.program}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {programCi.carinnovacion}
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
               <button
                  onClick={() =>
                    navigate(`/read-programCi/${programCi.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-programCi/${programCi.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(programCi.id)}
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

export default ProgramCiDashboard;
