const BASE_URL = "http://localhost:3000";

export async function startSession(subject) {
  const res = await fetch(`${BASE_URL}/session/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject }),
  });
  if (!res.ok) throw new Error("could not start session");
  return res.json();
}

export async function getSessionDetails(id) {
  const res = await fetch(`${BASE_URL}/session/${id}`);
  if (!res.ok) throw new Error("session not found");
  return res.json();
}

export async function checkIn(id, rollNo) {
  const res = await fetch(`${BASE_URL}/session/${id}/checkin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roll_no: rollNo }),
  });
  if (!res.ok) throw new Error("check-in failed");
  return res.json();
}

export async function endSession(id) {
  const res = await fetch(`${BASE_URL}/session/${id}/end`, { method: "POST" });
  if (!res.ok) throw new Error("could not end session");
  return res.json();
}
