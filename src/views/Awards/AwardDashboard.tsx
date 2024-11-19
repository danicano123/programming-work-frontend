import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AwardDashboard: React.FC = () => {
  const [award, setAward] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAward = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/award",
          auth.data.token
        );
        if (statusCode === 200) {
          setAward(data);
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
          text: "Error: unable to fetch active Award",
          icon: "error",
        });
      }
    };

    fetchAward();
  }, [auth.data.token]);

  const handleToggleIsActive = async (awardId: string) => {
    try {
      const response = await Api.patch(
        `/award/toggle-is-active${awardId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedAward = award.map((award) =>
          award.id === awardId
            ? { ...award, isActive: data.isActive }
            : award
        );
        setAward(updatedAward);
        Swal.fire({
          title: "Success",
          text: "Premio actualizada exitosamente",
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
      `/award/${id}`,
      auth.data.token
    );
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de premios</h1>
        <button
          onClick={() => navigate("/create-award")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear premio
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Descripción</th>
            <th className="py-2 px-4 border-b text-center">Fecha</th>
            <th className="py-2 px-4 border-b text-center">Entidad otorgante</th>
            <th className="py-2 px-4 border-b text-center">Pais</th>
          </tr>
        </thead>
        <tbody>
          {award?.map((award) => (
            <tr key={award.id}>
              <td className="py-2 px-4 border-b text-center">
                {award.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {award.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {award.date}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {award.granting_entity}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {award.country}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={award.isActive}
                    onChange={() => handleToggleIsActive(award.id)}
                  />
                  <span>
                    {award.isActive ? "Activo" : "Inactivo"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
              <button
                  onClick={() =>
                    navigate(`/read-award/${award.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-award/${award.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(award.id)}
                  
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

export default AwardDashboard;