import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const QualifiedRegistryApproachDashboard: React.FC = () => {
  const [qualifiedRegistryApproaches, setQualifiedRegistryApproaches] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQualifiedRegistryApproaches = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/qualified-registry-approaches",
          auth.data.token
        );
        if (statusCode === 200) {
          setQualifiedRegistryApproaches(data);
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
          text: "Error: unable to fetch Qualified Registry Approaches",
          icon: "error",
        });
      }
    };

    fetchQualifiedRegistryApproaches();
  }, [auth.data.token]);

  const handleDelete = async (id: string) => {
    try {
      const response = await Api.delete(`/qualified-registry-approaches/${id}`, auth.data.token);
      if (response.statusCode === 200) {
        Swal.fire({
          title: "Eliminado",
          text: "La relación ha sido eliminada con éxito",
          icon: "success",
        });
        setQualifiedRegistryApproaches(
          qualifiedRegistryApproaches.filter((item) => item.id !== id)
        );
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error al intentar eliminar la relación",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tablero de Enfoques del Registro Calificado</h1>
        <button
          onClick={() => navigate("/create-qualified-registry-approach")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Relación
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">ID Registro Calificado</th>
            <th className="py-2 px-4 border-b text-center">ID Enfoque</th>
            <th className="py-2 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {qualifiedRegistryApproaches.map((item) => (
            <tr key={`${item.qualifiedRegistryId}-${item.approachId}`}>
              <td className="py-2 px-4 border-b text-center">{item.qualifiedRegistryId}</td>
              <td className="py-2 px-4 border-b text-center">{item.approachId}</td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(
                      `/edit-qualified-registry-approach/${item.qualifiedRegistryId}/${item.approachId}`
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

export default QualifiedRegistryApproachDashboard;