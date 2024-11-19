import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AllianceDashboard: React.FC = () => {
  const [alliance, setAlliance] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlliance = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/alliances",
          auth.data.token
        );
        if (statusCode === 200) {
          setAlliance(data);
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
          text: "Error: unable to fetch active alliance",
          icon: "error",
        });
      }
    };

    fetchAlliance();
  }, [auth.data.token]);

  const handleToggleIsActive = async (
    allianceId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/alliances/${allianceId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedAlliance = alliance.map((alliance) =>
          alliance.id === allianceId
            ? { ...alliance, is_active: !isActive }
            : alliance
        );
        setAlliance(updatedAlliance);
        Swal.fire({
          title: "Success",
          text: "Alianza actualizado con exito",
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
      `/alliances/${id}`,
      auth.data.token
    );
    window.location.reload();
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de Alianza</h1>
        <button
          onClick={() => navigate("/create-alliance")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Alianza
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Aliado</th>
            <th className="py-2 px-4 border-b text-center">Departamento</th>
            <th className="py-2 px-4 border-b text-center">Fecha Inicio</th>
            <th className="py-2 px-4 border-b text-center">Fecha Fin</th>
            <th className="py-2 px-4 border-b text-center">Docente</th>
          </tr>
        </thead>
        <tbody>
          {alliance.map((alliance) => (
            <tr key={alliance.id}>
              <td className="py-2 px-4 border-b text-center">
                {alliance.allied}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {alliance.departament}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {alliance.startdate}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {alliance.enddate}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {alliance.teaching}
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
               <button
                  onClick={() =>
                    navigate(`/read-alliance/${alliance.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-alliance/${alliance.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(alliance.id)}
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

export default AllianceDashboard;
