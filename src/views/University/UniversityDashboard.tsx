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
          setUniversity(data.microsites);
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

  const handleToggleIsActive = async (
    universityId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/university/${universityId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedUniversity = university.map((university) =>
          university.id === universityId
            ? { ...university, is_active: !isActive }
            : university
        );
        setUniversity(updatedUniversity);
        Swal.fire({
          title: "Success",
          text: "University updated successfully",
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
        <h1 className="text-2xl font-bold mb-4">University Dashboard</h1>
        <button
          onClick={() => navigate("./create-university")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Create University
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Name</th>
            <th className="py-2 px-4 border-b text-center">University Type</th>
            <th className="py-2 px-4 border-b text-center">Logo</th>
            <th className="py-2 px-4 border-b text-center">Active</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {university.map((university) => (
            <tr key={university.id}>
              <td className="py-2 px-4 border-b text-center">
                {university.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {university.university_type}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={university.logo_url}
                  alt={university.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={university.is_active}
                    onChange={() =>
                      handleToggleIsActive(university.id, university.is_active)
                    }
                  />
                  <span>{university.is_active ? "Active" : "Inactive"}</span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/dashboard/microsites/${university.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    navigate(`/dashboard/microsites/form/${university.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Form
                </button>
                <button
                  onClick={() =>
                    navigate(`/dashboard/university/payments/${university.id}`)
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

export default UniversityDashboard;
