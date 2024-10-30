import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AcreditationList: React.FC = () => {
  const [acreditation, setAcreditation] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcreditation = async () => {
      try {
        const { data, statusCode } = await Api.get("/acreditation/active");
        if (statusCode === 200) {
          setAcreditation(data);
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
          text: "Error: unable to fetch active acreditation",
          icon: "error",
        });
      }
    };

    fetchAcreditation();
  }, []);

  const handleNavigate = (slug: string, acreditationId: string) => {
    navigate(`/acreditation/${slug}`, { state: { acreditationId } });
  };

  const handleNavigateToform = (slug: string, acreditationId: string) => {
    navigate(`/acreditation/${slug}/form/${acreditationId}`, {
      state: { acreditationId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Acreditacion</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {acreditation?.map((acreditation) => (
          <div key={acreditation.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={acreditation.logo_url}
                alt={acreditation.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{acreditation.type}</h2>
                <p className="text-gray-600">{acreditation.calification}</p>
                <h2 className="text-gray-600">{acreditation.date_init}</h2>
                <p className="text-gray-600">{acreditation.date_end}</p>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(acreditation.slug, acreditation.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(acreditation.slug, acreditation.id)
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

export default AcreditationList;
