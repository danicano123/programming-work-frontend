import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AwardList: React.FC = () => {
  const [award, setAward] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAward = async () => {
      try {
        const { data, statusCode } = await Api.get("/award/active");
        if (statusCode === 200) {
          setAward(data);
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
          text: "Error: unable to fetch active Award",
          icon: "error",
        });
      }
    };

    fetchAward();
  }, []);

  const handleNavigate = (slug: string, awardId: string) => {
    navigate(`/award/${slug}`, { state: { awardId } });
  };

  const handleNavigateToform = (slug: string, awardId: string) => {
    navigate(`/award/${slug}/form/${awardId}`, {
      state: { awardId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Premio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {award?.map((award) => (
          <div key={award.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={award.logo_url}
                alt={award.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{award.name}</h2>
                <p className="text-gray-600">{award.description}</p>
                <h2 className="text-gray-600">{award.date}</h2>
                <p className="text-gray-600">{award.granting_entity}</p>
                <h2 className="text-gray-600">{award.country}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(award.slug, award.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(award.slug, award.id)
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

export default AwardList;
