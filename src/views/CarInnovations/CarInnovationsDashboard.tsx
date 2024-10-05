import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const CarInnovationsDashboard: React.FC = () => {
  const [carInnovations, setCarInnovations] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarInnovations = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/car-innovations",
          auth.data.token
        );
        if (statusCode === 200) {
          setCarInnovations(data);
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
          text: "Error: unable to fetch active car innovations",
          icon: "error",
        });
      }
    };

    fetchCarInnovations();
  }, [auth.data.token]);

  const handleToggleIsActive = async (carInnovationId: string) => {
    try {
      const response = await Api.post(
        `/car-innovations/toggle-is-active/${carInnovationId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedCarInnovations = carInnovations.map(
          (carInnovation) =>
            carInnovation.id === carInnovationId
              ? { ...carInnovation, isActive: data.isActive }
              : carInnovation
        );
        setCarInnovations(updatedCarInnovations);
        Swal.fire({
          title: "Success",
          text: "Car Innovation updated successfully",
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
      `/car-innovations/${id}`,
      auth.data.token
    );
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Car Innovations Dashboard</h1>
        <button
          onClick={() => navigate("/create-car-innovations")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Car Innovation
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Name</th>
            <th className="py-2 px-4 border-b text-center">Description</th>
            <th className="py-2 px-4 border-b text-center">Type</th>
          </tr>
        </thead>
        <tbody>
          {carInnovations?.map((carInnovation) => (
            <tr key={carInnovation.id}>
              <td className="py-2 px-4 border-b text-center">
                {carInnovation.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {carInnovation.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {carInnovation.type}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={carInnovation.isActive}
                    onChange={() => handleToggleIsActive(carInnovation.id)}
                  />
                  <span>
                    {carInnovation.isActive ? "Active" : "Inactive"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/read-car-innovations/${carInnovation.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Details
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-car-innovations/${carInnovation.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletion(carInnovation.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarInnovationsDashboard;
