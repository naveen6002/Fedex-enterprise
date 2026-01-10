import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import FedexDashboard from "../pages/fedex/Dashboard";
import DCADashboard from "../pages/dca/Dashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/fedex/dashboard" element={<FedexDashboard />} />
        <Route path="/dca/dashboard" element={<DCADashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
