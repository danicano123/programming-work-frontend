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
    alliedId: "",
    programmId: "",
    startdate: "",
    enddate: "",
    teacherId: "",
  };

  const validationSchema = Yup.object({
    alliedId: Yup.string()
      .required("Campo requerido"),
    programmId: Yup.string()
      .required("Campo requerido"),
    startdate: Yup.string()
      .required("Campo requerido"),
    enddate: Yup.string()
      .required("Campo requerido"),
    teacherId: Yup.string()
      .required("Campo requerido"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await Api.post("/Alliances", values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 201) {
        Swal.fire({ 
          title: "Success",
          text: "Alianza creado con exito",
          icon: "success",
        });
        navigate("/alliances-dashboard");
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
                name="alliedId"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="alliedId"
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
              <label className="block text-gray-700">Fecha inicio</label>
              <Field
                name="startdate"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="startdate"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="flex justify-between">
            <div className="mb-4">
              <label className="block text-gray-700">Fecha fin</label>
              <Field
                name="enddate"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="enddate"
                component="div"
                className="text-red-600"
              />
            </div>
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
                onClick={() => navigate("/alliances-dashboard")}
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
