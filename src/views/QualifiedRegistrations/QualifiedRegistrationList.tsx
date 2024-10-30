import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const QualifiedRegistrationList: React.FC = () => {
  const [qualifiedregistration, setQualifiedRegistration] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQualifiedRegistration = async () => {
      try {
        const { data, statusCode } = await Api.get("/qualified-registration/active");
        if (statusCode === 200) {
          setQualifiedRegistration(data);
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
          text: "Error: unable to fetch active qualified registration",
          icon: "error",
        });
      }
    };

    fetchQualifiedRegistration();
  }, []);

  const handleNavigate = (slug: string, qualifiedregistrationId: string) => {
    navigate(`/qualified-registration/${slug}`, { state: { qualifiedregistrationId } });
  };

  const handleNavigateToform = (slug: string, qualifiedregistrationId: string) => {
    navigate(`/qualified-registration/${slug}/form/${qualifiedregistrationId}`, {
      state: { qualifiedregistrationId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Universidad</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qualifiedregistration?.map((qualifiedregistration) => (
          <div key={qualifiedregistration.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={qualifiedregistration.logo_url}
                alt={qualifiedregistration.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{qualifiedregistration.cant_credits}</h2>
                <p className="text-gray-600">{qualifiedregistration.hora_acom}</p>
                <h2 className="text-gray-600">{qualifiedregistration.hora_ind}</h2>
                <p className="text-gray-600">{qualifiedregistration.metodology}</p>
                <h2 className="text-xl font-bold">{qualifiedregistration.date_init}</h2>
                <p className="text-gray-600">{qualifiedregistration.date_end}</p>
                <h2 className="text-xl font-bold">{qualifiedregistration.time_years}</h2>
                <p className="text-gray-600">{qualifiedregistration.time_semester}</p>
                <h2 className="text-xl font-bold">{qualifiedregistration.type_titling}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(qualifiedregistration.slug, qualifiedregistration.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(qualifiedregistration.slug, qualifiedregistration.id)
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

export default QualifiedRegistrationList;
