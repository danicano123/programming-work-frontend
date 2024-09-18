import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const PracticesDashboard: React.FC = () => {
  const [practices, setPractices] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPractices = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/practices",
          auth.data.token
        );
        if (statusCode === 200) {
          setPractices(data.practices);
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
          text: "Error: unable to fetch active microsites",
          icon: "error",
        });
      }
    };

    fetchPractices();
  }, [auth.data.token]);

  const handleToggleIsActive = async (
    practiceId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/practices/${practiceId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedPractices = practices.map((practice) =>
          practice.id === practiceId
            ? { ...practice, is_active: !isActive }
            : practice
        );
        setPractices(updatedPractices);
        Swal.fire({
          title: "Success",
          text: "Practice updated successfully",
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Practica Estrategia</h1>
        <button
          onClick={() => navigate("./create-practice")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Practica
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Id</th>
            <th className="py-2 px-4 border-b text-center">Tipo</th>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Descripción</th>

          </tr>
        </thead>
        <tbody>
          {practices.map((practice) => (
            <tr key={practice.id}>
              <td className="py-2 px-4 border-b text-center">
                {practice.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {practice.practice_type}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={practice.name}
                  alt={practice.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={practice.is_active}
                    onChange={() =>
                      handleToggleIsActive(practice.id, practice.is_active)
                    }
                  />
                  <span>{practice.is_active ? "Active" : "Inactive"}</span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/dashboard/practices/${practice.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    navigate(`/dashboard/practices/form/${practice.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Form
                </button>
                <button
                  onClick={() =>
                    navigate(`/dashboard/practices/payments/${practice.id}`)
                  }
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Payments
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PracticesDashboard;
