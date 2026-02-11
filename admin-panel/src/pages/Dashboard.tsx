import { useEffect, useState } from "react";
import { api, type Stats } from "../lib/api";

const STAT_ICONS: Record<string, string> = {
  Lessons: "📚",
  Users: "👥",
  "Progress records": "📈",
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    setError("");
    api<Stats>("/api/admin/stats")
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  if (error) {
    return (
      <div>
        <div className="admin-page-header">
          <h1 className="admin-page-title">Dashboard</h1>
          <button type="button" onClick={load} className="admin-btn admin-btn-primary">
            Retry
          </button>
        </div>
        <div className="admin-alert admin-alert-error">{error}</div>
      </div>
    );
  }

  if (loading && !stats) {
    return (
      <div>
        <h1 className="admin-page-title">Dashboard</h1>
        <div className="admin-loading">
          <div className="admin-spinner" />
          <span style={{ marginLeft: "0.75rem" }}>Loading…</span>
        </div>
      </div>
    );
  }

  const cards = [
    { label: "Lessons", value: stats!.totalLessons },
    { label: "Users", value: stats!.totalUsers },
    { label: "Progress records", value: stats!.totalProgressDocs },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="admin-btn admin-btn-secondary"
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      <div className="admin-stat-cards">
        {cards.map(({ label, value }) => (
          <div key={label} className="admin-stat-card">
            <div className="admin-stat-card-icon">{STAT_ICONS[label] ?? "•"}</div>
            <div className="admin-stat-card-label">{label}</div>
            <div className="admin-stat-card-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
