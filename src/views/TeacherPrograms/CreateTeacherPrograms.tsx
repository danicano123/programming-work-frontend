import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";



const CreateTeacherPrograms: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const initialValues = {
    teacherId: "",
    programmId: "",
    dedication: "",
    modality: "",
    startDate: "",
    endDate: "",
  };

  const validationSchema = Yup.object({
    teacherId: Yup.string()
      .max(60, "Maximo 60 carateres")
      .required("Campo requerido"),
    programmId: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
    dedication: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
    modality: Yup.string()
      .max(45, "Maximo 45 carateres")
      .required("Campo requerido"),
    startDate: Yup.date()
      .required("Campo requerido"),
    endDate: Yup.date()
      .required("Campo requerido"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await Api.post("/teacher-programs", values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 201) {
        Swal.fire({ 
          title: "Success",
          text: "Docente Departamento creado con exito",
          icon: "success",
        });
        navigate("/teacher-programs-dashboard");
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
      <h1 className="text-2xl font-bold mb-4">Crear Pograma Docente</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700">Docente</label>
              <Field
                name="teacherId"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="teacherId"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Programa</label>
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
            <div className="mb-4">
              <label className="block text-gray-700">Dedicación</label>
              <Field
                name="dedication"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="dedication"
                component="div"
                className="text-red-600"
              />
              </div>
            <div className="mb-4">
              <label className="block text-gray-700">Modalidad</label>
              <Field
                name="modality"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="modality"
                component="div"
                className="text-red-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Fecha Inicio</label>
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
              <label className="block text-gray-700">Fecha Fin</label>
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
                onClick={() => navigate("/teacher-programs-dashboard")}
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

export default CreateTeacherPrograms;
