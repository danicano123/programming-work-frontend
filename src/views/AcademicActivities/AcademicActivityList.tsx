import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AcademicActivityList: React.FC = () => {
  const [academicActivity, setAcademicActivity] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcademicActivity = async () => {
      try {
        const { data, statusCode } = await Api.get("/academic-activity/active");
        if (statusCode === 200) {
          setAcademicActivity(data);
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
          text: "Error: unable to fetch active academic activity",
          icon: "error",
        });
      }
    };

    fetchAcademicActivity();
  }, []);

  const handleNavigate = (slug: string, academicActivityId: string) => {
    navigate(`/academic-activity/${slug}`, { state: { academicActivityId } });
  };

  const handleNavigateToform = (slug: string, academicActivityId: string) => {
    navigate(`/academic-activity/${slug}/form/${academicActivityId}`, {
      state: { academicActivityId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Actividad académica</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {academicActivity?.map((academicActivity) => (
          <div key={academicActivity.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={academicActivity.logo_url}
                alt={academicActivity.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{academicActivity.name}</h2>
                <p className="text-gray-600">{academicActivity.number_credits}</p>
                <h2 className="text-gray-600">{academicActivity.type}</h2>
                <p className="text-gray-600">{academicActivity.training_area}</p>
                <h2 className="text-gray-600">{academicActivity.accompanied_hour}</h2>
                <p className="text-gray-600">{academicActivity.independent_hour}</p>
                <h2 className="text-gray-600">{academicActivity.language}</h2>
                <p className="text-gray-600">{academicActivity.mirror}</p>
                <h2 className="text-gray-600">{academicActivity.mirror_entity}</h2>
                <p className="text-gray-600">{academicActivity.mirror_country}</p>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(academicActivity.slug, academicActivity.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(academicActivity.slug, academicActivity.id)
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

export default AcademicActivityList;
