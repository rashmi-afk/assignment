import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // better to reference User
      required: true,
    },

    date: {
      type: Date,
      required: true,
      set: (v) => new Date(v.setHours(0, 0, 0, 0)), // normalize date
    },

    check_in: {
      type: Date,
      default: null,
    },

    check_out: {
      type: Date,
      default: null,
    },

    work_hours: {
      type: Number, // in hours (8.5)
      default: 0,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Half-day"],
      default: "Absent",
    },

    source: {
      type: String,
      enum: ["system", "manual"],
      default: "system",
    },
  },
  { timestamps: true }
);

// ❗ one attendance per employee per day
attendanceSchema.index(
  { employee_id: 1, date: 1 },
  { unique: true }
);

export default mongoose.model("Attendance", attendanceSchema);