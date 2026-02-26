import express from "express";
import { getLeaveTypes, createLeaveType } from "../controller/leaveType.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/leave-types",
  protect,
  adminOnly,
  getLeaveTypes
);

router.post(
  "/leave-types",
  protect,
  adminOnly,
  createLeaveType
);

export default router;