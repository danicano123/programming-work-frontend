import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


const CreateQualifiedRegistration: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const initialValues = {
    cant_credits: "",
    hora_acom: "",
    hora_ind: "",
    metodology: "",
    date_init: "",
    date_end: "",
    time_years: "",
    time_semester: "",
    type_titling: "",
  };

  const validationSchema = Yup.object({
    nacant_credits: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
    hora_acom: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
    hora_ind: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
    metodology: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
    date_init: Yup.date()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
    date_end: Yup.date()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
    time_years: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
    time_semester: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
    type_titling: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await Api.post("/qualified-registration", values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 201) {
        Swal.fire({
          title: "Success",
          text: "Registro calificado creado con exito",
          icon: "success",
        });
        navigate("/qualified-registration-dashboard");
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
      <h1 className="text-2xl font-bold mb-4">Crear registro calificado</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700">Cantidad de créditos</label>
              <Field
                name="cant_credits"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="cant_credits"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Hora acomulada</label>
              <Field
                name="hora_acom"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="hora_acom"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Hora independiente</label>
              <Field
                name="hora_ind"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="hora_ind"
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
              <label className="block text-gray-700">Fecha inicio</label>
              <Field
                name="date_init"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="date_init"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha final</label>
              <Field
                name="date_end"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="date_end"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Duración de años</label>
              <Field
                name="time_years"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="time_years"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Duración de semestres</label>
              <Field
                name="time_semester"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="time_semester"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tipo de titulación</label>
              <Field
                name="type_titling"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="type_titling"
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
                onClick={() => navigate("/qualified-registration-dashboard")}
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

export default CreateQualifiedRegistration;
