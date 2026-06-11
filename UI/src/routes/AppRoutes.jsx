import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import StudentListPage from "../features/students/pages/StudentListPage";
import CreateStudentPage from "../features/students/pages/CreateStudentPage";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/students"
            element={<StudentListPage />}
          />

          <Route
            path="/students/create"
            element={<CreateStudentPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;