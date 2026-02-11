import { useEffect, useState } from "react";
import { api, type User } from "../lib/api";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    setError("");
    api<{ users: User[] }>("/api/admin/users")
      .then((r) => setUsers(r.users))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  if (loading && users.length === 0) {
    return (
      <div>
        <h1 className="admin-page-title">Users</h1>
        <div className="admin-loading">
          <div className="admin-spinner" />
          <span style={{ marginLeft: "0.75rem" }}>Loading…</span>
        </div>
      </div>
    );
  }
  if (error && users.length === 0) {
    return (
      <div>
        <div className="admin-page-header">
          <h1 className="admin-page-title">Users</h1>
          <button type="button" onClick={load} className="admin-btn admin-btn-primary">Retry</button>
        </div>
        <div className="admin-alert admin-alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Users</h1>
          <p className="admin-page-subtitle">Registered app users.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} className="admin-btn admin-btn-secondary">
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>UID</th>
              <th>Email (internal)</th>
              <th>Display name</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.uid}>
                <td className="admin-table-mono">{u.uid}</td>
                <td>{u.email ?? "—"}</td>
                <td>{u.displayName ?? "—"}</td>
                <td>{u.createdAt ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <div className="admin-empty">No users yet.</div>}
      </div>
    </div>
  );
}
