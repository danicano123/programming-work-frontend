import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const QualifiedRegistryDashboard: React.FC = () => {
  const [qualifiedRegistries, setQualifiedRegistries] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQualifiedRegistries = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/qualifiedRegistry",
          auth.data.token
        );
        if (statusCode === 200) {
          setQualifiedRegistries(data);
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
          text: "Error: unable to fetch qualified registries",
          icon: "error",
        });
      }
    };

    fetchQualifiedRegistries();
  }, [auth.data.token]);

  const handleToggleIsActive = async (id: string, isActive: boolean) => {
    try {
      const response = await Api.patch(
        `/qualifiedRegistry/${id}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedRegistries = qualifiedRegistries.map((registry) =>
          registry.id === id
            ? { ...registry, is_active: !isActive }
            : registry
        );
        setQualifiedRegistries(updatedRegistries);
        Swal.fire({
          title: "Success",
          text: "Registro actualizado con éxito",
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
        `/qualifiedRegistry/${id}`,
        auth.data.token
      );
      if (response.statusCode === 200) {
        Swal.fire({
          title: "Eliminado",
          text: "El registro calificado ha sido eliminado con éxito",
          icon: "success",
        });
        setQualifiedRegistries(
          qualifiedRegistries.filter((registry) => registry.id !== id)
        );
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error al intentar eliminar el registro calificado",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de Registros Calificados</h1>
        <button
          onClick={() => navigate("/create-qualified-registry")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Registro
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">ID</th>
            <th className="py-2 px-4 border-b text-center">Créditos</th>
            <th className="py-2 px-4 border-b text-center">Horas ACOM</th>
            <th className="py-2 px-4 border-b text-center">Horas Independientes</th>
            <th className="py-2 px-4 border-b text-center">Metodología</th>
            <th className="py-2 px-4 border-b text-center">Fecha de Inicio</th>
            <th className="py-2 px-4 border-b text-center">Fecha de Fin</th>
            <th className="py-2 px-4 border-b text-center">Duración (Años)</th>
            <th className="py-2 px-4 border-b text-center">Duración (Semestres)</th>
            <th className="py-2 px-4 border-b text-center">Tipo de Título</th>
            <th className="py-2 px-4 border-b text-center">Programa Asociado</th>
            <th className="py-2 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {qualifiedRegistries.map((registry) => (
            <tr key={registry.id}>
              <td className="py-2 px-4 border-b text-center">{registry.id}</td>
              <td className="py-2 px-4 border-b text-center">{registry.creditAmount}</td>
              <td className="py-2 px-4 border-b text-center">{registry.acomHours}</td>
              <td className="py-2 px-4 border-b text-center">{registry.independentHours}</td>
              <td className="py-2 px-4 border-b text-center">{registry.metodology}</td>
              <td className="py-2 px-4 border-b text-center">{registry.startDate}</td>
              <td className="py-2 px-4 border-b text-center">{registry.endDate}</td>
              <td className="py-2 px-4 border-b text-center">{registry.durationYears}</td>
              <td className="py-2 px-4 border-b text-center">{registry.durationSemesters}</td>
              <td className="py-2 px-4 border-b text-center">{registry.degreeType}</td>
              <td className="py-2 px-4 border-b text-center">{registry.programmId}</td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/read-qualified-registry/${registry.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-qualified-registry/${registry.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(registry.id)}
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

export default QualifiedRegistryDashboard;