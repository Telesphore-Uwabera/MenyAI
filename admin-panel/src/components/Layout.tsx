import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { clearAdminKey } from "../lib/api";

const nav = [
  { to: "/", label: "Dashboard", icon: "📊" },
  { to: "/lessons", label: "Lessons", icon: "📚" },
  { to: "/users", label: "Users", icon: "👥" },
  { to: "/progress", label: "Progress", icon: "📈" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Layout() {
  const navigate = useNavigate();
  const logout = () => {
    clearAdminKey();
    navigate("/login", { replace: true });
  };
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">MenyAI Admin</div>
        <nav>
          {nav.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                "admin-sidebar-nav-link" + (isActive ? " active" : "")
              }
            >
              <span className="admin-nav-icon" aria-hidden>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <button
            type="button"
            onClick={logout}
            className="admin-btn admin-btn-secondary admin-btn-logout"
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
