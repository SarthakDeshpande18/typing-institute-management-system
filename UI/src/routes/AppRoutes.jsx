import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import StudentListPage from "../features/students/pages/StudentListPage";
import CreateStudentPage from "../features/students/pages/CreateStudentPage";
import ViewStudentPage from "../features/students/pages/ViewStudentPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import EditStudentPage from "../features/students/pages/EditStudentPage";
import DashboardLayout from "../layouts/DashboardLayout";
import CollectFeePage from "../features/fees/pages/CollectFeePage";
import PendingFeesPage from "../features/fees/pages/PendingFeesPage";
import Register from "../features/auth/pages/Register";
import { Navigate } from "react-router-dom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Navigate to="/register" replace />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Protected Routes */}

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

          <Route
            path="/fees/:studentId"
            element={<CollectFeePage />}
          />

          <Route
            path="/fees/pending"
            element={<PendingFeesPage />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;