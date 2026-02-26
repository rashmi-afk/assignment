import { useEffect, useState } from "react";
import { fetchEmployees, getMonthlyAttendance } 
from "../services/attendanceApi.js";

export default function MonthlyAttendance() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [month, setMonth] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchEmployees().then(setEmployees);
  }, []);

  const loadData = async () => {
    const res = await getMonthlyAttendance(employeeId, month);
    setData(res);
  };

  return (
    <div className="card">
      <h3>Monthly Attendance</h3>

      <select onChange={(e) => setEmployeeId(e.target.value)}>
        <option value="">Select Employee</option>
        {employees.map((e) => (
          <option key={e._id} value={e._id}>{e.name}</option>
        ))}
      </select>

      <input type="month" onChange={(e) => setMonth(e.target.value)} />
      <button onClick={loadData}>View</button>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Check-in</th>
            <th>Check-out</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d._id}>
              <td>{new Date(d.date).toLocaleDateString()}</td>
              <td>{d.status}</td>
              <td>{d.check_in || "-"}</td>
              <td>{d.check_out || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}