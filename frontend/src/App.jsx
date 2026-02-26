import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

import ProtectedRoute from "./pages/components/ProtectedRoute.jsx";
import AttendanceForm from "./pages/attendance/AttendanceForm.jsx";
import DailyAttendance from "./pages/attendance/DailyAttendance.jsx";
import MonthlyAttendance from "./pages/attendance/MonthlyAttendance.jsx";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Employee Dashboard */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/attendance/add" element={<AttendanceForm />} />
<Route path="/attendance/daily" element={<DailyAttendance />} />
<Route path="/attendance/monthly" element={<MonthlyAttendance />} />

      </Routes>
    </Router>
  );
};

export default App;