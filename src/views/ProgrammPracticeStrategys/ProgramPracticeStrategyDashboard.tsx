import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const ProgrammPracticeStrategyDashboard: React.FC = () => {
  const [programmPracticeStrategy, setProgrammPracticeStrategy] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgrammPracticeStrategy = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/programm-practice-strategys",
          auth.data.token
        );
        if (statusCode === 200) {
          setProgrammPracticeStrategy(data);
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
          text: "Error: unable to fetch active programmPracticeStrategy",
          icon: "error",
        });
      }
    };

    fetchProgrammPracticeStrategy();
  }, [auth.data.token]);

  const handleToggleIsActive = async (programmPracticeStrategyId: string) => {
    try {
      const response = await Api.patch(
        `/programm-practice-strategys/toggle-is-active/${programmPracticeStrategyId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedProgrammPracticeStrategy = programmPracticeStrategy.map((programmPracticeStrategy) =>
          programmPracticeStrategy.id === programmPracticeStrategyId
            ? { ...programmPracticeStrategy, isActive: data.isActive }
            : programmPracticeStrategy
        );
        setProgrammPracticeStrategy(updatedProgrammPracticeStrategy);
        Swal.fire({
          title: "Success",
          text: "programmPracticeStrategy actualizada exitosamente",
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
      `/programm-practice-strategys/${id}`,
      auth.data.token
    );
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de Programa Practica Estrategica</h1>
        <button
          onClick={() => navigate("/create-programm-practice-strategys")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Programa Practica Estrategica
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Programa</th>
            <th className="py-2 px-4 border-b text-center">Practica Estrategica</th>
          </tr>
        </thead>
        <tbody>
          {programmPracticeStrategy?.map((programmPracticeStrategy) => (
            <tr key={programmPracticeStrategy.id}>
              <td className="py-2 px-4 border-b text-center">
                {programmPracticeStrategy.programmId}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {programmPracticeStrategy.practiceStrategyId}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={programmPracticeStrategy.isActive}
                    onChange={() => handleToggleIsActive(programmPracticeStrategy.id)}
                  />
                  <span>
                    {programmPracticeStrategy.isActive ? "Activo" : "Inactivo"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
              <button
                  onClick={() =>
                    navigate(`/read-programm-practice-strategys/${programmPracticeStrategy.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-programm-practice-strategys/${programmPracticeStrategy.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(programmPracticeStrategy.id)}
                  
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

export default ProgrammPracticeStrategyDashboard;
