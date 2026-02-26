import { useEffect, useState } from "react";
import { fetchEmployees, markAttendance }  from "./../services/attendanceApi.js";

export default function AttendanceForm() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    check_in: "",
    check_out: "",
    status: "Present",
  });





useEffect(() => {
  fetchEmployees()
    .then(setEmployees)
    .catch(err => console.error(err.message));
}, []);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await markAttendance(form);
    alert("Attendance saved");
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Mark Attendance</h3>

      <select name="employee_id" onChange={handleChange} required>
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
        ))}
      </select>

      <input type="date" name="date" onChange={handleChange} required />
      <input type="time" name="check_in" onChange={handleChange} />
      <input type="time" name="check_out" onChange={handleChange} />

      <select name="status" onChange={handleChange}>
        <option>Present</option>
        <option>Absent</option>
        <option>Half-day</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}