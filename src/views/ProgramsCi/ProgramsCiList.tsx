import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
//
const ProgramCiList: React.FC = () => {
  const [programCi, setProgramCi] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramCi = async () => {
      try {
        const { data, statusCode } = await Api.get("/approach/active");
        if (statusCode === 200) {
          setProgramCi(data);
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
          text: "Error: unable to fetch active ProgramCi",
          icon: "error",
        });
      }
    };

    fetchProgramCi();
  }, []);

  const handleNavigate = (description: string, programCiId: string) => {
    navigate(`/programCi/${description}`, { state: { programCiId } });
  };

  const handleNavigateToform = (description: string, programCiId: string) => {
    navigate(`/programCi/${description}/form/${programCiId}`, {
      state: { programCiId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enfoque</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programCi?.map((programCi) => (
          <div key={programCi.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={programCi.logo_url}
                alt={programCi.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{programCi.name}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(programCi.carinnovacion, programCi.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(programCi.carinnovacion, programCi.id)
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

export default ProgramCiList;
