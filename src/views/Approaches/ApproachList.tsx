import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
//
const ApproachList: React.FC = () => {
  const [approach, setApproach] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApproach = async () => {
      try {
        const { data, statusCode } = await Api.get("/approach/active");
        if (statusCode === 200) {
          setApproach(data.approach);
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
          text: "Error: unable to fetch active Approach",
          icon: "error",
        });
      }
    };

    fetchApproach();
  }, []);

  const handleNavigate = (description: string, approachId: string) => {
    navigate(`/approach/${description}`, { state: { approachId } });
  };

  const handleNavigateToform = (description: string, approachId: string) => {
    navigate(`/approach/${description}/form/${approachId}`, {
      state: { approachId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enfoque</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approach?.map((approach) => (
          <div key={approach.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={approach.logo_url}
                alt={approach.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{approach.name}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(approach.description, approach.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(approach.description, approach.id)
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

export default ApproachList;
