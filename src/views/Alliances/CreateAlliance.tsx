import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";



const CreateAlliance: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const initialValues = {
    alliance: "",
    departament: "",
    startdate: "",
    enddate: "",
    teaching: "",
  };

  const validationSchema = Yup.object({
    alliance: Yup.string()
      .max(60, "Maximo 60 carateres")
      .required("Campo requerido"),
      departament: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
      startdate: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
      enddate: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
      teaching: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await Api.post("/Alliance", values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 201) {
        Swal.fire({ 
          title: "Success",
          text: "Alianza creado con exito",
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Alianza</h1>
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
                name="name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Departamento</label>
              <Field
                name="description"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha inicio</label>
              <Field
                name="description"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="flex justify-between">
            <div className="mb-4">
              <label className="block text-gray-700">Fecha fin</label>
              <Field
                name="description"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Docente</label>
              <Field
                name="description"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600"
              />
            </div>
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
                onClick={() => navigate("/alliance-dashboard")}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Salir
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateAlliance;
