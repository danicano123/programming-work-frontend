import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


const EditAlliance: React.FC = () => {
  const { id } = useParams();
  const [alliance, setAlliance] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlliance = async () => {
      try {
        const response = await Api.get(`/alliances/${id}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setAlliance(data);
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
          text: `${error.message}`,
          icon: "error",
        });
      }
    };

    fetchAlliance();
  }, [id, auth.data.token]);

  if (!alliance) return <div>Cargando...</div>;

  const initialValues = {
    alliedId: alliance.alliedId || "",
    programmId: alliance.programmId || "",
    startdate: alliance.startdate || "",
    enddate: alliance.enddate || "",
    teacherId: alliance.teacherId || "",
  };

  const validationSchema = Yup.object({
    alliedId: Yup.string()
    .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
      programmId: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    startdate: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    enddate: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    teacherId: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
      
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await Api.patch(`/alliances/${id}`, { id: alliance.id, ...values}, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 204) {
        Swal.fire({
          title: "Success",
          text: "Alianza actualizado correctamente",
          icon: "success",
        });
        navigate("/alliance-dashboard");
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
      <h1 className="text-2xl font-bold mb-4">Editar Alianza</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700">Aliado</label>
              <Field
                name="alliedId"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="alliedId"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Programa</label>
              <Field
                name="programmId"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="programmId"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha inicio</label>
              <Field
                name="startdate"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="startdate"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha fin</label>
              <Field
                name="enddate"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="enddate"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Docente</label>
              <Field
                name="teacherId"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="teacherId"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => navigate("/alliances-dashboard")}
              >
                Cancelar
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditAlliance;
