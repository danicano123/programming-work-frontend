import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const UniversityList: React.FC = () => {
  const [university, setUniversity] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const { data, statusCode } = await Api.get("/university/active");
        if (statusCode === 200) {
          setUniversity(data);
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
          text: "Error: unable to fetch active university",
          icon: "error",
        });
      }
    };

    fetchUniversity();
  }, []);

  const handleNavigate = (slug: string, universityId: string) => {
    navigate(`/university/${slug}`, { state: { universityId } });
  };

  const handleNavigateToform = (slug: string, universityId: string) => {
    navigate(`/university/${slug}/form/${universityId}`, {
      state: { universityId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Universidad</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {university?.map((university) => (
          <div key={university.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={university.logo_url}
                alt={university.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{university.name}</h2>
                <p className="text-gray-600">{university.university_type}</p>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(university.slug, university.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(university.slug, university.id)
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

export default UniversityList;
