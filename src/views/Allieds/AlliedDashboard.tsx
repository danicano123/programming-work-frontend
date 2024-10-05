import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AlliedDashboard: React.FC = () => {
  const [allied, setAllied] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllied = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/allied",
          auth.data.token
        );
        if (statusCode === 200) {
          setAllied(data);
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
          text: "Error: unable to fetch active allied",
          icon: "error",
        });
      }
    };

    fetchAllied();
  }, [auth.data.token]);

  const handleToggleIsActive = async (
    alliedId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/allied/${alliedId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedAllied = allied.map((allied) =>
          allied.id === alliedId
            ? { ...allied, is_active: !isActive }
            : allied
        );
        setAllied(updatedAllied);
        Swal.fire({
          title: "Success",
          text: "Allied updated successfully",
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
        <h1 className="text-2xl font-bold mb-4">Allied dashboard</h1>
        <button
          onClick={() => navigate("/create-allied")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Aliado
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead> 
          <tr>
            <th className="py-2 px-4 border-b text-center">Nit</th>
            <th className="py-2 px-4 border-b text-center">Razón Social</th>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Correo</th>
            <th className="py-2 px-4 border-b text-center">Telefono</th>
            <th className="py-2 px-4 border-b text-center">Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {allied?.map((allied) => (
            <tr key={allied.nit}>
              <td className="py-2 px-4 border-b text-center">
                {allied.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {allied.companyname}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={allied.namecontact}
                  alt={allied.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={allied.is_active}
                    onChange={() =>
                      handleToggleIsActive(allied.id, allied.is_active)
                    }
                  />
                  <span>{allied.is_active ? "Active" : "Inactive"}</span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/dashboard/allied/${allied.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlliedDashboard;
