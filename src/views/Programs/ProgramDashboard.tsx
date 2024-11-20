import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const ProgramDashboard: React.FC = () => {
  const [program, setProgram] = useState<any[]>([]);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const { data, statusCode } = await Api.get(
          "/programs",
          auth.data.token
        );
        if (statusCode === 200) {
          setProgram(data);
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
          text: "Error: unable to fetch active program",
          icon: "error",
        });
      }
    };

    fetchProgram();
  }, [auth.data.token]);

  const handleToggleIsActive = async (programId: string) => {
    try {
      const response = await Api.post(
        `/programs/toggle-is-active/${programId}`,
        auth.data.token
      );
      const { data, statusCode } = response;
      if (statusCode === 200) {
        const updatedProgram = program.map(
          (program) =>
            program.id === programId
              ? { ...program, isActive: data.isActive }
              : program
        );
        setProgram(updatedProgram);
        Swal.fire({
          title: "Success",
          text: "program updated successfully",
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
      `/programs/${id}`,
      auth.data.token
    );
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">
          Tablero de Programa
        </h1>
        <button
          onClick={() => navigate("/create-programs")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Programa
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Id</th>
            <th className="py-2 px-4 border-b text-center">Nombre</th>
            <th className="py-2 px-4 border-b text-center">Tipo</th>
            <th className="py-2 px-4 border-b text-center">Nivel</th>
            <th className="py-2 px-4 border-b text-center">Fecha Creación</th>
            <th className="py-2 px-4 border-b text-center">Fecha Cierre</th>
            <th className="py-2 px-4 border-b text-center">Número Cohortes</th>
            <th className="py-2 px-4 border-b text-center">Cantidad Graduados</th>
            <th className="py-2 px-4 border-b text-center">Fecha Actualización</th>
            <th className="py-2 px-4 border-b text-center">Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {program?.map((program) => (
            <tr key={program.id}>
              <td className="py-2 px-4 border-b text-center">
                {program.name}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.type}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.creationDate}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.closingDate}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.numberCohorts}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.graduatesCount}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.lastUpdateDate}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {program.city}
              </td>
              
              <td className="py-2 px-4 border-b text-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle-switch"
                    checked={program.isActive}
                    onChange={() => handleToggleIsActive(program.id)}
                  />
                  <span>
                    {program.isActive ? "Activo" : "Inactivo"}
                  </span>
                </label>
              </td>
              <td className="py-2 px-4 border-b text-center space-x-4">
                <button
                  onClick={() =>
                    navigate(`/read-programs/${program.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() =>
                    navigate(`/edit-programs/${program.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletion(program.id)}
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

export default ProgramDashboard;
