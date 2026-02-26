import express from "express";
import {
  markAttendance,
  getAttendanceByEmployee,
  getDailyAttendance,
  updateAttendance,
} from "../controller/attendance.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const attendanceRoutes= express.Router();

// Employee punch-in/out
attendanceRoutes.post("/", protect, markAttendance);

// Admin routes
attendanceRoutes.get("/", protect, adminOnly, getAttendanceByEmployee);
attendanceRoutes.get("/daily", protect, adminOnly, getDailyAttendance);
attendanceRoutes.put("/:id", protect, adminOnly, updateAttendance);

export default attendanceRoutes;