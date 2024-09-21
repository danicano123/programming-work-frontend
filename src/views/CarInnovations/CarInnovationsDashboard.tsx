import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const CarInnovationsDashboard: React.FC = () => {
  const [carinnovations, setCarInnovations] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

   useEffect(() => {
     const fetchCarInnovations = async () => {
       try {
         const { data, statusCode } = await Api.get(
           "/carInnovations",
           auth.data.token
         );
         if (statusCode === 200) {
           setCarInnovations(data.carinnovations);
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
           text: "Error: unable to fetch active carinnovations",
           icon: "error",
         });
       }
     };

     fetchCarInnovations();
   }, [auth.data.token]);

  const handleToggleIsActive = async (
    carinnovationsId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/carinnovations/${carinnovationsId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedCarInnovations = carinnovations.map((carinnovations) =>
          carinnovations.id === carinnovationsId
            ? { ...carinnovations, is_active: !isActive }
            : carinnovations
        );
        setCarInnovations(updatedCarInnovations);
        Swal.fire({
          title: "Success",
          text: "CarInnovations updated successfully",
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
        <h1 className="text-2xl font-bold mb-4">Tablero de Aspectos Normativos</h1>
        <button
          onClick={() => navigate("/create-normative-aspects")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Innovaciones en el sector del automóvil
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Nit</th>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Descripcion</th>
            <th className="py-2 px-4 border-b text-center">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {carinnovations.map((carinnovations) => (
            <tr key={carinnovations.id}>
              <td className="py-2 px-4 border-b text-center">
                {carinnovations.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {carinnovations.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={carinnovations.type}
                  alt={carinnovations.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={carinnovations.is_active}
                    onChange={() =>
                      handleToggleIsActive(carinnovations.id, carinnovations.is_active)
                    }
                  />
                  <span>{carinnovations.is_active ? "Active" : "Inactive"}</span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/dashboard/carinnovations/${carinnovations.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    navigate(`/dashboard/carinnovations/form/${carinnovations.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Form
                </button>
                <button
                  onClick={() =>
                    navigate(`/dashboard/carinnovations/payments/${carinnovations.id}`)
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

export default CarInnovationsDashboard;
