import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateQualifiedRegistry: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const initialValues = {
    creditAmount: "",
    acomHours: "",
    independentHours: "",
    metodology: "",
    startDate: "",
    endDate: "",
    durationYears: "",
    durationSemesters: "",
    degreeType: "",
  };

  const validationSchema = Yup.object({
    creditAmount: Yup.string()
      .min(0, "Debe ser un número positivo")
      .required("Campo Obligatorio"),
    acomHours: Yup.string()
      .min(0, "Debe ser un número positivo")
      .required("Campo Obligatorio"),
    independentHours: Yup.string()
      .min(0, "Debe ser un número positivo")
      .required("Campo Obligatorio"),
    metodology: Yup.string()
      .max(100, "Máximo 100 caracteres")
      .required("Campo Obligatorio"),
    startDate: Yup.date()
    .required("Campo Obligatorio"),
    endDate: Yup.date()
    .required("Campo Obligatorio"),
    durationYears: Yup.string()
      .min(0, "Debe ser un número positivo")
      .required("Campo Obligatorio"),
    durationSemesters: Yup.string()
      .min(0, "Debe ser un número positivo")
      .required("Campo Obligatorio"),
    degreeType: Yup.string()
      .max(50, "Máximo 50 caracteres")
      .required("Campo Obligatorio"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await Api.post("/qualified-registries", values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 201) {
        Swal.fire({
          title: "Éxito",
          text: "Registro Calificado creado con éxito",
          icon: "success",
        });
        navigate("/qualified-registries-dashboard");
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
      <h1 className="text-2xl font-bold mb-4">Crear Registro Calificado</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700">Créditos Totales</label>
              <Field
                name="creditAmount"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="creditAmount"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Horas de Acompañamiento</label>
              <Field
                name="acomHours"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="acomHours"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Horas Independientes</label>
              <Field
                name="independentHours"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="independentHours"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Metodología</label>
              <Field
                name="metodology"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="metodology"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha de Inicio</label>
              <Field
                name="startDate"
                type="text"
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
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="endDate"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Duración en Años</label>
              <Field
                name="durationYears"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="durationYears"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Duración en Semestres</label>
              <Field
                name="durationSemesters"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="durationSemesters"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tipo de Título</label>
              <Field
                name="degreeType"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="degreeType"
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
                onClick={() => navigate("/qualified-registries-dashboard")}
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

export default CreateQualifiedRegistry;