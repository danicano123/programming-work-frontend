import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const AcademicActivityDetail: React.FC = () => {
  const { id } = useParams();
  const [academicActivity, setAcademicActivity] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcademicActivity = async () => {
      try {
        const response = await Api.get(`/academic-activities/${id}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setAcademicActivity(data);
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

    fetchAcademicActivity();
  }, [id, auth.data.token]);

  if (!academicActivity) return <div className="text-center py-4">Cargando...</div>;

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Detalles de la Actividad Académica</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <DetailItem label="ID" value={academicActivity.id} />
          <DetailItem label="Nombre" value={academicActivity.name} />
          <DetailItem label="Créditos" value={academicActivity.credits} />
          <DetailItem label="Tipo" value={academicActivity.type} />
          <DetailItem label="Área de Formación" value={academicActivity.trainingArea} />
          <DetailItem label="Horas de Acompañamiento" value={academicActivity.hAcom} />
          <DetailItem label="Horas Independientes" value={academicActivity.hIndep} />
          <DetailItem label="Idioma" value={academicActivity.language} />
          <DetailItem label="Es Espejo" value={academicActivity.mirror ? "Sí" : "No"} />
          <DetailItem label="Entidad Espejo" value={academicActivity.mirrorEntity} />
          <DetailItem label="País Espejo" value={academicActivity.mirrorCountry} />
          <DetailItem label="ID del Programa" value={academicActivity.programmId} />
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate("/academic-activity-dashboard")}
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

export default AcademicActivityDetail;