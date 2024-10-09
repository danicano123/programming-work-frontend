import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const PracticeStrategysDashboard: React.FC = () => {
  const [practiceStrategys, setPracticeStrategys] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPracticeStrategys = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/practice-strategys",
          auth.data.token
        );
        if (statusCode === 200) {
          setPracticeStrategys(data);
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
          text: "Error: unable to fetch active practiceStrategys",
          icon: "error",
        });
      }
    };

    fetchPracticeStrategys();
  }, [auth.data.token]);

  const handleToggleIsActive = async (practiceStrategysId: string) => {
    try {
      const response = await Api.post(
        `/practice-strategys/toggle-is-active/${practiceStrategysId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedPracticeStrategys = practiceStrategys.map(
          (practiceStrategys) =>
            practiceStrategys.id === practiceStrategysId
              ? { ...practiceStrategys, isActive: data.isActive }
              : practiceStrategys
        );
        setPracticeStrategys(updatedPracticeStrategys);
        Swal.fire({
          title: "Success",
          text: "practice-strategys updated successfully",
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
      `/practice-strategys/${id}`,
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
          onClick={() => navigate("/create-practice-strategys")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Estrategia de Practica
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Tipo</th>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {practiceStrategys?.map((practiceStrategys) => (
            <tr key={practiceStrategys.id}>
              <td className="py-2 px-4 border-b text-center">
                {practiceStrategys.type}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {practiceStrategys.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {practiceStrategys.source}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={practiceStrategys.isActive}
                    onChange={() => handleToggleIsActive(practiceStrategys.id)}
                  />
                  <span>
                    {practiceStrategys.isActive ? "Activo" : "Inactivo"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/read-practice-strategys/${practiceStrategys.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-practice-strategys/${practiceStrategys.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(practiceStrategys.id)}
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

export default PracticeStrategysDashboard;
