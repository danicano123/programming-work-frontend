import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  });
  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await Api.post("/allied", values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 201) {
        Swal.fire({
          title: "Success",
          text: "Microsite created successfully",
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
              <label className="block text-gray-700">Nit</label>
              <Field
                name="nit"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="nit"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Company_Reason</label>
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
              <label className="block text-gray-700">Contacto Name</label>
              <Field
                name="contact_name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mail</label>
              <Field
                name="mail"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="mail"
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
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => navigate("/allied-dashboard")}
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
