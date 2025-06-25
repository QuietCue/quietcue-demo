
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const generateFakeData = () => {
  const data = [];
  let engagement = 80;
  for (let i = 0; i < 60; i++) {
    const delta = Math.random() * 10 - 5;
    engagement = Math.max(0, Math.min(100, engagement + delta));
    const isAdTrigger = engagement < 45 && Math.random() > 0.7;
    data.push({ time: i, engagement: Math.round(engagement), adTrigger: isAdTrigger ? 1 : null });
  }
  return data;
};

const QuietCueDashboard = () => {
  const [data, setData] = useState(generateFakeData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateFakeData());
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>QuietCue Demo Dashboard</h1>
      <p>Monitoring stream engagement to detect ideal ad placement windows.</p>
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" tickFormatter={(v) => `${v}s`} />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(v, n) => [`${v}`, n === "adTrigger" ? "Ad Trigger" : "Engagement"]} />
            <Line type="monotone" dataKey="engagement" stroke="#4f46e5" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="adTrigger" stroke="#f43f5e" strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <button onClick={() => setData(generateFakeData())} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Simulate New Session
      </button>
    </div>
  );
};

export default QuietCueDashboard;
