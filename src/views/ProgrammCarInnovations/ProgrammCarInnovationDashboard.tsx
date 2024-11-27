import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const ProgrammCarInnovationDashboard: React.FC = () => {
  const [programmCarInnovation, setProgrammCarInnovation] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgrammCarInnovation = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/programm-car-innovations",
          auth.data.token
        );
        if (statusCode === 200) {
          setProgrammCarInnovation(data);
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
          text: "Error: unable to fetch active programm car innovation",
          icon: "error",
        });
      }
    };

    fetchProgrammCarInnovation();
  }, [auth.data.token]);

  const handleToggleIsActive = async (
    programmCarInnovationId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/programm-car-innovations/${programmCarInnovationId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedProgrammCarInnovation = programmCarInnovation.map((programmCarInnovation) =>
          programmCarInnovation.id === programmCarInnovationId
            ? { ...programmCarInnovation, is_active: !isActive }
            : programmCarInnovation
        );
        setProgrammCarInnovation(updatedProgrammCarInnovation);
        Swal.fire({
          title: "Success",
          text: "Programm Car Innovation actualizado con exito",
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
      `/programm-car-innovations/${id}`,
      auth.data.token
    );
    window.location.reload();
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de Programa Car Innovación</h1>
        <button
          onClick={() => navigate("/create-programm-car-innovations")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Programa Car Innovación
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Programa</th>
            <th className="py-2 px-4 border-b text-center">Innovación automovilística</th>
          </tr>
        </thead>
        <tbody>
          {programmCarInnovation.map((programmCarInnovation) => (
            <tr key={programmCarInnovation.id}>
              <td className="py-2 px-4 border-b text-center">
                {programmCarInnovation.programmId}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {programmCarInnovation.carInnovationId}
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
               <button
                  onClick={() =>
                    navigate(`/read-programm-car-innovations/${programmCarInnovation.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-programm-car-innovations/${programmCarInnovation.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(programmCarInnovation.id)}
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

export default ProgrammCarInnovationDashboard;
