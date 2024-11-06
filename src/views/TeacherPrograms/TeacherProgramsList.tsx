import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
//
const TeacherProgramsList: React.FC = () => {
  const [teacherPrograms, setTeacherPrograms] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherPrograms = async () => {
      try {
        const { data, statusCode } = await Api.get("/teacher-programs/active");
        if (statusCode === 200) {
          setTeacherPrograms(data);
        } else {
          Swal.fire({
            title: "Error",
            text: `${data.message}`,
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Error: unable to fetch active TeacherPrograms",
          icon: "error",
        });
      }
    };

    fetchTeacherPrograms();
  }, []);

  const handleNavigate = (description: string, teacherProgramsId: string) => {
    navigate(`/teacher-programs/${description}`, { state: { teacherProgramsId } });
  };

  const handleNavigateToform = (description: string, teacherProgramsId: string) => {
    navigate(`/teacher-programs/${description}/form/${teacherProgramsId}`, {
      state: { teacherProgramsId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Docente Departamento</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teacherPrograms?.map((teacherPrograms) => (
          <div key={teacherPrograms.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={teacherPrograms.logo_url}
                alt={teacherPrograms.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{teacherPrograms.name}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(teacherPrograms.description, teacherPrograms.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(teacherPrograms.description, teacherPrograms.id)
                }
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Acceder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherProgramsList;
