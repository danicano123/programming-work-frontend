import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Constants from backend
const ApproachTypes = ["invoice", "subscription", "payment", "donation"];
const DocumentTypes = ["CC", "NIT", "TI", "PPT"];
const CurrencyTypes = ["COP", "USD", "JPY"];

const EditApproach: React.FC = () => {
  const { id } = useParams();
  const [approach, setApproach] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchApproach = async () => {
  //     try {
  //       const response = await Api.get(`/approach/${id}`, auth.data.token);
  //       const { data, statusCode } = response;
  //       if (statusCode === 200) {
  //         setApproach(data.approach);
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

  //   fetchApproach();
  // }, [id, auth.data.token]);

  if (!approach) return <div>Loading...</div>;

  const initialValues = {
    name: approach.name || "",
    description: approach.description || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    description: Yup.string()
      .max(45, "Máximo 45 caracteres")
      .required("Requerido"),
    approach_type: Yup.string().required("Requerido"),
    currency_type: Yup.string().required("Requerido"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await Api.patch(`/approach/${id}`, values, auth.data.token);
      const { data, statusCode } = response;
      if (statusCode === 200) {
        Swal.fire({
          title: "Success",
          text: "Enfoque actualizado correctamente",
          icon: "success",
        });
        navigate("/dashboard/approach");
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
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => navigate("/dashboard/approach")}
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

export default EditApproach;
