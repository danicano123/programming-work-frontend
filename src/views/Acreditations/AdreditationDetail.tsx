import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AcreditationDetail: React.FC = () => {
  const { id: resolution } = useParams();  
  const [acreditation, setAcreditation] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcreditation = async () => {
      try {
        const response = await Api.get(`/accreditations/${resolution}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setAcreditation(data);
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

    fetchAcreditation();
  }, [resolution, auth.data.token]);

  if (!acreditation) return <div className="text-center py-4">Cargando...</div>;

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Detalles de Acreditación</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <DetailItem label="Resolución" value={acreditation.resolution} />
          <DetailItem label="Tipo" value={acreditation.type} />
          <DetailItem label="Calificación" value={acreditation.qualification} />
          <DetailItem label="Fecha de Inicio" value={acreditation.startDate} />
          <DetailItem label="Fecha de Fin" value={acreditation.endDate} />
          <DetailItem label="ID del Programa" value={acreditation.programmId} />
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate("/accreditation-dashboard")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Regresar
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

export default AcreditationDetail;