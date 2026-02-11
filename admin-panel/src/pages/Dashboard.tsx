import { useEffect, useState } from "react";
import { BookOpen, Users, Activity, RefreshCw } from "lucide-react";
import { api, type Stats } from "../lib/api";

const CARD_ICON_SIZE = 22;

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
    {
      label: "Lessons",
      value: stats!.totalLessons,
      icon: BookOpen,
      color: "var(--primary)",
    },
    { label: "Users", value: stats!.totalUsers, icon: Users, color: "#1976d2" },
    {
      label: "Progress records",
      value: stats!.totalProgressDocs,
      icon: Activity,
      color: "#7b1fa2",
    },
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
          <RefreshCw size={18} className={loading ? "admin-spinner-icon" : ""} />
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      <div className="admin-stat-cards">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="admin-stat-card admin-stat-card-with-icon">
            <div className="admin-stat-card-icon" style={{ background: `${color}18`, color }}>
              <Icon size={CARD_ICON_SIZE} strokeWidth={2} />
            </div>
            <div className="admin-stat-card-label">{label}</div>
            <div className="admin-stat-card-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
