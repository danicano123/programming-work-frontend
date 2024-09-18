import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Constants from backend
const FocusTypes = ["invoice", "subscription", "payment", "donation"];
const DocumentTypes = ["CC", "NIT", "TI", "PPT"];
const CurrencyTypes = ["COP", "USD", "JPY"];

const EditFocus: React.FC = () => {
  const { id } = useParams();
  const [focus, setFocus] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchFocus = async () => {
  //     try {
  //       const response = await Api.get(`/focus/${id}`, auth.data.token);
  //       const { data, statusCode } = response;
  //       if (statusCode === 200) {
  //         setFocus(data.focus);
  //       } else {
  //         Swal.fire({
  //           title: "Error",
  //           text: `${data.message}`,
  //           icon: "error",
  //         });
  //       }
  //     } catch (error: any) {
  //       Swal.fire({
  //         title: "Error",
  //         text: `${error.message}`,
  //         icon: "error",
  //       });
  //     }
  //   };

  //   fetchFocus();
  // }, [id, auth.data.token]);

  if (!focus) return <div>Loading...</div>;

  const initialValues = {
    name: focus.name || "",
    description: focus.slug || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    description: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    focus_type: Yup.string().required("Requerido"),
    currency_type: Yup.string().required("Requerido"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await Api.patch(`/focus/${id}`, values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 200) {
        Swal.fire({
          title: "Success",
          text: "Enfoque actualizado correctamente",
          icon: "success",
        });
        navigate("/dashboard/focus");
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
      <h1 className="text-2xl font-bold mb-4">Editar enfoque</h1>
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
              <label className="block text-gray-700">Alias</label>
              <Field
                name="slug"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="slug"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Logo URL</label>
              <Field
                name="logo_url"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <Field
                name="category"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tipo de enfoque</label>
              <Field
                as="select"
                name="university_type"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Seleccione el tipo de enfoque</option>
                {FocusTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="microsite_type"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Currency Type</label>
              <Field
                as="select"
                name="currency_type"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select currency type</option>
                {CurrencyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="currency_type"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Payment Expiration Time (minutes)
              </label>
              <Field
                name="payment_expiration_time"
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Document Type</label>
              <Field
                as="select"
                name="document_type"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select document type</option>
                {DocumentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Field>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Document</label>
              <Field
                name="document"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
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
                onClick={() => navigate("/dashboard/focus")}
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

export default EditFocus;
