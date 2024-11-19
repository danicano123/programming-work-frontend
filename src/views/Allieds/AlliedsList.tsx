import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
//
const AlliedList: React.FC = () => {
  const [allied, setAllied] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllied = async () => {
      try {
        const { data, statusCode } = await Api.get("/allied/active");
        if (statusCode === 200) {
          setAllied(data);
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
          text: "Error: unable to fetch active Allied",
          icon: "error",
        });
      }
    };

    fetchAllied();
  }, []);

  const handleNavigate = (description: string, alliedId: string) => {
    navigate(`/allied/${description}`, { state: { alliedId } });
  };

  const handleNavigateToform = (description: string, alliedId: string) => {
    navigate(`/allied/${description}/form/${alliedId}`, {
      state: { alliedId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Aliado</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allied?.map((allied) => (
          <div key={allied.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={allied.logo_url}
                alt={allied.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{allied.name}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(allied.description, allied.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(allied.description, allied.id)
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

export default AlliedList;