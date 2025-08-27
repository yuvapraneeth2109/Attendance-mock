const sessions = new Map();

function startNewSession(subject) {
  const id = Math.random().toString(36).slice(2, 8);
  const started_at = new Date().toISOString();
  const expires_at = new Date(Date.now() + 60 * 60 * 1000).toISOString();

  const session = {
    sessionId: id,
    subject,
    started_at,
    expires_at,
    status: "active",
    attendees: new Map(),
  };

  sessions.set(id, session);
  return session;
}

function getSession(id) {
  const s = sessions.get(id);
  if (!s) return null;

  const attendees = [...s.attendees.values()];
  return {
    session_id: s.sessionId,
    subject: s.subject,
    started_at: s.started_at,
    expires_at: s.expires_at,
    status: s.status,
    attendees_count: attendees.length,
    attendees,
  };
}

function checkInAttendee(id, rollNo) {
  const s = sessions.get(id);
  if (!s || s.status === "ended") return null;

  if (s.attendees.has(rollNo)) {
    return { ok: false, total: s.attendees.size };
  }

  s.attendees.set(rollNo, { roll_no: rollNo, time: new Date().toISOString() });
  return { ok: true, total: s.attendees.size };
}

function endSession(id) {
  const s = sessions.get(id);
  if (!s) return false;

  s.status = "ended";
  return true;
}

module.exports = {
  startNewSession,
  getSession,
  checkInAttendee,
  endSession,
};
