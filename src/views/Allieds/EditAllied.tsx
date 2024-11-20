import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditAllied: React.FC = () => {
  const { id } = useParams();
  const [allied, setAllied] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllied = async () => {
      try {
        const response = await Api.get(`/allied/${id}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setAllied(data);
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

    fetchAllied();
  }, [id, auth.data.token]);

  if (!allied) return <div>Loading...</div>;

  const initialValues = {
    company_reason: allied.company_reason || "",
    contact_name: allied.contact_name || "",
    phone: allied.phone || "",
    city: allied.city || "",

  };

  const validationSchema = Yup.object({
    company_reason: Yup.string()
    .max(50, "Máximo 50 caracteres")
    .required("Requerido"),
    contact_name: Yup.string()
    .max(50, "Máximo 50 caracteres")
    .required("Requerido"),
    phone: Yup.string()
    .max(50, "Máximo 50 caracteres")
    .required("Requirido"),
    city: Yup.string()
    .max(50, "Máximo 50 caracteres")
    .required("Requirido"),

  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await Api.patch(`/allied/${id}`, { id: allied.id, ...values}, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 204) {
        Swal.fire({
          title: "Success",
          text: "allied updated successfully",
          icon: "success",
        });
        navigate("/allied-dashboard");
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
      <h1 className="text-2xl font-bold mb-4">Editar Aliado</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
          <div className="mb-4">
              <label className="block text-gray-700">Razon Social</label>
              <Field
                name="company_reason"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="company_reason"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre Contacto</label>
              <Field
                name="contact_name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="contact_name"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Telefono</label>
              <Field
                name="phone"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="phone"
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
                Save Changes
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => navigate("/allied-dashboard")}
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

export default EditAllied;
