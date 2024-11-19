import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
//
const InternshipList: React.FC = () => {
  const [internship, setInternship] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const { data, statusCode } = await Api.get("/Internship/active");
        if (statusCode === 200) {
          setInternship(data);
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
          text: "Error: unable to fetch active internship",
          icon: "error",
        });
      }
    };

    fetchInternship();
  }, []);

  const handleNavigate = (description: string, internshipId: string) => {
    navigate(`/internship/${description}`, { state: { internshipId } });
  };

  const handleNavigateToform = (description: string, internshipId: string) => {
    navigate(`/internship/${description}/form/${internshipId}`, {
      state: { internshipId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pasantia</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internship?.map((internship) => (
          <div key={internship.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={internship.logo_url}
                alt={internship.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{internship.name}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(internship.description, internship.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(internship.description, internship.id)
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

export default InternshipList;
