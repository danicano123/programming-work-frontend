import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


const EditProgram: React.FC = () => {
  const { id } = useParams();
  const [program, setProgram] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await Api.get(`/programs/${id}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setProgram(data);
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

    fetchProgram();
  }, [id, auth.data.token]);

  if (!program) return <div>Cargando...</div>;

  const initialValues = {
    name: program.name || "",
    type: program.type || "",
    level: program.level || "",
    creationDate: program.creationDate || "",
    closingDate: program.closingDate || "",
    numberCohorts: program.numberCohorts || "",
    graduatesCount: program.graduatesCount || "",
    lastUpdateDate: program.lastUpdateDate || "",
    city: program.city || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(60, "Maximo 60 carateres")
      .required("Campo requerido"),
    type: Yup.string()
      .max(60, "Maximo 60 carateres")
      .required("Campo requerido"),
    level: Yup.string()
      .max(60, "Maximo 60 carateres")
      .required("Campo requerido"),
    creationDate: Yup.string()
      .max(60, "Maximo 60 carateres")
      .required("Campo requerido"),
    closingDate: Yup.string()
      .max(60, "Maximo 60 carateres")
      .required("Campo requerido"),
    numberCohorts: Yup.string()
      .max(60, "Maximo 60 carateres")
      .required("Campo requerido"),
    graduatesCount: Yup.string()
      .max(60, "Maximo 60 carateres")
      .required("Campo requerido"),
    lastUpdateDate: Yup.string()
      .max(60, "Maximo 60 carateres")
      .required("Campo requerido"),
    city: Yup.string()
      .max(60, "Maximo 60 carateres")
      .required("Campo requerido"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await Api.patch(`/programs/${id}`, { id: program.id, ...values}, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 204) {
        Swal.fire({
          title: "Success",
          text: "Programa actualizado correctamente",
          icon: "success",
        });
        navigate("/programs-dashboard");
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
      <h1 className="text-2xl font-bold mb-4">Editar Programa</h1>
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
              <label className="block text-gray-700">Nivel</label>
              <Field
                name="level"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="level"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha creación</label>
              <Field
                name="creationDate"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="creationDate"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha Cierre</label>
              <Field
                name="closingDate"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="closingDate"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Numero cohortes</label>
              <Field
                name="numberCohorts"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="numberCohorts"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Cantidad de graduados</label>
              <Field
                name="graduatesCount"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="graduatesCount"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha actualización</label>
              <Field
                name="lastUpdateDate"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="lastUpdateDate"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Ciudad</label>
              <Field
                name="city"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="city"
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
                onClick={() => navigate("/programs-dashboard")}
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

export default EditProgram;
