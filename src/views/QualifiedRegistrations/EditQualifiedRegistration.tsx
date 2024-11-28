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
        const response = await Api.get(`/qualified-registries/${id}`, auth.data.token);
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
    creditAmount: qualifiedregistration.creditAmount || "",
    acomHours: qualifiedregistration.acomHours || "",
    independentHours: qualifiedregistration.independentHours || "",
    metodology: qualifiedregistration.metodology || "",
    startDate: qualifiedregistration.startDate || "",
    endDate: qualifiedregistration.endDate || "",
    durationYears: qualifiedregistration.durationYears || "",
    durationSemesters: qualifiedregistration.durationSemesters || "",
    degreeType: qualifiedregistration.degreeType || "",
  };

  const validationSchema = Yup.object({
    creditAmount: Yup.string()
      .required("Requerido"),
    acomHours: Yup.string()
      .required("Requerido"),
    independentHours: Yup.string()
      .required("Requerido"),
    metodology: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    startDate: Yup.date()
      .required("Requerido"),
    endDate: Yup.date()
      .required("Requerido"),
    durationYears: Yup.string()
      .required("Requerido"),
    durationSemesters: Yup.string()
      .required("Requerido"),
    degreeType: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await Api.patch(`/qualified-registries/${id}`, { id: qualifiedregistration.id, ...values}, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 204) {
        Swal.fire({
          title: "Success",
          text: "Registro calificado actualizado con exito",
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
              <label className="block text-gray-700">Horas Acumuladas</label>
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
              <label className="block text-gray-700">Fecha de finalización</label>
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
              <label className="block text-gray-700">Tiempo en Años</label>
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
              <label className="block text-gray-700">Tiempo en Semestres</label>
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
              <label className="block text-gray-700">Tipo Titulación</label>
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
                onClick={() => navigate("/qualified-registries-dashboard")}
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
