import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditQualifiedRegistration: React.FC = () => {
  const { id } = useParams();
  const [qualifiedregistration, setQualifiedRegistration] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQualifiedRegistration = async () => {
      try {
        const response = await Api.get(`/qualified-registration/${id}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setQualifiedRegistration(data);
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

    fetchQualifiedRegistration();
  }, [id, auth.data.token]);

  if (!qualifiedregistration) return <div>Cargando...</div>;

  const initialValues = {
    cant_credits: qualifiedregistration.cant_credits || "",
    hora_acom: qualifiedregistration.hora_acom || "",
    hora_ind: qualifiedregistration.hora_ind || "",
    metodology: qualifiedregistration.metodology || "",
    date_init: qualifiedregistration.date_init || "",
    date_end: qualifiedregistration.date_end || "",
    time_years: qualifiedregistration.time_years || "",
    time_semester: qualifiedregistration.time_semester || "",
    type_titling: qualifiedregistration.type_titling || "",
  };

  const validationSchema = Yup.object({
    cant_credits: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    hora_acom: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    hora_ind: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    metodology: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    date_init: Yup.date()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    date_end: Yup.date()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    time_years: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    time_semester: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    type_titling: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await Api.patch(`/qualified-registration/${id}`, { id: qualifiedregistration.id, ...values}, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 204) {
        Swal.fire({
          title: "Success",
          text: "Registro calificado actualizado con exito",
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
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar registro calificado</h1>
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
              <label className="block text-gray-700">Horas acomuladas</label>
              <Field
                name="thora_acomype"
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
              <label className="block text-gray-700">Horas independientes </label>
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
              <label className="block text-gray-700">Fecha de inicio </label>
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
              <label className="block text-gray-700">Fecha de finalización</label>
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
              <label className="block text-gray-700">Tiempo en años</label>
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
              <label className="block text-gray-700">Tiempo en semestres</label>
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
                onClick={() => navigate("/qualified-registration-dashboard")}
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

export default EditQualifiedRegistration;
