import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AwardDashboard: React.FC = () => {
  const [awards, setAwards] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const { data, statusCode } = await Api.get("/awards", auth.data.token);
        if (statusCode === 200) {
          setAwards(data);
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
          text: "Error: unable to fetch awards",
          icon: "error",
        });
      }
    };

    fetchAwards();
  }, [auth.data.token]);

  const handleDelete = async (id: string) => {
    try {
      const response = await Api.delete(`/awards/${id}`, auth.data.token);
      if (response.statusCode === 200) {
        Swal.fire({
          title: "Eliminado",
          text: "El premio ha sido eliminado con éxito",
          icon: "success",
        });
        setAwards(awards.filter((award) => award.id !== id));
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error al intentar eliminar el premio",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tablero de Premios</h1>
        <button
          onClick={() => navigate("/create-award")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Premio
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">ID</th>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Descripción</th>
            <th className="py-2 px-4 border-b text-center">Fecha</th>
            <th className="py-2 px-4 border-b text-center">Entidad Otorgante</th>
            <th className="py-2 px-4 border-b text-center">País</th>
            <th className="py-2 px-4 border-b text-center">Programa Asociado</th>
            <th className="py-2 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {awards.map((award) => (
            <tr key={award.id}>
              <td className="py-2 px-4 border-b text-center">{award.id}</td>
              <td className="py-2 px-4 border-b text-center">{award.name}</td>
              <td className="py-2 px-4 border-b text-center">{award.description}</td>
              <td className="py-2 px-4 border-b text-center">{award.date}</td>
              <td className="py-2 px-4 border-b text-center">{award.grantingEntity}</td>
              <td className="py-2 px-4 border-b text-center">{award.country}</td>
              <td className="py-2 px-4 border-b text-center">{award.programmId}</td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() => navigate(`/read-award/${award.id}`)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() => navigate(`/edit-award/${award.id}`)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(award.id)}
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

export default AwardDashboard;