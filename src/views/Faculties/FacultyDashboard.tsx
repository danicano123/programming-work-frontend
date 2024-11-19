import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const FacultyDashboard: React.FC = () => {
  const [faculty, setFaculty] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/faculty",
          auth.data.token
        );
        if (statusCode === 200) {
          setFaculty(data);
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
          text: "Error: unable to fetch active faculty",
          icon: "error",
        });
      }
    };

    fetchFaculty();
  }, [auth.data.token]);

  const handleToggleIsActive = async (facultyId: string) => {
    try {
      const response = await Api.patch(
        `/faculty/toggle-is-active${facultyId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedFaculty = faculty.map((faculty) =>
          faculty.id === facultyId
            ? { ...faculty, isActive: data.isActive }
            : faculty
        );
        setFaculty(updatedFaculty);
        Swal.fire({
          title: "Success",
          text: "Facultad actualizada exitosamente",
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
      `/faculty/${id}`,
      auth.data.token
    );
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de facultad</h1>
        <button
          onClick={() => navigate("/create-faculty")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear facultad
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Tipo de facultad</th>
            <th className="py-2 px-4 border-b text-center">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {faculty?.map((faculty) => (
            <tr key={faculty.id}>
              <td className="py-2 px-4 border-b text-center">
                {faculty.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {faculty.type}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {faculty.date}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={faculty.isActive}
                    onChange={() => handleToggleIsActive(faculty.id)}
                  />
                  <span>
                    {faculty.isActive ? "Activo" : "Inactivo"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
              <button
                  onClick={() =>
                    navigate(`/read-faculty/${faculty.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-university/${faculty.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(faculty.id)}
                  
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

export default FacultyDashboard;