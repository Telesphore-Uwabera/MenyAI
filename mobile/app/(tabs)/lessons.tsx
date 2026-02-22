import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { api } from "@/lib/api";

type Lesson = {
  id: string;
  title: string;
  subtitle?: string;
  duration?: string;
  level?: string;
  module?: string;
  moduleColor?: string;
  order?: number;
  activities?: any[];
};

const MODULE_META: Record<string, { icon: string; color: string; description: string }> = {
  "Imirongo": { icon: "pencil", color: "#4CAF78", description: "Lines & Strokes" },
  "Inyuguti": { icon: "text", color: "#3B82F6", description: "Letters & Words" },
  "Imibare": { icon: "calculator", color: "#F59E0B", description: "Numbers & Math" },
  "Imishusho": { icon: "shapes", color: "#EC4899", description: "Shapes & Colors" },
};

export default function LessonsScreen() {
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const list = await api.getLessons(null);
      setLessons(list as any[]);
      setLoading(false);
    };
    load();
  }, []);

  // Group lessons by module, sorted by order
  const grouped = lessons
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .reduce<Record<string, Lesson[]>>((acc, l) => {
      const mod = (l as any).module ?? "Ibindi";
      if (!acc[mod]) acc[mod] = [];
      acc[mod].push(l);
      return acc;
    }, {});

  const modules = Object.keys(grouped);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      {/* Header */}
      <View style={{
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}>
        <Text style={{ fontSize: fontSize["2xl"], fontWeight: "800", color: colors.foreground }}>
          Amasomo
        </Text>
        <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 }}>
          {loading ? "..." : `Amasomo ${lessons.length} — Hitamo isomo ubona`}
        </Text>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.mutedForeground, marginTop: spacing.md }}>Gutegura amasomo...</Text>
        </View>
      ) : lessons.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: spacing.xl }}>
          <Ionicons name="book-outline" size={64} color={colors.mutedForeground} />
          <Text style={{ color: colors.mutedForeground, marginTop: spacing.md, fontSize: fontSize.base, textAlign: "center" }}>
            Nta masomo ahari ubu.
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: spacing.md, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {modules.map((mod) => {
            const meta = MODULE_META[mod] ?? { icon: "school", color: colors.primary, description: "" };
            const modLessons = grouped[mod];

            return (
              <View key={mod} style={{ marginBottom: spacing.xl }}>
                {/* Module Header */}
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.sm,
                  marginBottom: spacing.md,
                }}>
                  <View style={{
                    width: 36, height: 36, borderRadius: 18,
                    backgroundColor: meta.color + "22",
                    alignItems: "center", justifyContent: "center",
                  }}>
                    <Ionicons name={meta.icon as any} size={18} color={meta.color} />
                  </View>
                  <View>
                    <Text style={{ fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground }}>
                      {mod}
                    </Text>
                    <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>
                      {meta.description} • {modLessons.length} amasomo
                    </Text>
                  </View>
                </View>

                {/* Lesson Cards */}
                {modLessons.map((lesson, idx) => {
                  const isCompleted = false; // TODO: wire from progress history
                  return (
                    <TouchableOpacity
                      key={lesson.id}
                      onPress={() => router.push(`/lesson/${lesson.id}` as any)}
                      activeOpacity={0.85}
                      style={{
                        backgroundColor: colors.card,
                        borderRadius: borderRadius.lg,
                        marginBottom: spacing.sm,
                        overflow: "hidden",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.07,
                        shadowRadius: 8,
                        elevation: 2,
                        borderLeftWidth: 4,
                        borderLeftColor: meta.color,
                      }}
                    >
                      <View style={{ padding: spacing.md, flexDirection: "row", alignItems: "center" }}>
                        {/* Order badge */}
                        <View style={{
                          width: 40, height: 40, borderRadius: 20,
                          backgroundColor: meta.color + "18",
                          alignItems: "center", justifyContent: "center",
                          marginRight: spacing.md,
                        }}>
                          <Text style={{ fontSize: fontSize.sm, fontWeight: "700", color: meta.color }}>
                            {(lesson as any).order ?? idx + 1}
                          </Text>
                        </View>

                        {/* Lesson Info */}
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: fontSize.base, fontWeight: "700", color: colors.foreground }}>
                            {lesson.title}
                          </Text>
                          {(lesson as any).subtitle && (
                            <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 1 }}>
                              {(lesson as any).subtitle}
                            </Text>
                          )}
                          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.xs }}>
                            {lesson.duration && (
                              <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                                <Ionicons name="time-outline" size={11} color={colors.mutedForeground} />
                                <Text style={{ fontSize: 11, color: colors.mutedForeground }}>{lesson.duration}</Text>
                              </View>
                            )}
                            {(lesson as any).activities?.length > 0 && (
                              <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                                <Ionicons name="list-outline" size={11} color={colors.mutedForeground} />
                                <Text style={{ fontSize: 11, color: colors.mutedForeground }}>
                                  {(lesson as any).activities.length} ibibazo
                                </Text>
                              </View>
                            )}
                            {(lesson as any).difficulty && (
                              <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                                <Ionicons name="bar-chart-outline" size={11} color={colors.mutedForeground} />
                                <Text style={{ fontSize: 11, color: colors.mutedForeground }}>
                                  {(lesson as any).difficulty}
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>

                        {/* Arrow */}
                        <Ionicons name="chevron-forward" size={20} color={meta.color} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
