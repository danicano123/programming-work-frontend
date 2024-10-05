import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditNormativeAspect: React.FC = () => {
  const { id } = useParams();
  const [normativeAspect, setNormativeAspect] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMicrosite = async () => {
      try {
        const response = await Api.get(`/normative-aspects/${id}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setNormativeAspect(data);
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

    fetchMicrosite();
  }, [id, auth.data.token]);

  if (!normativeAspect) return <div>Loading...</div>;

  const initialValues = {
    type: normativeAspect.type || "",
    description: normativeAspect.description || "",
    source: normativeAspect.source || "",
  };

  const validationSchema = Yup.object({
    type: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Campo Obligatorio"),
    description: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Campo Obligatorio"),
    source: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Campo Obligatorio"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await Api.patch(`/normative-aspects/${id}`, { id: normativeAspect.id, ...values}, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 204) {
        Swal.fire({
          title: "Success",
          text: "Microsite updated successfully",
          icon: "success",
        });
        navigate("/normative-aspects-dashboard");
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
      <h1 className="text-2xl font-bold mb-4">Edit Microsite</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
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
              <label className="block text-gray-700">Descripción</label>
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
              <label className="block text-gray-700">Fuente</label>
              <Field
                name="source"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="source"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => navigate("/dashboard/microsites")}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditNormativeAspect;
