import React, { useEffect, useState } from "react";
import "./EmployeeDashboard.css";

const weekStats = [
  { day: "Mon", hours: 8.5, status: "present" },
  { day: "Tue", hours: 7.0, status: "present" },
  { day: "Wed", hours: 0, status: "absent" },
  { day: "Thu", hours: 9.0, status: "present" },
  { day: "Fri", hours: 6.5, status: "late" },
];

const EmployeeDashboard = () => {
  const [user, setUser] = useState(null);
  const [punchedIn, setPunchedIn] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timer, setTimer] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setTimeout(() => {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }, 0);
  }
}, []);

  const handlePunchIn = () => {
    setPunchedIn(true);
    setElapsedSeconds(0);
    const ref = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    setTimer(ref);
  };

  const handlePunchOut = () => {
    clearInterval(timer);
    setPunchedIn(false);
    setElapsedSeconds(0);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="emp-dashboard">
      <header className="emp-header">
        <div>
          <h2>Employee Dashboard</h2>
          <p className="sub">
            Welcome, {user?.name || "Employee"}
          </p>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {/* Punch Card */}
      <div className="card punch-card">
        <h3>{new Date().toLocaleTimeString()}</h3>

        {punchedIn && (
          <p className="timer">{formatTime(elapsedSeconds)}</p>
        )}

        <div className="btn-row">
          <button
            onClick={handlePunchIn}
            disabled={punchedIn}
            className="btn-in"
          >
            Punch In
          </button>
          <button
            onClick={handlePunchOut}
            disabled={!punchedIn}
            className="btn-out"
          >
            Punch Out
          </button>
        </div>

        <span className={`status ${punchedIn ? "on" : "off"}`}>
          {punchedIn ? "Active" : "Not Clocked In"}
        </span>
      </div>

      {/* Weekly Stats */}
      <div className="card">
        <h3>This Week</h3>
        {weekStats.map((d) => (
          <div key={d.day} className="week-row">
            <span>{d.day}</span>
            <div className="bar">
              <div
                className={`fill ${d.status}`}
                style={{ width: `${(d.hours / 10) * 100}%` }}
              />
            </div>
            <span>{d.hours ? `${d.hours}h` : "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;