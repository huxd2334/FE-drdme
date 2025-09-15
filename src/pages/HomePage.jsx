import React, { useState } from "react";
import { dashboardStats, todayTasks as initialTasks } from "../utils/mock_data";
import {
  Users,
  UserCheck,
  Clock4,
  ClipboardList,
} from "lucide-react";
import Table, { StatusButton } from "../components/common/Table";

const iconMap = {
  patients_today: Users,
  checked_today: UserCheck,
  waiting_today: Clock4,
  prescriptions: ClipboardList,
};

export default function HomePage() {
  const [tasks] = useState(initialTasks);

  const columns = [
    { key: "stt", title: "STT", width: 80, align: "left" },
    { key: "time", title: "Thời gian", width: 120, align: "left" },
    { key: "content", title: "Nội dung", align: "left" },
    {
      key: "status",
      title: "Trạng thái",
      width: 200,
      align: "left",
      render: (_, v) => <StatusButton initial={v} />,
    },
  ];

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayStr = `${dd}/${mm}/${yyyy}`;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-gray-600 font-small text-right px-4">
          Hôm nay là ngày {todayStr}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((s) => {
            const Icon = iconMap[s.id] ?? ClipboardList;
            return (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded-xl p-4 text-white shadow"
                style={{ backgroundColor: s.color }}
              >
                <div className="p-2 rounded-lg bg-white/20">
                  <Icon width={20} height={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-sm whitespace-pre-line">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Danh sách công việc hôm nay
          </h3>
          <Table columns={columns} data={tasks} rowKey="id" striped rowGap={10} />
        </div>
      </div>
    </div>
  );
}
