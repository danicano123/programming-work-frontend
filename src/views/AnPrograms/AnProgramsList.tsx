import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
//
const AnProgramList: React.FC = () => {
  const [anProgram, setAnProgram] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnProgram = async () => {
      try {
        const { data, statusCode } = await Api.get("/anProgram/active");
        if (statusCode === 200) {
          setAnProgram(data);
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
          text: "Error: unable to fetch active anProgram",
          icon: "error",
        });
      }
    };

    fetchAnProgram();
  }, []);

  const handleNavigate = (description: string, anProgramId: string) => {
    navigate(`/anProgram/${description}`, { state: { anProgramId } });
  };

  const handleNavigateToform = (description: string, anProgramId: string) => {
    navigate(`/anProgram/${description}/form/${anProgramId}`, {
      state: { anProgramId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">An Programa</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {anProgram?.map((anProgram) => (
          <div key={anProgram.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={anProgram.logo_url}
                alt={anProgram.normativeaspects}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{anProgram.normativeaspects}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(anProgram.program, anProgram.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(anProgram.program, anProgram.id)
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

export default AnProgramList;
