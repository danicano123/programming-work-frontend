import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AcreditationDashboard: React.FC = () => {
  const [acreditation, setAcreditation] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcreditation = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/acreditation",
          auth.data.token
        );
        if (statusCode === 200) {
          setAcreditation(data);
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
          text: "Error: unable to fetch active acreditation",
          icon: "error",
        });
      }
    };

    fetchAcreditation();
  }, [auth.data.token]);

  const handleToggleIsActive = async (acreditationId: string) => {
    try {
      const response = await Api.patch(
        `/acreditation/toggle-is-active${acreditationId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedAcreditation = acreditation.map((acreditation) =>
          acreditation.id === acreditationId
            ? { ...acreditation, isActive: data.isActive }
            : acreditation
        );
        setAcreditation(updatedAcreditation);
        Swal.fire({
          title: "Success",
          text: "Acreditación actualizada exitosamente",
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
      `/acreditation/${id}`,
      auth.data.token
    );
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de acreditacion</h1>
        <button
          onClick={() => navigate("/create-acreditation")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear acreditacion
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Tipo</th>
            <th className="py-2 px-4 border-b text-center">Calificacion</th>
            <th className="py-2 px-4 border-b text-center">Fecha inicio</th>
            <th className="py-2 px-4 border-b text-center">Fecha fin</th>
          </tr>
        </thead>
        <tbody>
          {acreditation?.map((acreditation) => (
            <tr key={acreditation.id}>
              <td className="py-2 px-4 border-b text-center">
                {acreditation.type}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {acreditation.calification}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {acreditation.date_init}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {acreditation.date_end}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={acreditation.isActive}
                    onChange={() => handleToggleIsActive(acreditation.id)}
                  />
                  <span>
                    {acreditation.isActive ? "Activo" : "Inactivo"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
              <button
                  onClick={() =>
                    navigate(`/read-acreditation/${acreditation.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-acreditation/${acreditation.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(acreditation.id)}
                  
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

export default AcreditationDashboard;
