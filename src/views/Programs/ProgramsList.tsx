import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";
//
const ProgramList: React.FC = () => {
  const [program, setProgram] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const { data, statusCode } = await Api.get("/program/active");
        if (statusCode === 200) {
          setProgram(data);
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
          text: "Error: unable to fetch active Program",
          icon: "error",
        });
      }
    };

    fetchProgram();
  }, []);

  const handleNavigate = (description: string, programId: string) => {
    navigate(`/program/${description}`, { state: { programId } });
  };

  const handleNavigateToform = (description: string, programId: string) => {
    navigate(`/program/${description}/form/${programId}`, {
      state: { programId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Programa</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {program?.map((program) => (
          <div key={program.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={program.logo_url}
                alt={program.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{program.name}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(program.description, program.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(program.description, program.id)
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

export default ProgramList;
