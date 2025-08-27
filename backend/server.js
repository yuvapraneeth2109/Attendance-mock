const express = require("express");
const cors = require("cors");
const sessions = require("./sessions");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/session/start", (req, res) => {
  const { subject } = req.body;
  if (!subject) {
    return res.status(400).json({ error: "subject is required" });
  }

  const newSession = sessions.startNewSession(subject);
  res.status(201).json({
    session_id: newSession.sessionId,
    subject: newSession.subject,
    started_at: newSession.started_at,
    expires_at: newSession.expires_at,
  });
});

app.get("/session/:id", (req, res) => {
  const { id } = req.params;
  const found = sessions.getSession(id);
  if (!found) {
    return res.status(404).json({ error: "no such session" });
  }
  res.json(found);
});

app.post("/session/:id/checkin", (req, res) => {
  const { id } = req.params;
  const { roll_no } = req.body;
  if (!roll_no) {
    return res.status(400).json({ error: "roll_no is required" });
  }

  const outcome = sessions.checkInAttendee(id, roll_no);
  if (!outcome) {
    return res.status(404).json({ error: "session not found or expired" });
  }
  res.json(outcome);
});

app.post("/session/:id/end", (req, res) => {
  const { id } = req.params;
  const ended = sessions.endSession(id);
  if (!ended) {
    return res.status(404).json({ error: "could not end session" });
  }
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
