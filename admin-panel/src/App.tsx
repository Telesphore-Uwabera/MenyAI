import { Routes, Route, Navigate } from "react-router-dom";
import { getAdminKey } from "./lib/api";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import Users from "./pages/Users";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";

function Protected({ children }: { children: React.ReactNode }) {
  if (!getAdminKey()) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="users" element={<Users />} />
        <Route path="progress" element={<Progress />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
