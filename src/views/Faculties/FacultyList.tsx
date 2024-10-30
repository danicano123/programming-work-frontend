import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const FacultyList: React.FC = () => {
  const [faculty, setFaculty] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const { data, statusCode } = await Api.get("/faculty/active");
        if (statusCode === 200) {
          setFaculty(data);
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
          text: "Error: unable to fetch active faculty",
          icon: "error",
        });
      }
    };

    fetchFaculty();
  }, []);

  const handleNavigate = (slug: string, facultyId: string) => {
    navigate(`/faculty/${slug}`, { state: { facultyId } });
  };

  const handleNavigateToform = (slug: string, facultyId: string) => {
    navigate(`/faculty/${slug}/form/${facultyId}`, {
      state: { facultyId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Facultad</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty?.map((faculty) => (
          <div key={faculty.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={faculty.logo_url}
                alt={faculty.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{faculty.name}</h2>
                <p className="text-gray-600">{faculty.type}</p>
                <h2 className="text-gray-600">{faculty.date_fun}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(faculty.slug, faculty.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(faculty.slug, faculty.id)
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

export default FacultyList;
