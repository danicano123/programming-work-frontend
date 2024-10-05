import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const NormativeAspectsDashboard: React.FC = () => {
  const [normativeaspects, setNormativeAspects] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

   useEffect(() => {
     const fetchNormativeAspects = async () => {
       try {
         const { data, statusCode } = await Api.get(
           "/normativeAspect",
           auth.data.token
        );
         if (statusCode === 200) {
           setNormativeAspects(data);
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
           text: "Error: unable to fetch active normativeaspects",
           icon: "error",
         });
       }
   };

     fetchNormativeAspects();
   }, [auth.data.token]);

  const handleToggleIsActive = async (
    normativeaspectsId: string,
    isActive: boolean
  ) => {
    try {
      const response = await Api.patch(
        `/normativeaspects/${normativeaspectsId}/is-active`,
        {
          is_active: !isActive,
        },
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedNormativeAspects = normativeaspects.map((normativeaspects) =>
          normativeaspects.id === normativeaspectsId
            ? { ...normativeaspects, is_active: !isActive }
            : normativeaspects
        );
        setNormativeAspects(updatedNormativeAspects);
        Swal.fire({
          title: "Success",
          text: "normativeaspects updated successfully",
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
      const response = await Api.delete(`/normativeAspect/${id}`, auth.data.token);
      window.location.reload();
     
    }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">
          Tablero de Aspectos Normativos
        </h1>
        <button
          onClick={() => navigate("/create-normative-aspects")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Aspecto Normativo
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Tipo</th>
            <th className="py-2 px-4 border-b text-center">Descripción</th>
            <th className="py-2 px-4 border-b text-center">Fuente</th>
          </tr>
        </thead>
        <tbody>
          {normativeaspects?.map((normativeaspects) => (
            <tr key={normativeaspects.id}>
              <td className="py-2 px-4 border-b text-center">
                {normativeaspects.type}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {normativeaspects.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                  {normativeaspects.source}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={normativeaspects.is_active}
                    onChange={() =>
                      handleToggleIsActive(normativeaspects.id, normativeaspects.is_active)
                    }
                  />
                  <span>{normativeaspects.is_active ? "Active" : "Inactive"}</span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
              <button
                  onClick={() =>
                    navigate(`/read-normative-aspects/${normativeaspects.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/read-normative-aspects/${normativeaspects.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    deletion(normativeaspects.id)
                  }
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

export default NormativeAspectsDashboard;
