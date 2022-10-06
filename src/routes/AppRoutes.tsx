import { Navigate, Route, Routes } from "react-router-dom";
import CreateKataPage from "../pages/CreateKataPage";
import HomePage from "../pages/HomePage";
import KatasDetailPage from "../pages/KatasDetailPage";
import KatasPage from "../pages/KatasPage";
import EditKataPage from "../pages/EditKataPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="katas" element={<KatasPage />} />
      <Route path="createKata" element={<CreateKataPage />} />
      <Route path="editKata/:id" element={<EditKataPage />} />
      <Route path="/katas/:id" element={<KatasDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
