import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


const EditNormativeAspectProgramm: React.FC = () => {
  const { id } = useParams();
  const [normativeAspectProgramm, setNormativeAspectProgramm] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNormativeAspectProgramm = async () => {
      try {
        const response = await Api.get(`/NormativeAspectProgramm/${id}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setNormativeAspectProgramm(data);
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

    fetchNormativeAspectProgramm();
  }, [id, auth.data.token]);

  if (!normativeAspectProgramm) return <div>Cargando...</div>;

  const initialValues = {
    normativeAspectId: normativeAspectProgramm.normativeAspectId || "",
    programmId: normativeAspectProgramm.programmId || "",
  };

  const validationSchema = Yup.object({
    normativeAspectId: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    programmId: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await Api.patch(`/NormativeAspectProgramm/${id}`, { id: normativeAspectProgramm.id, ...values}, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 204) {
        Swal.fire({
          title: "Success",
          text: "Programa Aspecto Normativo actualizado correctamente",
          icon: "success",
        });
        navigate("/NormativeAspectProgramm-dashboard");
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
      <h1 className="text-2xl font-bold mb-4">Editar Programa Aspecto Normativo</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700">Aspecto Normativo</label>
              <Field
                name="normativeAspectId"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="normativeAspectId"
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
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => navigate("/NormativeAspectProgramm-dashboard")}
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

export default EditNormativeAspectProgramm;
