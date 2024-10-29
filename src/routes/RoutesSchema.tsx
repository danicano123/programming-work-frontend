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
import PracticeStrategyDetail from "../views/PracticeStrategys/PracticeStrategysDetail";
import EditPracticeStrategy from "../views/PracticeStrategys/EditPracticeStrategys";
import CreatePracticeStrategy from "../views/PracticeStrategys/CreatePracticeStrategys";
import PracticeStrategysDashboard from "../views/PracticeStrategys/PracticeStrategysDashboard";
import AllianceDashboard from "../views/Alliances/AllianceDashboard";
import CreateAlliance from "../views/Alliances/CreateAlliance";
import EditAlliance from "../views/Alliances/EditAlliance";
import AllianceDetail from "../views/Alliances/AlliancesDetail";
import TeachingDepartamentDashboard from "../views/TeachingDepartments/TeachingDepartmentDashboard";
import TeachingDepartamentDetail from "../views/TeachingDepartments/TeachingDepartmentsDetail";
import EditTeachingDepartament from "../views/TeachingDepartments/EditTeachingDepartment";
import CreateTeachingDepartament from "../views/TeachingDepartments/CreateTeachingDepartment";
import ProgramDashboard from "../views/Programs/ProgramDashboard";
import ProgramDetail from "../views/Programs/ProgramsDetail";
import EditProgram from "../views/Programs/EditProgram";
import CreateProgram from "../views/Programs/CreateProgram";
import ProgramPeDashboard from "../views/ProgramPe/ProgramPeDashboard";
import ProgramPeDetail from "../views/ProgramPe/ProgramsPeDetail";
import EditProgramPe from "../views/ProgramPe/EditProgramPe";
import CreateProgramPe from "../views/ProgramPe/CreateProgramPe";
import ProgramAcDashboard from "../views/ProgramsAc/ProgramAcDashboard";
import ProgramAcDetail from "../views/ProgramsAc/ProgramsAcDetail";
import EditProgramAc from "../views/ProgramsAc/EditProgramAc";
import CreateProgramAc from "../views/ProgramsAc/CreateProgramAc";
import ProgramCiDashboard from "../views/ProgramsCi/ProgramCiDashboard";
import ProgramCiDetail from "../views/ProgramsCi/ProgramsCiDetail";
import EditProgramCi from "../views/ProgramsCi/EditProgramCi";
import CreateProgramCi from "../views/ProgramsCi/CreateProgramCi";
import AnProgramDashboard from "../views/AnPrograms/AnProgramDashboard";
import AnProgramDetail from "../views/AnPrograms/AnProgramsDetail";
import EditAnProgram from "../views/AnPrograms/EditAnProgram";
import CreateAnProgram from "../views/AnPrograms/CreateAnProgram";
import InternshipDashboard from "../views/Internships/InternshipDashboard";
import InternshipDetail from "../views/Internships/InternshipsDetail";
import EditInternship from "../views/Internships/EditInternship";
import CreateInternship from "../views/Internships/CreateInternship";

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
    path: "/university-dashboard",
    element: UniversityDashboard,
  },
  {
    path: "/create-university",
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
    path: "/car-innovation-dashboard",
    element: CarInnovationsDashboard,
  },
  {
    path: "/read-car-innovations/:id",
    element: CarInnovationsDetail,
  },
  {
    path: "/edit-car-innovations",
    element: EditCarInnovations,
  },
  {
    path: "/create-car-innovations",
    element: CreateCarInnovations,
  },

  {
    path: "/practice-strategys-dashboard",
    element: PracticeStrategysDashboard,
  },
  {
    path: "/read-practice-strategys/:id",
    element: PracticeStrategyDetail,
  },
  {
    path: "/edit-practice-strategys",
    element: EditPracticeStrategy,
  },
  {
    path: "/create-practice-strategys",
    element: CreatePracticeStrategy,
  },

//Alliances
  {
    path: "/alliance-dashboard",
    element: AllianceDashboard,
  },
  {
    path: "/alliance-detail",
    element: AllianceDetail,
  },
  {
    path: "/alliance-edit",
    element: EditAlliance,
  },
  {
    path: "/create-alliance",
    element: CreateAlliance,
  },

  //Teaching-department
  {
    path: "/teaching-department-dashboard",
    element: TeachingDepartamentDashboard,
  },
  {
    path: "/teaching-department-detail",
    element: TeachingDepartamentDetail,
  },
  {
    path: "/teaching-department-edit",
    element: EditTeachingDepartament,
  },
  {
    path: "/create-teaching-department",
    element: CreateTeachingDepartament,
  },

  //Program
  {
    path: "/program-dashboard",
    element: ProgramDashboard,
  },
  {
    path: "/program-detail",
    element: ProgramDetail,
  },
  {
    path: "/program-edit",
    element: EditProgram,
  },
  {
    path: "/create-program",
    element: CreateProgram,
  },
  
  //ProgramPe
  {
    path: "/program-pe-dashboard",
    element: ProgramPeDashboard,
  },
  {
    path: "/program-pe-detail",
    element: ProgramPeDetail,
  },
  {
    path: "/program-pe-edit",
    element: EditProgramPe,
  },
  {
    path: "/create-program-pe",
    element: CreateProgramPe,
  },

  //ProgramAc
  {
    path: "/program-pe-dashboard",
    element: ProgramAcDashboard,
  },
  {
    path: "/program-pe-detail",
    element: ProgramAcDetail,
  },
  {
    path: "/program-pe-edit",
    element: EditProgramAc,
  },
  {
    path: "/create-program-pe",
    element: CreateProgramAc,
  },

   //ProgramCi
   {
    path: "/program-ci-dashboard",
    element: ProgramCiDashboard,
  },
  {
    path: "/program-ci-detail",
    element: ProgramCiDetail,
  },
  {
    path: "/program-ci-edit",
    element: EditProgramCi,
  },
  {
    path: "/create-program-ci",
    element: CreateProgramCi,
  },

  //AnPrograms
  {
    path: "/an-program-dashboard",
    element: AnProgramDashboard,
  },
  {
    path: "/an-program-detail",
    element: AnProgramDetail,
  },
  {
    path: "/an-program-edit",
    element: EditAnProgram,
  },
  {
    path: "/create-an-program",
    element: CreateAnProgram,
  },

  //Internships
  {
    path: "/internship-dashboard",
    element: InternshipDashboard,
  },
  {
    path: "/internship-detail",
    element: InternshipDetail,
  },
  {
    path: "/internship-edit",
    element: EditInternship,
  },
  {
    path: "/create-internship",
    element: CreateInternship,
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
    element: RegisterForm,
  },
  {
    path: "/normative-aspects-dashboard",
    element: NormativeAspectsDashboard,
  },
  {
    path: "/create-normative-aspects",
    element: CreateNormativeAspects,
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
