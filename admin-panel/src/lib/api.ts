const ADMIN_KEY = "menyai_admin_key";
const API_BASE_KEY = "menyai_api_base";

/** Build-time API URL (e.g. for production deploy). */
function getEnvApiBase(): string {
  return (import.meta as unknown as { env?: { VITE_API_URL?: string; DEV?: boolean } }).env?.VITE_API_URL ?? "";
}

const DEFAULT_DEV_API = "http://localhost:4000";

export function getApiBase(): string {
  const stored = localStorage.getItem(API_BASE_KEY);
  if (stored != null && stored !== "") return stored.replace(/\/$/, "");
  const env = getEnvApiBase();
  if (env) return env.replace(/\/$/, "");
  if ((import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV) return DEFAULT_DEV_API;
  return "";
}

export function setApiBase(url: string): void {
  const trimmed = url.trim().replace(/\/$/, "");
  if (trimmed) localStorage.setItem(API_BASE_KEY, trimmed);
  else localStorage.removeItem(API_BASE_KEY);
}

export function getAdminKey(): string | null {
  return localStorage.getItem(ADMIN_KEY);
}

export function setAdminKey(key: string): void {
  localStorage.setItem(ADMIN_KEY, key);
}

export function clearAdminKey(): void {
  localStorage.removeItem(ADMIN_KEY);
}

function getHeaders(): HeadersInit {
  const key = getAdminKey();
  return {
    "Content-Type": "application/json",
    ...(key ? { "X-Admin-Key": key } : {}),
  };
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const base = getApiBase();
  const url = base ? `${base}${path}` : path;
  const res = await fetch(url, {
    ...options,
    headers: { ...getHeaders(), ...options?.headers } as HeadersInit,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as { error?: string }).error || res.statusText;
    const friendly =
      res.status === 503 && msg
        ? msg
        : res.status === 503
          ? "Backend or database unavailable. Start the backend (port 4000) and set FIREBASE_SERVICE_ACCOUNT_JSON in backend/.env."
          : msg;
    throw new Error(friendly);
  }
  return data as T;
}

export type Stats = { totalLessons: number; totalUsers: number; totalProgressDocs: number };
export type Lesson = { id: string; title: string; duration?: string; level?: string; order?: number; description?: string };
export type User = { uid: string; email: string | null; displayName: string | null; createdAt: string };
export type Progress = { uid: string; completedLessons?: number; streakDays?: number; updatedAt?: string };
