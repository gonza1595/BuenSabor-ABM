import { Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import RubroPage from "../pages/RubroPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/productos" element={<DashboardPage />} />
      <Route path="/rubros" element={<RubroPage />} />
    </Routes>
  );
}
