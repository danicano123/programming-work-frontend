import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
//
const AllianceList: React.FC = () => {
  const [alliance, setAlliance] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlliance = async () => {
      try {
        const { data, statusCode } = await Api.get("/alliance/active");
        if (statusCode === 200) {
          setAlliance(data);
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
          text: "Error: unable to fetch active Alliance",
          icon: "error",
        });
      }
    };

    fetchAlliance();
  }, []);

  const handleNavigate = (description: string, allianceId: string) => {
    navigate(`/alliance/${description}`, { state: { allianceId } });
  };

  const handleNavigateToform = (description: string, allianceId: string) => {
    navigate(`/alliance/${description}/form/${allianceId}`, {
      state: { allianceId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Alianza</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alliance?.map((alliance) => (
          <div key={alliance.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={alliance.logo_url}
                alt={alliance.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{alliance.name}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(alliance.description, alliance.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(alliance.description, alliance.id)
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

export default AllianceList;
