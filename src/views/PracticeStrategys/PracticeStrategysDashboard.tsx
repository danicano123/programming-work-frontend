import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const PracticeStrategyDashboard: React.FC = () => {
  const [practiceStrategy, setPracticeStrategy] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPracticeStrategy = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/practiceStrategy",
          auth.data.token
        );
        if (statusCode === 200) {
          setPracticeStrategy(data);
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
          text: "Error: unable to fetch active practiceStrategy",
          icon: "error",
        });
      }
    };

    fetchPracticeStrategy();
  }, [auth.data.token]);

  const handleToggleIsActive = async (practiceStrategyId: string) => {
    try {
      const response = await Api.post(
        `/practiceStrategy/toggle-is-active/${practiceStrategyId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedPracticeStrategy = practiceStrategy.map(
          (practiceStrategy) =>
            practiceStrategy.id === practiceStrategyId
              ? { ...practiceStrategy, isActive: data.isActive }
              : practiceStrategy
        );
        setPracticeStrategy(updatedPracticeStrategy);
        Swal.fire({
          title: "Success",
          text: "practice-strategy updated successfully",
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
      `/practiceStrategy/${id}`,
      auth.data.token
    );
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">
          Tablero de Estrategia de Practica
        </h1>
        <button
          onClick={() => navigate("/create-practiceStrategy")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Estrategia de Practica
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Id</th>
            <th className="py-2 px-4 border-b text-center">Tipo de Practica</th>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {practiceStrategy?.map((practiceStrategy) => (
            <tr key={practiceStrategy.id}>
              <td className="py-2 px-4 border-b text-center">
                {practiceStrategy.id}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {practiceStrategy.type_practice}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {practiceStrategy.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {practiceStrategy.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={practiceStrategy.isActive}
                    onChange={() => handleToggleIsActive(practiceStrategy.id)}
                  />
                  <span>
                    {practiceStrategy.isActive ? "Activo" : "Inactivo"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/read-practiceStrategy/${practiceStrategy.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-practiceStrategy/${practiceStrategy.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(practiceStrategy.id)}
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

export default PracticeStrategyDashboard;
