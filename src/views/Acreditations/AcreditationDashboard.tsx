import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AcreditationDashboard: React.FC = () => {
  const [accreditations, setAccreditations] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccreditations = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/accreditations",
          auth.data.token
        );
        if (statusCode === 200) {
          setAccreditations(data);
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
          text: "Error: unable to fetch accreditations",
          icon: "error",
        });
      }
    };

    fetchAccreditations();
  }, [auth.data.token]);

  const handleToggleIsActive = async (
    resolution: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/accreditations/${resolution}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedAccreditations = accreditations.map((accreditation) =>
          accreditation.resolution === resolution
            ? { ...accreditation, is_active: !isActive }
            : accreditation
        );
        setAccreditations(updatedAccreditations);
        Swal.fire({
          title: "Success",
          text: "Acreditación actualizada con éxito",
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

  const deletion = async (resolution: any) => {
    try {
      const response = await Api.delete(
        `/accreditations/${resolution}`,
        auth.data.token
      );
      if (response.statusCode === 200) {
        Swal.fire({
          title: "Eliminado",
          text: "La acreditación ha sido eliminada con éxito",
          icon: "success",
        });
        setAccreditations(
          accreditations.filter(
            (accreditation) => accreditation.resolution !== resolution
          )
        );
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error al intentar eliminar la acreditación",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de Acreditaciones</h1>
        <button
          onClick={() => navigate("/create-accreditation")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Acreditación
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Resolución</th>
            <th className="py-2 px-4 border-b text-center">Tipo</th>
            <th className="py-2 px-4 border-b text-center">Calificación</th>
            <th className="py-2 px-4 border-b text-center">Fecha de Inicio</th>
            <th className="py-2 px-4 border-b text-center">Fecha de Fin</th>
            <th className="py-2 px-4 border-b text-center">
              Programa Asociado
            </th>
            <th className="py-2 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {accreditations.map((accreditation) => (
            <tr key={accreditation.resolution}>
              <td className="py-2 px-4 border-b text-center">
                {accreditation.resolution}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {accreditation.type}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {accreditation.qualification}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {accreditation.startDate}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {accreditation.endDate}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {accreditation.programmId}
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/read-accreditation/${accreditation.resolution}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-accreditation/${accreditation.resolution}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(accreditation.resolution)}
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