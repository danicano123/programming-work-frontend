import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Constants from backend
const UniversityTypes = ["invoice", "subscription", "payment", "donation"];
const DocumentTypes = ["CC", "NIT", "TI", "PPT"];
const CurrencyTypes = ["COP", "USD", "JPY"];

const EditUniversity: React.FC = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await Api.get(`/university/${id}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setUniversity(data.university);
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

    fetchUniversity();
  }, [id, auth.data.token]);

  if (!university) return <div>Loading...</div>;

  const initialValues = {
    name: university.name || "",
    slug: university.slug || "",
    logo_url: university.logo_url || "",
    category: university.category || "",
    microsite_type: university.university_type || "",
    currency_type: university.currency_type || "",
    payment_expiration_time: university.payment_expiration_time || "",
    document_type: university.document_type || "",
    document: university.document || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
    slug: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
    category: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
    university_type: Yup.string().required("Required"),
    currency_type: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await Api.patch(`/university/${id}`, values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 200) {
        Swal.fire({
          title: "Success",
          text: "University updated successfully",
          icon: "success",
        });
        navigate("/dashboard/university");
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
      <h1 className="text-2xl font-bold mb-4">Editar universidad</h1>
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
              <label className="block text-gray-700">Ciudad</label>
              <Field
                name="city"
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
                onClick={() => navigate("/dashboard/university")}
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

export default EditUniversity;
