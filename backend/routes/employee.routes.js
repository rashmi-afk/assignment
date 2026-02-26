import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
} from "../controller/employee.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const employeeRoutes= express.Router();

employeeRoutes.post("/employees", protect, adminOnly, createEmployee);
employeeRoutes.get("/employees", protect, adminOnly, getEmployees);
employeeRoutes.get("/employees/:id", protect, adminOnly, getEmployeeById);
employeeRoutes.put("/employees/:id", protect, adminOnly, updateEmployee);

export default employeeRoutes;

// import express from "express";
// import { protect, isAdmin } from "../middleware/authMiddleware.js";
// import { getEmployees } from "../controller/employeeController.js";

// const router = express.Router();

// router.get("/employees", protect, isAdmin, getEmployees);

// export default router;