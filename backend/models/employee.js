import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employee_id: {
      type: Number,
      unique: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    department: {
      type: String,
      required: true
    },

    designation: {
      type: String,
      required: true
    },

    base_salary: {
      type: Number,
      required: true
    },

    joining_date: {
      type: Date,
      required: true
    },

    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee"
    }
  },
  { timestamps: true }
);

/**
 * Auto-increment employee_id before save
 */
employeeSchema.pre("save", async function () {
  if (this.employee_id) return;

  const lastEmployee = await this.constructor
    .findOne({}, { employee_id: 1 })
    .sort({ employee_id: -1 });

  this.employee_id = lastEmployee ? lastEmployee.employee_id + 1 : 1001;
});

export default mongoose.model("Employee", employeeSchema);