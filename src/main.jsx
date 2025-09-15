import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initStorage } from "./utils/initStorage";  // 👈 seed dữ liệu mẫu

// Khởi tạo mock data vào localStorage (nếu chưa có)
initStorage();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
