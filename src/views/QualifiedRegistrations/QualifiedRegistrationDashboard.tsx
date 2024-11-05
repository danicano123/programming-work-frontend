import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const QualifiedRegistrationDashboard: React.FC = () => {
  const [qualifiedregistration, setQualifiedRegistration] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQualifiedRegistration = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/qualified-registration",
          auth.data.token
        );
        if (statusCode === 200) {
          setQualifiedRegistration(data);
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
          text: "Error: unable to fetch active qualifiedre gistration ",
          icon: "error",
        });
      }
    };

    fetchQualifiedRegistration();
  }, [auth.data.token]);

  const handleToggleIsActive = async (qualifiedregistrationId: string) => {
    try {
      const response = await Api.patch(
        `/qualified-registration/toggle-is-active${qualifiedregistrationId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedQualifiedRegistration = qualifiedregistration.map((qualifiedregistration) =>
          qualifiedregistration.id === qualifiedregistrationId
            ? { ...qualifiedregistration, isActive: data.isActive }
            : qualifiedregistration
        );
        setQualifiedRegistration(updatedQualifiedRegistration);
        Swal.fire({
          title: "Success",
          text: "Registro calificado actualizado exitosamente",
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
      `/qualified-registration/${id}`,
      auth.data.token
    );
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tablero de registro calificado</h1>
        <button
          onClick={() => navigate("/create-qualified-registration")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear registro calificado
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Cantidad de créditos</th>
            <th className="py-2 px-4 border-b text-center">Horas acomuladas</th>
            <th className="py-2 px-4 border-b text-center">Horas independientes</th>
            <th className="py-2 px-4 border-b text-center">Metodología</th>
            <th className="py-2 px-4 border-b text-center">Fecha de inicio</th>
            <th className="py-2 px-4 border-b text-center">Fecha  fin</th>
            <th className="py-2 px-4 border-b text-center">Tiempo en años</th>
            <th className="py-2 px-4 border-b text-center">Tiempo en semestres</th>
            <th className="py-2 px-4 border-b text-center">Tipo de titulación</th>
          </tr>
        </thead>
        <tbody>
          {qualifiedregistration?.map((qualifiedregistration) => (
            <tr key={qualifiedregistration.id}>
              <td className="py-2 px-4 border-b text-center">
                {qualifiedregistration.cant_credits}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {qualifiedregistration.hora_ind}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {qualifiedregistration.metodology}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {qualifiedregistration.date_init}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {qualifiedregistration.date_end}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {qualifiedregistration.time_years}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {qualifiedregistration.time_semester}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {qualifiedregistration.type_titling}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={qualifiedregistration.isActive}
                    onChange={() => handleToggleIsActive(qualifiedregistration.id)}
                  />
                  <span>
                    {qualifiedregistration.isActive ? "Activo" : "Inactivo"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
              <button
                  onClick={() =>
                    navigate(`/read-qualified-registration/${qualifiedregistration.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-qualified-registration/${qualifiedregistration.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(qualifiedregistration.id)}
                  
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

export default QualifiedRegistrationDashboard;
