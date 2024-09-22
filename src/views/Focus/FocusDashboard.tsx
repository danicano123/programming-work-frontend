import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const FocusDashboard: React.FC = () => {
  const [focus, setFocus] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUniversity = async () => {
  //     try {
  //       const { data, statusCode } = await Api.get(
  //         "/university",
  //         auth.data.token
  //       );
  //       if (statusCode === 200) {
  //         setUniversity(data.microsites);
  //       } else {
  //         Swal.fire({
  //           title: "Error",
  //           text: `${data.message}`,
  //           icon: "error",
  //         });
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         title: "Error",
  //         text: "Error: unable to fetch active university",
  //         icon: "error",
  //       });
  //     }
  //   };

  //   fetchUniversity();
  // }, [auth.data.token]);

  const handleToggleIsActive = async (
    focusId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/university/${focusId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedFocus = focus.map((focus) =>
          focus.id === focusId
            ? { ...focus, is_active: !isActive }
            : focus
        );
        setFocus(updatedFocus);
        Swal.fire({
          title: "Success",
          text: "Enfoque actualizado con exito",
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
        <h1 className="text-2xl font-bold mb-4">Tablero de enfoque</h1>
        <button
          onClick={() => navigate("/create-focus-dashboard")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear enfoque
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Descripción</th>
            <th className="py-2 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {focus.map((focus) => (
            <tr key={focus.id}>
              <td className="py-2 px-4 border-b text-center">
                {focus.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {focus.description}
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/dashboard/focus/${focus.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() =>
                    navigate(`/dashboard/focus/form/${focus.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Form
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FocusDashboard;
