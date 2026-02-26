const API_BASE = "http://localhost:8000/api/attendance";

/* ================================
   🔐 Auth Header Helper
================================ */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/* ================================
   👥 Employees (Admin)
   GET /api/attendance/employees
================================ */
export const fetchEmployees = async () => {
  const res = await fetch(`${API_BASE}/employees`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch employees");
  }

  const json = await res.json();
  return json.data; // always return array
};

/* ================================
   🟢 Employee Punch In / Out
   POST /api/attendance
================================ */
export const markAttendance = async (attendanceData) => {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(attendanceData),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Attendance failed");
  }

  return json;
};

/* ================================
   📅 Admin Daily Attendance
   GET /api/attendance/daily?date=
================================ */
export const getDailyAttendance = async (date) => {
  const res = await fetch(
    `${API_BASE}/daily?date=${date}`,
    { headers: getAuthHeaders() }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to load daily attendance");
  }

  return json.data;
};

/* ================================
   📆 Admin Monthly Attendance
   GET /api/attendance?employee_id=&month=&year=
================================ */
export const getMonthlyAttendance = async (employeeId, month, year) => {
  const res = await fetch(
    `${API_BASE}?employee_id=${employeeId}&month=${month}&year=${year}`,
    { headers: getAuthHeaders() }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to load monthly attendance");
  }

  return json.data;
};

