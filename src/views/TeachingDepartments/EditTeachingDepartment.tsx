import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


const EditTeachingDepartament: React.FC = () => {
  const { id } = useParams();
  const [teachingDepartament, setTeachingDepartament] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachingDepartament = async () => {
      try {
        const response = await Api.get(`/teaching-departament/${id}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setTeachingDepartament(data);
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

    fetchTeachingDepartament();
  }, [id, auth.data.token]);

  if (!teachingDepartament) return <div>Cargando...</div>;

  const initialValues = {
    name: teachingDepartament.name || "",
    description: teachingDepartament.description || "",
  };

  const validationSchema = Yup.object({
  teaching: Yup.string()
    .max(60, "Maximo 60 carateres")
    .required("Campo requerido"),
  departament: Yup.string()
    .max(45, "Maximo 45 carateres")
    .required("Campo requerido"),
  dedication: Yup.string()
    .max(45, "Maximo 45 carateres")
    .required("Campo requerido"),
  mode: Yup.string()
    .max(45, "Maximo 45 carateres")
    .required("Campo requerido"),
  entrydate: Yup.string()
    .max(45, "Maximo 45 carateres")
    .required("Campo requerido"),
  departuredate: Yup.string()
    .max(45, "Maximo 45 carateres")
    .required("Campo requerido"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await Api.patch(`/teaching-departament/${id}`, { id: teachingDepartament.id, ...values}, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 204) {
        Swal.fire({
          title: "Success",
          text: "Docente Departamento actualizado correctamente",
          icon: "success",
        });
        navigate("/teaching-departament-dashboard");
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
      <h1 className="text-2xl font-bold mb-4">Editar Docente Departamento</h1>
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
                name="teaching"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="teaching"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Departamento</label>
              <Field
                name="departament"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="departament"
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
                name="mode"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="mode"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha Ingreso</label>
              <Field
                name="entrydate"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="entrydate"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha Salida</label>
              <Field
                name="departuredate"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="departuredate"
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
                onClick={() => navigate("/teaching-departament-dashboard")}
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

export default EditTeachingDepartament;
