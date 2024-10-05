import Dashboard from "../components/Dashboard/Dashboard";
import RegisterForm from "../components/Register/RegisterForm";
import AlliedDashboard from "../views/Allieds/AlliedDashboard";
import AlliedDetail from "../views/Allieds/AlliedDetail";
import CreateAllied from "../views/Allieds/CreateAllied";
import EditAllied from "../views/Allieds/EditAllied";
import CarInnovationsDashboard from "../views/CarInnovations/CarInnovationsDashboard";
import CarInnovationsDetail from "../views/CarInnovations/CarInnovationsDetail";
import CreateCarInnovations from "../views/CarInnovations/CreateCarInnovations";
import EditCarInnovations from "../views/CarInnovations/EditCarInnovations";
import EditForm from "../views/Forms/EditForm";
import PaymentForm from "../views/Forms/PaymentForm";
import Login from "../views/Login";
import CreateMicrosite from "../views/Microsites/CreateMicrosite";
import EditMicrosite from "../views/Microsites/EditMicrosites";
import MicrositesDashboard from "../views/Microsites/MicrositesDashboard";
import MicrositesDetail from "../views/Microsites/MicrositesDetail";
import MicrositesList from "../views/Microsites/MicrositesList";
import CreateNormativeAspects from "../views/NormativeAspects/CreateNormativeAspects";
import NormativeAspectsDashboard from "../views/NormativeAspects/NormativeAspectsDashboard";
import PaymentsDashboard from "../views/Payments/PaymentsDashboard";
import PaymentsList from "../views/Payments/PaymentsList";
import CreatePractice from "../views/PracticeStrategy/CreatePractice";
import EditPractice from "../views/PracticeStrategy/EditPractice";
import PracticesDashboard from "../views/PracticeStrategy/PracticesDashboard";
import PracticesDetail from "../views/PracticeStrategy/PracticesDetail";
import CreateUniversity from "../views/University/CreateUniversity";
import UniversityDashboard from "../views/University/UniversityDashboard";
import EditUser from "../views/Users/EditUsers";
import UsersDashboard from "../views/Users/UsersDashboard";
import CreateApproach from "../views/Approaches/CreateApproach";
import ApproachDashboard from "../views/Approaches/ApproachDashboard";
import NormativeAspectsDetail from "../views/NormativeAspects/NormativeAspectsDetail";
import EditNormativeAspect from "../views/NormativeAspects/EditNormativeAspects";
import UniversityDetail from "../views/University/UniversityDetail";
import EditUniversity from "../views/University/EditUniversity";
import ApproachDetail from "../views/Approaches/ApproachDetail";
import EditApproach from "../views/Approaches/EditApproach";

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
    path: "/allied-detail",
    element: AlliedDetail,
  },
  {
    path: "/allied-edit",
    element: EditAllied,
  },
  {
    path: "/create-allied",
    element: CreateAllied,
  },
  {
    path: "/practice-dashboard",
    element: PracticesDashboard,
  },
  {
    path: "/practice-detail",
    element: PracticesDetail,
  },
  {
    path: "/practice-edit",
    element: EditPractice,
  },
  {
    path: "/create-practice",
    element: CreatePractice,
  },
  {
    path: "/university-dashboard",
    element: UniversityDashboard,
  },
  {
    path: "/create-university-dashboard",
    element: CreateUniversity,
  },
  {
    path: "/read-university/:id",
    element: UniversityDetail,
  },
  {
    path: "/edit-university/:id",
    element: EditUniversity,
  },
  {
    path: "/approach-dashboard",
    element: ApproachDashboard,
  },
  {
    path: "/create-approach-dashboard",
    element: CreateApproach,
  },
  {
    path: "/read-approach/:id",
    element: ApproachDetail,
  },
  {
    path: "/edit-approach/:id",
    element: EditApproach,
  },
  {
    path: "/carinnovation-dashboard",
    element: CarInnovationsDashboard,
  },
  {
    path: "/carinnovation-detail",
    element: CarInnovationsDetail,
  },
  {
    path: "/carinnovation-edit",
    element: EditCarInnovations,
  },
  {
    path: "/carinnovation-Create",
    element: CreateCarInnovations,
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
  {
    path: "/read-normative-aspects/:id",
    element: NormativeAspectsDetail,
  },
  {
    path: "/edit-normative-aspects/:id",
    element: EditNormativeAspect,
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
