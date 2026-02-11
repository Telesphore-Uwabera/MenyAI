import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  TrendingUp,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { clearAdminKey } from "../lib/api";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/lessons", label: "Lessons", icon: BookOpen },
  { to: "/users", label: "Users", icon: Users },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
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
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                "admin-sidebar-nav-link" + (isActive ? " active" : "")
              }
            >
              <Icon size={18} strokeWidth={2} className="admin-nav-icon-svg" />
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
            <LogOut size={16} />
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
