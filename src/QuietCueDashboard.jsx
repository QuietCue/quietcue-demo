
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const generateFakeData = () => {
  const data = [];
  let engagement = 80;
  let chat = 70;
  let audio = 60;
  let viewers = 1000;
  const logs = [];

  for (let i = 0; i < 60; i++) {
    engagement += Math.random() * 6 - 3;
    chat += Math.random() * 8 - 4;
    audio += Math.random() * 10 - 5;
    viewers += Math.random() * 20 - 10;

    engagement = Math.max(0, Math.min(100, engagement));
    chat = Math.max(0, chat);
    audio = Math.max(0, audio);
    viewers = Math.max(0, viewers);

    const trigger =
      chat < 40 && audio < 40 && viewers < 980 && Math.random() > 0.5;

    if (trigger) {
      logs.push({
        time: i,
        reason: `Ad Triggered @ ${i}s — Chat ↓, Audio ↓, Viewers ↓`
      });
    }

    data.push({
      time: i,
      engagement: Math.round(engagement),
      chat: Math.round(chat),
      audio: Math.round(audio),
      viewers: Math.round(viewers),
      adTrigger: trigger ? 1 : null
    });
  }

  return { data, logs };
};

const QuietCueDashboard = () => {
  const [session, setSession] = useState(generateFakeData());

  useEffect(() => {
    const interval = setInterval(() => {
      setSession(generateFakeData());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>QuietCue MVP Dashboard</h1>
      <p>Simulated stream with logic-based ad triggers.</p>

      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={session.data}>
            <XAxis dataKey="time" tickFormatter={(v) => `${v}s`} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line dataKey="engagement" stroke="#4f46e5" dot={false} />
            <Line dataKey="chat" stroke="#22c55e" dot={false} />
            <Line dataKey="audio" stroke="#f97316" dot={false} />
            <Line dataKey="adTrigger" stroke="#f43f5e" strokeDasharray="4 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button
        onClick={() => setSession(generateFakeData())}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Simulate New Session
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Ad Trigger Log:</h3>
        <ul>
          {session.logs.map((log, i) => (
            <li key={i}>{log.reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuietCueDashboard;
