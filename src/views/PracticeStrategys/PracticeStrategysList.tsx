import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const PracticeStrategyList: React.FC = () => {
  const [practiceStrategy, setPracticeStrategy] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPracticeStrategy = async () => {
      try {
        const { data, statusCode } = await Api.get("/practiceStrategy/active");
        if (statusCode === 200) {
          setPracticeStrategy(data);
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
          text: "Error: unable to fetch active practiceStrategy",
          icon: "error",
        });
      }
    };

    fetchPracticeStrategy();
  }, []);

  const handleNavigate = (slug: string, practiceStrategyId: string) => {
    navigate(`/practiceStrategy/${slug}`, { state: { practiceStrategyId } });
  };

  const handleNavigateToform = (slug: string, practiceStrategyId: string) => {
    navigate(`/practiceStrategy/${slug}/form/${practiceStrategyId}`, {
      state: { practiceStrategyId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Estrategia de Practica</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceStrategy?.map((practiceStrategy) => (
          <div key={practiceStrategy.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={practiceStrategy.logo_url}
                alt={practiceStrategy.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{practiceStrategy.type}</h2>
                <p className="text-gray-600">{practiceStrategy.name}</p>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(practiceStrategy.slug, practiceStrategy.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(practiceStrategy.slug, practiceStrategy.id)
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

export default PracticeStrategyList;
