import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AcademicActivityDashboard: React.FC = () => {
  const [academicActivity, setAcademicActivity] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcademicActivity = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/academic-activity",
          auth.data.token
        );
        if (statusCode === 200) {
          setAcademicActivity(data);
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
          text: "Error: unable to fetch active academic activity",
          icon: "error",
        });
      }
    };

    fetchAcademicActivity();
  }, [auth.data.token]);

  const handleToggleIsActive = async (academicActivityId: string) => {
    try {
      const response = await Api.patch(
        `/academic-activity/toggle-is-active${academicActivityId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedAcademicActivity = academicActivity.map((academicActivity) =>
          academicActivity.id === academicActivityId
            ? { ...academicActivity, isActive: data.isActive }
            : academicActivity
        );
        setAcademicActivity(updatedAcademicActivity);
        Swal.fire({
          title: "Success",
          text: "Actividad académica actualizada exitosamente",
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
      `/academic-activity/${id}`,
      auth.data.token
    );
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de actividad académica</h1>
        <button
          onClick={() => navigate("/create-academic-activity")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear actividad académica
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Número de créditos</th>
            <th className="py-2 px-4 border-b text-center">Área de formación</th>
            <th className="py-2 px-4 border-b text-center">Hora acompañado</th>
            <th className="py-2 px-4 border-b text-center">Hora independiente</th>
            <th className="py-2 px-4 border-b text-center">Idioma</th>
            <th className="py-2 px-4 border-b text-center">Entidad espejo</th>
            <th className="py-2 px-4 border-b text-center">País espejo</th>
          </tr>
        </thead>
        <tbody>
          {academicActivity?.map((academicActivity) => (
            <tr key={academicActivity.id}>
              <td className="py-2 px-4 border-b text-center">
                {academicActivity.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {academicActivity.number_credits}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {academicActivity.training_area}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {academicActivity.accompanied_hour}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {academicActivity.independent_hour}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {academicActivity.language}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {academicActivity.mirror_entity}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {academicActivity.mirror_country}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={academicActivity.isActive}
                    onChange={() => handleToggleIsActive(academicActivity.id)}
                  />
                  <span>
                    {academicActivity.isActive ? "Activo" : "Inactivo"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
              <button
                  onClick={() =>
                    navigate(`/read-academic-activity/${academicActivity.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-academic-activity/${academicActivity.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(academicActivity.id)}
                  
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

export default AcademicActivityDashboard;
