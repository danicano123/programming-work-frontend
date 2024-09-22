import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const FocusList: React.FC = () => {
  const [focus, setFocus] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFocus = async () => {
      try {
        const { data, statusCode } = await Api.get("/focus/active");
        if (statusCode === 200) {
          setFocus(data.focus);
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
          text: "Error: unable to fetch active Focus",
          icon: "error",
        });
      }
    };

    fetchFocus();
  }, []);

  const handleNavigate = (description: string, focusId: string) => {
    navigate(`/focus/${description}`, { state: { focusId } });
  };

  const handleNavigateToform = (description: string, focusId: string) => {
    navigate(`/focus/${description}/form/${focusId}`, {
      state: { focusId },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enfoque</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {focus?.map((focus) => (
          <div key={focus.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <img
                src={focus.logo_url}
                alt={focus.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{focus.name}</h2>
              </div>
            </div>
            <div className="py-2 px-4 border-b space-x-4">
              <button
                onClick={() => handleNavigate(focus.slug, focus.id)}
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full mt-4"
              >
                Ver detalles
              </button>
              <button
                onClick={() =>
                  handleNavigateToform(focus.description, focus.id)
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

export default FocusList;
