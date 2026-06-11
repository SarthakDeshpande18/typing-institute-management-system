import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import StudentListPage from "../features/students/pages/StudentListPage";
import CreateStudentPage from "../features/students/pages/CreateStudentPage";
import ViewStudentPage from "../features/students/pages/ViewStudentPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import EditStudentPage from "../features/students/pages/EditStudentPage";

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

          <Route
            path="/students/:id"
            element={<ViewStudentPage />}
          />

          <Route
            path="/students/edit/:id"
            element={<EditStudentPage />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;