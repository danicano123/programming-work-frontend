import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Api } from "../../services/Api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuth } from "../../store/slices/authSlice";
import Swal from "sweetalert2";

interface LoginFormValues {
  username: string;
  password: string;
  error: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);
  useEffect(() => {
    auth.isLogged ? navigate("/") : "";
  }, [auth.isLogged]);

  const initialValues: LoginFormValues = {
    username: "",  // Cambiado de "email" a "username"
    password: "",
    error: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Campo requerido"),  // Validación de username
    password: Yup.string()
      .required("Campo requerido")
      .min(2, "Mínimo 8 caracteres"),
  });

  const handleSubmit = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    Api.post("/user/login", values).then((response) => {
      if (response.statusCode === 200) {
        dispatch(fetchAuth({ ...response, isLogged: true }));
        //navigate("/register");
      } else {
        Swal.fire({
          title: "Error",
          text: `${response.data.error}`,
          icon: "error",
        });
      }
    });
    actions.setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div
          className="p-8 rounded-lg shadow-md w-full max-w-md bg-white bg-opacity-90"
          style={{ boxShadow: "0 4px 6px rgba(218, 165, 32, 0.1)" }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gold">
            Iniciar Sesión
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    className="block text-wood-darker text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Nombre de usuario
                  </label>
                  <Field
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-wood-darker leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name="username"  // Cambiado de "email" a "username"
                    placeholder="Nombre de usuario"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-wood-darker text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <Field
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-wood-darker leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <button
                    className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Iniciar Sesión
                  </button>
                  <span className="text-wood-darker text-lg font-bold">o</span>
                  <Link
                    to="/register"
                    className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  >
                    Registrarse
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
