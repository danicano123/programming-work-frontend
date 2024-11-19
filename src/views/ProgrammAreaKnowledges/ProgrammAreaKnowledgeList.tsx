import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
//
const ProgrammAreaKnowledgeList: React.FC = () => {
  const [programmAreaKnowledge, setProgrammAreaKnowledge] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgrammAreaKnowledge = async () => {
      try {
        const { data, statusCode } = await Api.get("/programmAreaKnowledge/active");
        if (statusCode === 200) {
          setProgrammAreaKnowledge(data);
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
          text: "Error: unable to fetch active Programm Area Knowledge",
          icon: "error",
        });
      }
    };

    fetchProgrammAreaKnowledge();
  }, []);

  const handleNavigate = (description: string, programCiId: string) => {
    navigate(`/programmAreaKnowledge/${description}`, { state: { programCiId } });
  };

  const handleNavigateToform = (description: string, programCiId: string) => {
    navigate(`/programmAreaKnowledge/${description}/form/${programCiId}`, {
      state: { programCiId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enfoque</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programmAreaKnowledge?.map((programmAreaKnowledge) => (
          <div key={programmAreaKnowledge.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={programmAreaKnowledge.logo_url}
                alt={programmAreaKnowledge.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{programmAreaKnowledge.name}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(programmAreaKnowledge.carinnovacion, programmAreaKnowledge.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(programmAreaKnowledge.carinnovacion, programmAreaKnowledge.id)
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

export default ProgrammAreaKnowledgeList;
