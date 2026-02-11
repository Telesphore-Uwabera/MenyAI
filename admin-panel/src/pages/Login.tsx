import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminKey, clearAdminKey, setApiBase, getApiBase, api } from "../lib/api";

const MOCK_USERNAME = "Admin";
const MOCK_PASSWORD = "123";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState(getApiBase());
  const navigate = useNavigate();

  const saveApiUrl = () => {
    setApiBase(apiUrl.trim());
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Enter username and password.");
      return;
    }
    const isMock = username.trim() === MOCK_USERNAME && password === MOCK_PASSWORD;
    if (isMock) {
      setAdminKey(MOCK_PASSWORD);
      setLoading(true);
      try {
        await api<{ totalLessons: number }>("/api/admin/stats");
        navigate("/", { replace: true });
      } catch {
        setError("Backend not reachable. Set Backend URL in Settings after login, or start the backend (port 4000).");
        clearAdminKey();
      } finally {
        setLoading(false);
      }
      return;
    }
    setLoading(true);
    try {
      setAdminKey(password.trim());
      await api<{ totalLessons: number }>("/api/admin/stats");
      navigate("/", { replace: true });
    } catch {
      setError("Invalid credentials.");
      clearAdminKey();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <form onSubmit={submit} className="admin-login-card">
        <h1 className="admin-login-title">MenyAI Admin</h1>
        <p className="admin-login-subtitle">
          Username and password (mock: Admin / 123).
        </p>
        <div className="admin-form-group">
          <label className="admin-form-label">Backend URL (optional)</label>
          <input
            type="url"
            className="admin-input"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            onBlur={saveApiUrl}
            placeholder="http://localhost:4000"
          />
        </div>
        <div className="admin-form-group">
          <input
            type="text"
            className="admin-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
          />
        </div>
        <div className="admin-form-group">
          <input
            type="password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
          />
        </div>
        {error && <div className="admin-alert admin-alert-error">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="admin-btn admin-btn-primary"
          style={{ width: "100%" }}
        >
          {loading ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
