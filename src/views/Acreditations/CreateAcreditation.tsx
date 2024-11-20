import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateAcreditation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const initialValues = {
    resolution: "",
    type: "",
    qualification: "",
    startDate: "",
    endDate: "",
    programmId: "",
  };

  const validationSchema = Yup.object({
    resolution: Yup.string()
      .max(50, "Máximo 50 caracteres")
      .required("Campo Obligatorio"),
    type: Yup.string()
      .max(50, "Máximo 50 caracteres")
      .required("Campo Obligatorio"),
    qualification: Yup.string()
      .max(50, "Máximo 50 caracteres")
      .required("Campo Obligatorio"),
    startDate: Yup.date().required("Campo Obligatorio"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "La fecha de fin debe ser posterior a la de inicio")
      .required("Campo Obligatorio"),
    programmId: Yup.string()
      .max(50, "Máximo 50 caracteres")
      .required("Campo Obligatorio"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await Api.post("/accreditations", values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 201) {
        Swal.fire({
          title: "Éxito",
          text: "Acreditación creada con éxito",
          icon: "success",
        });
        navigate("/acreditation-dashboard");
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Acreditación</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700">Resolución</label>
              <Field
                name="resolution"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="resolution"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tipo</label>
              <Field
                name="type"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Cualificación</label>
              <Field
                name="qualification"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="qualification"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha de Inicio</label>
              <Field
                name="startDate"
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="startDate"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha de Fin</label>
              <Field
                name="endDate"
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="endDate"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">ID del Programa</label>
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
            <div className="flex justify-between">
              <button
                type="submit"
                className={`${
                  isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-2 px-4 rounded`}
                disabled={isLoading}
              >
                {isLoading ? "Guardando..." : "Guardar"}
              </button>
              <button
                onClick={() => navigate("/acreditation-dashboard")}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Regresar
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateAcreditation;