import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const InternshipDashboard: React.FC = () => {
  const [internship, setInternship] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/internship",
          auth.data.token
        );
        if (statusCode === 200) {
          setInternship(data);
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
          text: "Error: unable to fetch active Internship",
          icon: "error",
        });
      }
    };

    fetchInternship();
  }, [auth.data.token]);

  const handleToggleIsActive = async (internshipId: string) => {
    try {
      const response = await Api.post(
        `/internship/toggle-is-active/${internshipId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedInternship = internship.map(
          (internship) =>
            internship.id === internshipId
              ? { ...internship, isActive: data.isActive }
              : internship
        );
        setInternship(updatedInternship);
        Swal.fire({
          title: "Success",
          text: "Internship updated successfully",
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
      `/internship/${id}`,
      auth.data.token
    );
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">
          Tablero de Pasantia
        </h1>
        <button
          onClick={() => navigate("/create-internship")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Pasantia
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Pais</th>
            <th className="py-2 px-4 border-b text-center">Compañia</th>
            <th className="py-2 px-4 border-b text-center">Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {internship?.map((internship) => (
            <tr key={internship.id}>
              <td className="py-2 px-4 border-b text-center">
                {internship.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {internship.country}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {internship.company}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {internship.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={internship.isActive}
                    onChange={() => handleToggleIsActive(internship.id)}
                  />
                  <span>
                    {internship.isActive ? "Activo" : "Inactivo"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/read-internship/${internship.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-internship/${internship.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(internship.id)}
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

export default InternshipDashboard;