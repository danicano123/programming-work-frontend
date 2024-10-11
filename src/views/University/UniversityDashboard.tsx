import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const UniversityDashboard: React.FC = () => {
  const [university, setUniversity] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/university",
          auth.data.token
        );
        if (statusCode === 200) {
          setUniversity(data);
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
          text: "Error: unable to fetch active university",
          icon: "error",
        });
      }
    };

    fetchUniversity();
  }, [auth.data.token]);

  const handleToggleIsActive = async (universityId: string) => {
    try {
      const response = await Api.patch(
        `/university/toggle-is-active${universityId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedUniversity = university.map((university) =>
          university.id === universityId
            ? { ...university, isActive: data.isActive }
            : university
        );
        setUniversity(updatedUniversity);
        Swal.fire({
          title: "Success",
          text: "Universidad actualizada exitosamente",
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
      `/university/${id}`,
      auth.data.token
    );
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de universidad</h1>
        <button
          onClick={() => navigate("/create-university")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear universidad
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Tipo de universidad</th>
            <th className="py-2 px-4 border-b text-center">Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {university?.map((university) => (
            <tr key={university.id}>
              <td className="py-2 px-4 border-b text-center">
                {university.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {university.type}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {university.city}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={university.isActive}
                    onChange={() => handleToggleIsActive(university.id)}
                  />
                  <span>
                    {university.isActive ? "Activo" : "Inactivo"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
              <button
                  onClick={() =>
                    navigate(`/read-university/${university.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-university/${university.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(university.id)}
                  
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

export default UniversityDashboard;
