import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const NormativeAspectProgrammDashboard: React.FC = () => {
  const [normativeAspectProgramm, setNormativeAspectProgramm] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNormativeAspectProgramm = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/normative-aspect-programm",
          auth.data.token
        );
        if (statusCode === 200) {
          setNormativeAspectProgramm(data);
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
          text: "Error: unable to fetch active normativeAspectProgramm",
          icon: "error",
        });
      }
    };

    fetchNormativeAspectProgramm();
  }, [auth.data.token]);

  const handleToggleIsActive = async (normativeAspectProgrammId: string) => {
    try {
      const response = await Api.patch(
        `/normative-aspect-programm/toggle-is-active/${normativeAspectProgrammId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedNormativeAspectProgramm = normativeAspectProgramm.map((normativeAspectProgramm) =>
          normativeAspectProgramm.id === normativeAspectProgrammId
            ? { ...normativeAspectProgramm, isActive: data.isActive }
            : normativeAspectProgramm
        );
        setNormativeAspectProgramm(updatedNormativeAspectProgramm);
        Swal.fire({
          title: "Success",
          text: "Programa Aspecto Normativo actualizada exitosamente",
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
      `/normative-aspect-programm/${id}`,
      auth.data.token
    );
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero Programa Aspecto Normativo </h1>
        <button
          onClick={() => navigate("/create-normative-aspect-programm")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Programa Aspecto Normativo
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Aspecto Normativo</th>
            <th className="py-2 px-4 border-b text-center">Programa</th>
          </tr>
        </thead>
        <tbody>
          {normativeAspectProgramm?.map((normativeAspectProgramm) => (
            <tr key={normativeAspectProgramm.id}>
              <td className="py-2 px-4 border-b text-center">
                {normativeAspectProgramm.normativeAspectId}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {normativeAspectProgramm.programmId}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={normativeAspectProgramm.isActive}
                    onChange={() => handleToggleIsActive(normativeAspectProgramm.id)}
                  />
                  <span>
                    {normativeAspectProgramm.isActive ? "Activo" : "Inactivo"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
              <button
                  onClick={() =>
                    navigate(`/read-normative-aspect-programm/${normativeAspectProgramm.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-normative-aspect-programm/${normativeAspectProgramm.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(normativeAspectProgramm.id)}
                  
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

export default NormativeAspectProgrammDashboard;