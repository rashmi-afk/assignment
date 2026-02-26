import { useState } from "react";
import { getDailyAttendance } from "../services/attendanceApi.js";

export default function DailyAttendance() {
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);

  const loadData = async () => {
    const data = await getDailyAttendance(date);
    setRecords(data);
  };

  const statusColor = (status) => {
    if (status === "Present") return "green";
    if (status === "Absent") return "red";
    return "orange";
  };

  return (
    <div className="card">
      <h3>Daily Attendance</h3>

      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={loadData}>View</button>

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Status</th>
            <th>Check-in</th>
            <th>Check-out</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.employee_id.name}</td>
              <td style={{ color: statusColor(r.status) }}>
                {r.status}
              </td>
              <td>{r.check_in || "-"}</td>
              <td>{r.check_out || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}