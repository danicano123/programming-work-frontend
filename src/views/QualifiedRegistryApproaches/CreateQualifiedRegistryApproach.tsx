import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateQualifiedRegistryApproach: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const initialValues = {
    qualifiedRegistryId: "",
    approachId: "",
  };

  const validationSchema = Yup.object({
    qualifiedRegistryId: Yup.number()
      .min(1, "Debe ser un número válido y mayor a 0")
      .required("Campo Obligatorio"),
    approachId: Yup.number()
      .min(1, "Debe ser un número válido y mayor a 0")
      .required("Campo Obligatorio"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await Api.post("/qualified-registry-approaches", values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 201) {
        Swal.fire({
          title: "Éxito",
          text: "Asociación creada con éxito",
          icon: "success",
        });
        navigate("/qualified-registry-approach-dashboard");
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
      <h1 className="text-2xl font-bold mb-4">Crear Asociación de Registro Calificado</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700">ID de Registro Calificado</label>
              <Field
                name="qualifiedRegistryId"
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="qualifiedRegistryId"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">ID de Enfoque</label>
              <Field
                name="approachId"
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="approachId"
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

export default CreateQualifiedRegistryApproach;