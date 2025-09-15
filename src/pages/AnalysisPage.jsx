import React, { useState } from "react";
import { useAnalysis } from "../hooks/useAnalysis.js";
import { usePatients } from "../hooks/usePatients.js";
import { useVisits } from "../hooks/useVisits.js";
import { useImages } from "../hooks/useImages.js";

import Select from "../components/common/Input/Select.jsx";
import Button from "../components/common/Button/index";
import Table from "../components/common/Table/index";

export default function AnalysisPage() {
  const { patients, selectedPatient, select } = usePatients();
  const [selectedVisitId, setSelectedVisitId] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const { visits } = useVisits(selectedPatient?.id);
  const { images } = useImages(selectedVisitId);
  const { analyses, run } = useAnalysis(selectedVisitId);

  const handleRun = () => {
    if (selectedVisitId && selectedImageId) {
      run(selectedImageId);
    }
  };

  // Table columns for analysis results
  const columns = [
    { key: "id", title: "ID", width: 120 },
    { key: "imageId", title: "Ảnh", width: 120 },
    { key: "drLevel", title: "Mức DR", width: 120 },
    {
      key: "dme",
      title: "DME",
      width: 100,
      render: (row, v) => (v ? "Có" : "Không"),
    },
    { key: "createdAt", title: "Ngày giờ" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Phân tích võng mạc</h1>

        {/* Patient select */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Chọn bệnh nhân"
            value={selectedPatient?.id || ""}
            onChange={(e) => {
              select(e.target.value);
              setSelectedVisitId(null);
              setSelectedImageId(null);
            }}
          >
            <option value="">-- chọn --</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>

          {/* Visit select */}
          <Select
            label="Chọn lần khám"
            value={selectedVisitId || ""}
            onChange={(e) => {
              setSelectedVisitId(e.target.value);
              setSelectedImageId(null);
            }}
            disabled={!selectedPatient}
          >
            <option value="">-- chọn --</option>
            {visits.map((v) => (
              <option key={v.id} value={v.id}>
                {v.date} ({v.note})
              </option>
            ))}
          </Select>

          {/* Image select */}
          <Select
            label="Chọn ảnh"
            value={selectedImageId || ""}
            onChange={(e) => setSelectedImageId(e.target.value)}
            disabled={!selectedVisitId}
          >
            <option value="">-- chọn --</option>
            {images.map((img) => (
              <option key={img.id} value={img.id}>
                {img.id} - {img.time}
              </option>
            ))}
          </Select>
        </div>

        {/* Run analysis */}
        <div>
          <Button
            variant="primary"
            size="medium"
            icon="Activity"
            disabled={!selectedImageId}
            onClick={handleRun}
          >
            Chạy phân tích
          </Button>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Kết quả phân tích</h2>
          <Table columns={columns} data={analyses} rowKey="id" striped rowGap={10} />
        </div>
      </div>
    </div>
  );
}
