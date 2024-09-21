import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const CarInnovationsDetail: React.FC = () => {
  const location = useLocation();
  const { carinnovationsId } = location.state;
  const [carinnovations, setCarInnovations] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarInnovations = async () => {
      try {
        const response = await Api.get(`/carinnovations/${carinnovationsId}`, auth.data.token);
        const { data, statusCode } = response;
        if (statusCode === 200) {
          setCarInnovations(data.carinnovations);
        } else {
          // Swal.fire({
          //   title: "Error",
          //   text: `${data.message}`,
          //   icon: "error",
          // });
        }
      } catch (error: any) {
        Swal.fire({
          title: "Error",
          text: `${error.message}`,
          icon: "error",
        });
      }
    };

    fetchCarInnovations();
  }, [carinnovationsId, auth.data.token]);

  if (!carinnovations) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Microsite Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <DetailItem label="Name" value={carinnovations.name} />
          <DetailItem label="Description" value={carinnovations.description} />
          <DetailItem label="Type" value={carinnovations.type} />
          <DetailItem label="Payment Expiration Time (minutes)" value={carinnovations.payment_expiration_time?.toString()} />
          <DetailItem label="Document Type" value={carinnovations.document_type} />
          <DetailItem label="Document" value={carinnovations.document} />
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Go Back
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

export default CarInnovationsDetail;
