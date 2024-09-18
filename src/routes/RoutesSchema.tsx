import Dashboard from "../components/Dashboard/Dashboard";
import RegisterForm from "../components/Register/RegisterForm";
import AlliedDashboard from "../views/Allied/AlliedDashboard";
import EditForm from "../views/Forms/EditForm";
import PaymentForm from "../views/Forms/PaymentForm";
import Login from "../views/Login";
import CreateMicrosite from "../views/Microsites/CreateMicrosite";
import EditMicrosite from "../views/Microsites/EditMicrosites";
import MicrositesDashboard from "../views/Microsites/MicrositesDashboard";
import MicrositeDetail from "../views/Microsites/MicrositesDetail";
import MicrositesList from "../views/Microsites/MicrositesList";
import CreateNormativeAspects from "../views/NormativeAspects/CreateNormativeAspects";
import NormativeAspectsDashboard from "../views/NormativeAspects/NormativeAspectsDashboard";
import PaymentsDashboard from "../views/Payments/PaymentsDashboard";
import PaymentsList from "../views/Payments/PaymentsList";
import PracticesDashboard from "../views/PracticeStrategy/PracticesDashboard";
import CreateUniversity from "../views/University/CreateUniversity";
import UniversityDashboard from "../views/University/UniversityDashboard";
import EditUser from "../views/Users/EditUsers";
import UsersDashboard from "../views/Users/UsersDashboard";

export const RoutesSchema = [
  {
    path: "/",
    element: MicrositesList,
  },
  {
    path: "/allied-dashboard",
    element: AlliedDashboard,
  },
  {
    path: "/practice-dashboard",
    element: AlliedDashboard,
  },
  {
    path: "/university-dashboard",
    element: UniversityDashboard,
  },
  {
    path: "/create-university-dashboard",
    element: CreateUniversity,
  },
  

  // {CreateUniversity
  //   path: "/microsites/:slug",
  //   element: MicrositeDetail,
  //   isProtected: true,
  // },
  // {
  //   path: "/microsites/:slug/form/:micrositeId",
  //   element: PaymentForm,
  //   isProtected: true,
  // },
  {
    path: "*",
    element: MicrositesList,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/register",
    element: RegisterForm,
  },
  {
    path: "/university",
    element:RegisterForm,
  },
  {
    path: "/normative-aspects-dashboard",
    element:NormativeAspectsDashboard,
  },
  {
    path: "/create-normative-aspects",
    element:CreateNormativeAspects,
  },
  // {
  //   path: "/payments",
  //   element: PaymentsList,
  //   isProtected: true,
  // },
  {
    path: "microsites",
    element: MicrositesDashboard,
  },
  {
    path: "microsites/:id",
    element: EditMicrosite,
  },
  {
    path: "microsites/create-microsite",
    element: CreateMicrosite,
  },
  {
    path: "microsites/form/:microsite_id",
    element: EditForm,
  },
  {
    path: "microsites/payments/:micrositeId",
    element: PaymentsDashboard,
  },
  // {
  //   path: "/dashboard",
  //   element: Dashboard,
  //   isProtected: true,
  //   requiredRole: "admin",
  //   children: [
  //     {
  //       path: "users",
  //       element: UsersDashboard,
  //     },
  //     {
  //       path: "users/:id",
  //       element: EditUser,
  //     },
  //     {
  //       path: "microsites",
  //       element: MicrositesDashboard,
  //     },
  //     {
  //       path: "microsites/:id",
  //       element: EditMicrosite,
  //     },
  //     {
  //       path: "microsites/create-microsite",
  //       element: CreateMicrosite,
  //     },
  //     {
  //       path: "microsites/form/:microsite_id",
  //       element: EditForm,
  //     },
  //     {
  //       path: "microsites/payments/:micrositeId",
  //       element: PaymentsDashboard,
  //     },
  //   ],
  // },
];
