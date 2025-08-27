import React, { useState, useEffect } from "react";
import * as api from "./api";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [subject, setSubject] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let id;
    if (session && session.status === "active") {
      id = setInterval(() => {
        if (session.session_id) {
          loadSession(session.session_id);
        }
      }, 10000);
    }
    return () => clearInterval(id);
  }, [session]);

  const loadSession = async (id) => {
    try {
      const data = await api.getSessionDetails(id);
      setSession(data);
    } catch (err) {
      console.error(err);
      setMessage(`Error: ${err.message}`);
    }
  };

  const startSession = async () => {
    if (!subject.trim()) {
      setMessage("Enter a subject before starting.");
      return;
    }
    try {
      const newSession = await api.startSession(subject);
      setSession(newSession);
      setMessage("Session started.");
      loadSession(newSession.session_id);
    } catch (err) {
      console.error(err);
      setMessage(`Error: ${err.message}`);
    }
  };

  const checkIn = async () => {
    if (!rollNo.trim()) {
      setMessage("Enter a roll number first.");
      return;
    }
    if (!session) {
      setMessage("No active session.");
      return;
    }
    try {
      const res = await api.checkIn(session.session_id, rollNo);
      if (res.ok) {
        setMessage(`${rollNo} checked in. Total: ${res.total}`);
        loadSession(session.session_id);
      } else {
        setMessage(`${rollNo} already checked in.`);
      }
      setRollNo("");
    } catch (err) {
      console.error(err);
      setMessage(`Error: ${err.message}`);
    }
  };

  const endSession = async () => {
    if (!session) {
      setMessage("Nothing to end.");
      return;
    }
    try {
      await api.endSession(session.session_id);
      setMessage("Session ended.");
      loadSession(session.session_id);
    } catch (err) {
      console.error(err);
      setMessage(`Error: ${err.message}`);
    }
  };

  const active = session && session.status === "active";

  return (
    <div className="app-container">
      <h1> Attendance Mock</h1>
      {message && <div className="status-message">{message}</div>}

      {!session ? (
        <div className="session-starter">
          <h2>Start a Session</h2>
          <input
            type="text"
            placeholder="Subject (e.g. Data Structures)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <button onClick={startSession}>Start Session</button>
        </div>
      ) : (
        <div className="session-details-container">
          <div className="session-info">
            <h2>Details</h2>
            <p>
              <strong>ID:</strong> {session.session_id}
            </p>
            <p>
              <strong>Subject:</strong> {session.subject}
            </p>
            <p>
              <strong>Status:</strong> {session.status}
            </p>
            <p>
              <strong>Attendees:</strong> {session.attendees_count}
            </p>
            {active && (
              <button className="end-session-btn" onClick={endSession}>
                End Session
              </button>
            )}
          </div>

          {active && (
            <div className="check-in-section">
              <h3>Check In</h3>
              <input
                type="text"
                placeholder="Roll No (e.g. 22CSE001)"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
              <button onClick={checkIn}>Check In</button>
            </div>
          )}

          <div className="attendees-list">
            <h3>Attendees ({session.attendees_count})</h3>
            <ul>
              {session.attendees?.map((a, i) => (
                <li key={i}>
                  <strong>{a.roll_no}</strong> at{" "}
                  {new Date(a.time).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
