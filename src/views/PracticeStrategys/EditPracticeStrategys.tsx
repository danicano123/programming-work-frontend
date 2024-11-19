import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditPracticeStrategy: React.FC = () => {
  const { id } = useParams();
  const [practiceStrategy, setPracticeStrategy] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPracticeStrategy = async () => {
      try {
        const response = await Api.get(`/practice-strategy/${id}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setPracticeStrategy(data);
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

    fetchPracticeStrategy();
  }, [id, auth.data.token]);

  if (!practiceStrategy) return <div>Cargando...</div>;

  const initialValues = {
    id: practiceStrategy.type || "",
    name: practiceStrategy.type || "",
    type: practiceStrategy.name || "",
    City: practiceStrategy.description || "",
  };

  const validationSchema = Yup.object({
    id: Yup.string()
    .max(50, "Máximo 60 caracteres")
    .required("Requerido"),
    name: Yup.string()
      .max(50, "Máximo 60 caracteres")
      .required("Requerido"),
    type: Yup.string()
      .max(50, "Máximo 45 caracteres")
      .required("Requerido"),
    City: Yup.string()
      .max(50, "Máximo 45 caracteres")
      .required("Requirido"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await Api.patch(`/practice-strategy/${id}`, values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 200) {
        Swal.fire({
          title: "Success",
          text: "Estrategia de Práctica actualizada con exito",
          icon: "success",
        });
        navigate("/practice-strategy-dashboard");
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
      <h1 className="text-2xl font-bold mb-4">Editar Estrategia de Practica</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
          <div className="mb-4">
              <label className="block text-gray-700">Id</label>
              <Field
                name="id"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="id"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tipo de Practica</label>
              <Field
                name="type_practice"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="type_practice"
                component="div"
                className="text-red-600"
              />
            </div>
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
              <label className="block text-gray-700">Descripcion</label>
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
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => navigate("/practice-strategy-dashboard")}
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

export default EditPracticeStrategy;