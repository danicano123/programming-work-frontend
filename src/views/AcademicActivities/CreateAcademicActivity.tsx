import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateAcademicActivity: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    credits: "",
    type: "",
    trainingArea: "",
    hAcom: "",
    hIndep: "",
    language: "",
    mirror: false,
    mirrorEntity: "",
    mirrorCountry: "",
    programmId: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(100, "Máximo 100 caracteres")
      .required("Campo Obligatorio"),
    credits: Yup.number()
      .min(0, "Debe ser un número positivo")
      .required("Campo Obligatorio"),
    type: Yup.string()
      .max(50, "Máximo 50 caracteres")
      .required("Campo Obligatorio"),
    trainingArea: Yup.string()
      .max(100, "Máximo 100 caracteres")
      .required("Campo Obligatorio"),
    hAcom: Yup.number()
      .min(0, "Debe ser un número positivo")
      .required("Campo Obligatorio"),
    hIndep: Yup.number()
      .min(0, "Debe ser un número positivo")
      .required("Campo Obligatorio"),
    language: Yup.string()
      .max(50, "Máximo 50 caracteres")
      .required("Campo Obligatorio"),
    mirror: Yup.boolean(),
    mirrorEntity: Yup.string().max(100, "Máximo 100 caracteres"),
    mirrorCountry: Yup.string().max(100, "Máximo 100 caracteres"),
    programmId: Yup.number()
      .min(0, "Debe ser un número positivo")
      .required("Campo Obligatorio"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await Api.post("/academic-activities", values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 201) {
        Swal.fire({
          title: "Éxito",
          text: "Actividad Académica creada con éxito",
          icon: "success",
        });
        navigate("/academic-activities-dashboard");
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
      <h1 className="text-2xl font-bold mb-4">Crear Actividad Académica</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre</label>
              <Field
                name="name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="name" component="div" className="text-red-600" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Créditos</label>
              <Field
                name="credits"
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="credits" component="div" className="text-red-600" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tipo</label>
              <Field
                name="type"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="type" component="div" className="text-red-600" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Área de Formación</label>
              <Field
                name="trainingArea"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="trainingArea"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Horas de Acompañamiento</label>
              <Field
                name="hAcom"
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="hAcom" component="div" className="text-red-600" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Horas Independientes</label>
              <Field
                name="hIndep"
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="hIndep" component="div" className="text-red-600" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Idioma</label>
              <Field
                name="language"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="language" component="div" className="text-red-600" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Es Espejo</label>
              <Field
                name="mirror"
                type="checkbox"
                className="w-5 h-5"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Entidad Espejo</label>
              <Field
                name="mirrorEntity"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="mirrorEntity"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">País Espejo</label>
              <Field
                name="mirrorCountry"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="mirrorCountry"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">ID del Programa</label>
              <Field
                name="programmId"
                type="number"
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
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateAcademicActivity;