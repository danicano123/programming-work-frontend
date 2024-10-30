import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditAcademicActivity: React.FC = () => {
  const { id } = useParams();
  const [academicActivity, setAcademicActivity] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcademicActivity = async () => {
      try {
        const response = await Api.get(`/academic-activity/${id}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setAcademicActivity(data);
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

    fetchAcademicActivity();
  }, [id, auth.data.token]);

  if (!academicActivity) return <div>Cargando...</div>;

  const initialValues = {
    name: academicActivity.name || "",
    number_credits: academicActivity.number_credits || "",
    type: academicActivity.type || "",
    training_area: academicActivity.training_area || "",
    accompanied_hour: academicActivity.accompanied_hour || "",
    independent_hour: academicActivity.independent_hour || "",
    language: academicActivity.language || "",
    mirror: academicActivity.mirror || "",
    mirror_entity: academicActivity.mirror_entity || "",
    mirror_country: academicActivity.mirror_country || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    number_credits: Yup.string()
      .max(50, "Máximo 45 caracteres")
      .required("Requerido"),
    type: Yup.string()
      .max(20, "Máximo 20 caracteres")
      .required("Requerido"),
    training_area: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    accompanied_hour: Yup.string()
      .max(50, "Máximo 45 caracteres")
      .required("Requerido"),
    independent_hour: Yup.string()
      .max(50, "Máximo 45 caracteres")
      .required("Requerido"),
    language: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    mirror: Yup.string()
      .max(50, "Máximo 45 caracteres")
      .required("Requerido"),
    mirror_entity: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    mirror_country: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await Api.patch(`/academic-activity/${id}`, { id: academicActivity.id, ...values}, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 204) {
        Swal.fire({
          title: "Success",
          text: "Actividad académica actualizada con exito",
          icon: "success",
        });
        navigate("/academic-activity-dashboard");
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
      <h1 className="text-2xl font-bold mb-4">Editar actividad académica</h1>
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
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Número de créditos</label>
              <Field
                name="number_credits"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="number_credits"
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
              <label className="block text-gray-700">Área de formación</label>
              <Field
                name="training_area"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="training_area"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Horas acompañadas</label>
              <Field
                name="accompanied_hour"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="accompanied_hour"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Horas independientes</label>
              <Field
                name="independent_hour"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="independent_hour"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Idioma</label>
              <Field
                name="language"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="language"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Espejo</label>
              <Field
                name="mirror"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="mirror"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Entidad espejo </label>
              <Field
                name="mirror_entity"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="mirror_entity"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">País espejo</label>
              <Field
                name="mirror_country"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="mirror_country"
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
                onClick={() => navigate("/academic-activity-dashboard")}
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

export default EditAcademicActivity;
