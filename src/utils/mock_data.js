// src/utils/mock_data.js

export const MOCK_USERS = [
  {
    id: 1,
    role: "doctor",
    doctorId: "111111",
    email: "dr.binh@hospital.vn",
    username: "dr.binh",
    password: "111111",
    name: "Binh",
    active: true,
  },
  {
    id: 2,
    role: "user",
    email: "user1@example.com",
    username: "user1",
    password: "user@123",
    name: "Nguyen Van A",
    active: true,
  },
  {
    id: 3,
    role: "admin",
    email: "admin@system.local",
    username: "admin",
    password: "admin@123",
    name: "System Admin",
    active: true,
  },
];

export function findUserByIdentifier(identifier = "") {
  const id = String(identifier).trim().toLowerCase();
  return MOCK_USERS.find(u =>
    (u.doctorId && u.doctorId.toLowerCase() === id) ||
    (u.email && u.email.toLowerCase() === id) ||
    (u.username && u.username.toLowerCase() === id)
  );
}

// HomePage mock data moved to HomePage.jsx for better cohesion
// src/utils/mock_data.js
export const dashboardStats = [
  { id: "patients_today", color: "#2563EB", value: 10, label: "Bệnh nhân\nhôm nay" },
  { id: "checked_today",  color: "#16A34A", value: 3,  label: "Đã khám\nHôm nay" },
  { id: "waiting_today",  color: "#F59E0B", value: 7,  label: "Đang chờ*\nHôm nay" },
  { id: "prescriptions",  color: "#7C3AED", value: 30, label: "Tổng số\nĐơn thuốc" },
];

export const todayTasks = [
  {
    id: "T01",
    stt: "01",
    time: "08:30",
    content: "Khám bệnh nhân Nguyễn Văn A (Tiểu đường giai đoạn 2)",
    status: "done",
  },
  {
    id: "T02",
    stt: "02",
    time: "09:10",
    content: "Tái khám Trần Thị B (DME, cần chụp OCT)",
    status: "done",
  },
  {
    id: "T03",
    stt: "03",
    time: "10:00",
    content: "Kê thuốc bổ sung cho Lê Văn C",
    status: "wait",
  },
  {
    id: "T04",
    stt: "04",
    time: "10:45",
    content: "Hội chẩn nhóm về ca phức tạp",
    status: "wait",
  },
  {
    id: "T05",
    stt: "05",
    time: "13:30",
    content: "Khám bệnh nhân Nguyễn Văn A (Tiểu đường giai đoạn 2)",
    status: "wait",
  },
  {
    id: "T06",
    stt: "06",
    time: "14:15",
    content: "Xem lại kết quả xét nghiệm",
    status: "wait",
  },
];

export const patients = [
  {
    id: "BN001",
    name: "Nguyễn Văn A",
    dob: "1980-05-12",
    gender: "male",
  },
  {
    id: "BN002",
    name: "Trần Thị B",
    dob: "1975-03-22",
    gender: "female",
  },
];

export const visits = [
  {
    id: "V001",
    patientId: "BN001",
    date: "2025-09-01",
    note: "Khám lần đầu",
  },
  {
    id: "V002",
    patientId: "BN001",
    date: "2025-09-15",
    note: "Tái khám sau 2 tuần",
  },
];

export const images = [
  {
    id: "IMG001",
    visitId: "V001",
    url: "/retina.jpg",
    device: "FundusCam-1",
    time: "10:30:45",
  },
  {
    id: "IMG002",
    visitId: "V002",
    url: "/retina.jpg",
    device: "FundusCam-1",
    time: "14:12:30",
  },
];

export const analyses = [
  {
    id: "AN001",
    visitId: "V001",
    imageId: "IMG001",
    drLevel: "Mild",
    dme: false,
    createdAt: "2025-09-01T10:45:00",
  },
];


