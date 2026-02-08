/**
 * Mock data for Kwiga Rwanda app. Replace with Firebase when ready.
 */

export const MOCK_USER = {
  name: "Alice",
  language: "Kinyarwanda" as const,
};

export type LessonStatus = "completed" | "download" | "locked";

export type IconName = "leaf" | "people" | "walk" | "book" | "create" | "school" | "flower";

export interface LessonSummary {
  id: string;
  title: string;
  icon: IconName;
  completed?: boolean;
  hasDownload?: boolean;
  levelLabel?: string;
}

export interface LessonInLevel {
  id: string;
  title: string;
  subtitle: string;
  status: LessonStatus;
  icon?: IconName;
}

export interface LevelOption {
  id: number;
  label: string;
  lessonCount: number;
}

/** Lessons list (Amasomo / Hitamo Icyiciro) */
export const MOCK_LESSONS: LessonSummary[] = [
  { id: "1", title: "Hitamo Icyiciro", icon: "leaf", completed: true, levelLabel: "Ikirenga 1" },
  { id: "2", title: "Gahunda y'Amasomo", icon: "people", hasDownload: true, levelLabel: "Ikirenga 1" },
  { id: "3", title: "Imirimo y'Amasomo", icon: "walk", hasDownload: true, levelLabel: "Ikirenga 1" },
];

/** Level selector options */
export const MOCK_LEVELS: LevelOption[] = [
  { id: 1, label: "Ikirenga 1", lessonCount: 12 },
  { id: 2, label: "Ikirenga 2", lessonCount: 9 },
  { id: 3, label: "Ikirenga 3", lessonCount: 6 },
];

/** Lessons inside a level (Yiga screen) - by level id */
export const MOCK_LESSONS_BY_LEVEL: Record<string, LessonInLevel[]> = {
  "1": [
    { id: "1", title: "Hano Ku Isoko", subtitle: "Icymvúte • Umukino 1/1", status: "completed", icon: "leaf" },
    { id: "2", title: "Amategeko Ku Isoko", subtitle: "Icymvúte • Umukino 1/1", status: "download", icon: "leaf" },
    { id: "3", title: "Kugura Ibicuruzwa", subtitle: "Imibare • 15 min", status: "locked", icon: "leaf" },
  ],
  "2": [
    { id: "4", title: "Gusoma", subtitle: "Inyuguti n'amagambo", status: "download", icon: "book" },
    { id: "5", title: "Kwandika", subtitle: "Kwiga gutera intambwe", status: "locked", icon: "create" },
  ],
  "3": [
    { id: "6", title: "Ikirenga 3 - Isomo 1", subtitle: "Icyiciro 3", status: "locked", icon: "school" },
  ],
};

/** Default lessons for a level when id not in map */
export function getLessonsForLevel(levelId: string): LessonInLevel[] {
  return MOCK_LESSONS_BY_LEVEL[levelId] ?? MOCK_LESSONS_BY_LEVEL["1"];
}

/** Level duration in minutes (mock) */
export function getLevelDurationMinutes(_levelId: string): number {
  return 60;
}

export interface PracticeMatchItem {
  image: string;
  word: string;
  icon: string;
}

/** Practice: match word to image */
export const MOCK_PRACTICE_MATCH: PracticeMatchItem[] = [
  { image: "Ifu", word: "ifu", icon: "cube" },
  { image: "Inyanya", word: "inyanya", icon: "nutrition" },
  { image: "Inama", word: "inama", icon: "chatbubbles" },
  { image: "Amagi", word: "amagi", icon: "egg" },
];

/** Activities sample content */
export const MOCK_ACTIVITIES = [
  { id: "1", title: "Gusoma amagambo", date: "Uwa gatatu", count: 12, icon: "book" as const },
  { id: "2", title: "Kwandika inyuguti", date: "Uwa kane", count: 8, icon: "create" as const },
  { id: "3", title: "Gusoma n'ijwi", date: "Uwa gatanu", count: 5, icon: "volume-high" as const },
];

/** Progress stats (mock) */
export const MOCK_PROGRESS = {
  completedLessons: 3,
  totalLessons: 12,
  streakDays: 5,
};
