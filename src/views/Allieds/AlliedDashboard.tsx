import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AlliedDashboard: React.FC = () => {
  const [allied, setAllied] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllied = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/allied",
          auth.data.token
        );
        if (statusCode === 200) {
          setAllied(data);
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
          text: "Error: unable to fetch active Allied",
          icon: "error",
        });
      }
    };

    fetchAllied();
  }, [auth.data.token]);

  const handleToggleIsActive = async (alliedId: string) => {
    try {
      const response = await Api.post(
        `/allied/toggle-is-active/${alliedId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedAllied = allied.map(
          (allied) =>
            allied.id === alliedId
              ? { ...allied, isActive: data.isActive }
              : allied
        );
        setAllied(updatedAllied);
        Swal.fire({
          title: "Success",
          text: "allied updated successfully",
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
      `/allied/${id}`,
      auth.data.token
    );
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">
          Tablero de Aliado
        </h1>
        <button
          onClick={() => navigate("/create-allied")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Aliado
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Razon Social</th>
            <th className="py-2 px-4 border-b text-center">Nombre Contacto</th>
            <th className="py-2 px-4 border-b text-center">Telefono</th>
            <th className="py-2 px-4 border-b text-center">Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {allied?.map((allied) => (
            <tr key={allied.id}>
              <td className="py-2 px-4 border-b text-center">
                {allied.company_reason}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {allied.contact_name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {allied.phone}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {allied.city}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={allied.isActive}
                    onChange={() => handleToggleIsActive(allied.id)}
                  />
                  <span>
                    {allied.isActive ? "Activo" : "Inactivo"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/read-allied/${allied.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-allied/${allied.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(allied.id)}
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

export default AlliedDashboard;
