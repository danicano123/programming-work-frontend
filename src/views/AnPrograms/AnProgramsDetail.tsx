import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AnProgramDetail: React.FC = () => {
  const { id } = useParams();
 
  const [anProgram, setAnProgram] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnProgram = async () => {
      try {
        const response = await Api.get(`/anProgram/${id}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setAnProgram(data);
        } else {
          Swal.fire({
            title: "Error",
            text: `${data.message}`,
            icon: "error",
          });
        }
      } catch (error: any) {
        Swal.fire({
          title: "Error",
          text: `${error.message}`,
          icon: "error",
        });
      }
    };

    fetchAnProgram();
  }, [id, auth.data.token]);

  if (!anProgram) return <div className="text-center py-4">Cargando...</div>;

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Detalles de An programa</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <DetailItem label="Name" value={anProgram.normativeaspects} />
          <DetailItem label="Description" value={anProgram.program} />
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate("/an-program-dashboard")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            regresar
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between p-2 border-b border-gray-200">
    <span className="font-medium text-gray-700">{label}:</span>
    <span className="text-gray-900 text-left w-3/4">{value}</span>
  </div>
);

export default AnProgramDetail;