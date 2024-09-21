import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Constants from backend
const AlliedTypes = ["invoice", "subscription", "payment", "donation"];
const CurrencyTypes = ["COP", "USD", "JPY"];

const CreateAllied: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const initialValues = {
    nit: "",
    company_reason: "",
    contact_name: "",
    mail: "",
    phone: "",
    city: "",
    payment_expiration_time: 6,
  };

  const validationSchema = Yup.object({
    nit: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
      company_reason: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
      contact_name: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
      mail: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
    payment_expiration_time: Yup.number()
    .min(6, "Must be 6 minutes or more")
    .required("Required"),
  });
'------------------------------------------------------------------------------------------------'
  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await Api.post("/microsites", values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 201) {
        Swal.fire({
          title: "Success",
          text: "Microsite created successfully",
          icon: "success",
        });
        navigate("/dashboard/microsites");
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
      <h1 className="text-2xl font-bold mb-4">Create Microsite</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
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
              <label className="block text-gray-700">Slug</label>
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
              <label className="block text-gray-700">Microsite Type</label>
              <Field
                as="select"
                name="microsite_type"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select microsite type</option>
                {AlliedTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
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
                Payment Expiration Time (in minutes)
              </label>
              <Field
                name="payment_expiration_time"
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
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
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => navigate("/dashboard/microsites")}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Back
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateAllied;
