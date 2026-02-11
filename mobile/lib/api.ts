/**
 * MenyAI API client – connects to Node.js + Express backend.
 * Uses EXPO_PUBLIC_API_URL or defaults for emulator/simulator.
 */
import { Platform } from "react-native";

export const getBaseUrl = (): string => {
  if (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL.replace(/\/$/, "");
  }
  if (Platform.OS === "android") {
    return "http://10.0.2.2:4000";
  }
  return "http://localhost:4000";
};

const BASE_URL = getBaseUrl();

export type ProgressData = {
  completedLessons: number;
  totalLessons: number;
  remainingLessons?: number;
  streakDays: number;
};

export type ApiLesson = {
  id: string;
  title: string;
  duration?: string;
  level?: string;
};

export type LessonListItem = {
  id: string;
  title: string;
  duration: string;
  meta: string;
  progress: number;
  status: "completed" | "progress" | "new";
  icon: string;
  gradient: [string, string];
};

const DEFAULT_META = "Ijwi + Amashusho";
const ICONS = ["nutrition", "calculator", "medical"] as const;
const GRADIENTS: [string, string][] = [
  ["#FFE5B4", "#FFDAB9"],
  ["#B4E5FF", "#B9D9FF"],
  ["#E5FFB4", "#D9FFB9"],
];

function mapLesson(api: ApiLesson, index: number): LessonListItem {
  const status: LessonListItem["status"] =
    index === 0 ? "completed" : index === 1 ? "progress" : "new";
  const progress = index === 0 ? 100 : index === 1 ? 45 : 0;
  return {
    id: api.id,
    title: api.title,
    duration: api.duration ?? "10 min",
    meta: DEFAULT_META,
    progress,
    status,
    icon: ICONS[index % ICONS.length],
    gradient: GRADIENTS[index % GRADIENTS.length],
  };
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export const api = {
  getBaseUrl: () => BASE_URL,

  async getLessons(token?: string | null): Promise<LessonListItem[]> {
    try {
      const url = `${BASE_URL}/api/lessons`;
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Failed to fetch lessons");
      const data = await res.json();
      const list = (data.lessons ?? []) as ApiLesson[];
      return list.map((l, i) => mapLesson(l, i));
    } catch {
      return [];
    }
  },

  async getProgress(token?: string | null): Promise<ProgressData | null> {
    try {
      const url = `${BASE_URL}/api/progress`;
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Failed to fetch progress");
      const data = await res.json();
      return {
        completedLessons: data.completedLessons ?? 0,
        totalLessons: data.totalLessons ?? 50,
        remainingLessons: data.remainingLessons ?? (data.totalLessons ?? 50) - (data.completedLessons ?? 0),
        streakDays: data.streakDays ?? 0,
      };
    } catch {
      return null;
    }
  },

  async postAiChat(message: string, token?: string | null): Promise<string | null> {
    try {
      const res = await fetch(`${BASE_URL}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.reply ?? null;
    } catch {
      return null;
    }
  },

  async healthCheck(): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },
};
