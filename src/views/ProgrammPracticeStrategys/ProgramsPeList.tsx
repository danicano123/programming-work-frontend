import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
//
const ProgramPeList: React.FC = () => {
  const [programPe, setProgramPe] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramPe = async () => {
      try {
        const { data, statusCode } = await Api.get("/programPe/active");
        if (statusCode === 200) {
          setProgramPe(data);
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
          text: "Error: unable to fetch active ProgramPe",
          icon: "error",
        });
      }
    };

    fetchProgramPe();
  }, []);

  const handleNavigate = (description: string, aprogramPeId: string) => {
    navigate(`/programPe/${description}`, { state: { aprogramPeId } });
  };

  const handleNavigateToform = (description: string, programPeId: string) => {
    navigate(`/programPe/${description}/form/${programPeId}`, {
      state: { programPeId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Programa Pe</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programPe?.map((programPe) => (
          <div key={programPe.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={programPe.logo_url}
                alt={programPe.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{programPe.name}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(programPe.description, programPe.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(programPe.description, programPe.id)
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

export default ProgramPeList;
