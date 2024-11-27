import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AcademicActivityDashboard: React.FC = () => {
  const [academicActivities, setAcademicActivities] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcademicActivities = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/academic-activities",
          auth.data.token
        );
        if (statusCode === 200) {
          setAcademicActivities(data);
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
          text: "Error: unable to fetch academic activities",
          icon: "error",
        });
      }
    };

    fetchAcademicActivities();
  }, [auth.data.token]);

  const handleToggleIsActive = async (id: string, isActive: boolean) => {
    try {
      const response = await Api.patch(
        `/academic-activities/${id}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedActivities = academicActivities.map((activity) =>
          activity.id === id
            ? { ...activity, is_active: !isActive }
            : activity
        );
        setAcademicActivities(updatedActivities);
        Swal.fire({
          title: "Success",
          text: "Actividad académica actualizada con éxito",
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
    try {
      const response = await Api.delete(
        `/academic-activities/${id}`,
        auth.data.token
      );
      if (response.statusCode === 200) {
        Swal.fire({
          title: "Eliminado",
          text: "La actividad académica ha sido eliminada con éxito",
          icon: "success",
        });
        setAcademicActivities(
          academicActivities.filter((activity) => activity.id !== id)
        );
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error al intentar eliminar la actividad académica",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de Actividades Académicas</h1>
        <button
          onClick={() => navigate("/create-academic-activities")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Actividad
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">ID</th>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Créditos</th>
            <th className="py-2 px-4 border-b text-center">Tipo</th>
            <th className="py-2 px-4 border-b text-center">Área de Formación</th>
            <th className="py-2 px-4 border-b text-center">Horas de Acompañamiento</th>
            <th className="py-2 px-4 border-b text-center">Horas Independientes</th>
            <th className="py-2 px-4 border-b text-center">Idioma</th>
            <th className="py-2 px-4 border-b text-center">Es Espejo</th>
            <th className="py-2 px-4 border-b text-center">Entidad Espejo</th>
            <th className="py-2 px-4 border-b text-center">País Espejo</th>
            <th className="py-2 px-4 border-b text-center">Programa Asociado</th>
            <th className="py-2 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {academicActivities.map((activity) => (
            <tr key={activity.id}>
              <td className="py-2 px-4 border-b text-center">{activity.id}</td>
              <td className="py-2 px-4 border-b text-center">{activity.name}</td>
              <td className="py-2 px-4 border-b text-center">{activity.credits}</td>
              <td className="py-2 px-4 border-b text-center">{activity.type}</td>
              <td className="py-2 px-4 border-b text-center">{activity.trainingArea}</td>
              <td className="py-2 px-4 border-b text-center">{activity.hAcom}</td>
              <td className="py-2 px-4 border-b text-center">{activity.hIndep}</td>
              <td className="py-2 px-4 border-b text-center">{activity.language}</td>
              <td className="py-2 px-4 border-b text-center">{activity.mirror ? "Sí" : "No"}</td>
              <td className="py-2 px-4 border-b text-center">{activity.mirrorEntity}</td>
              <td className="py-2 px-4 border-b text-center">{activity.mirrorCountry}</td>
              <td className="py-2 px-4 border-b text-center">{activity.programmId}</td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/read-academic-activities/${activity.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-academic-activities/${activity.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(activity.id)}
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