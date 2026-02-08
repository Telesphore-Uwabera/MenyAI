import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { MOCK_LESSON_LIST } from "@/data/mock";
import { Button } from "@/components/ui/Button";

export default function LessonsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View
        style={{
          paddingHorizontal: spacing.md,
          paddingTop: spacing.md,
          paddingBottom: spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <Text style={{ fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground }}>
          Amasomo
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground, marginBottom: spacing.lg }}>
          Urwego 1 - Ibanze
        </Text>

        {MOCK_LESSON_LIST.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            onPress={() => lesson.status !== "new" && router.push(`/lesson/${lesson.id}`)}
            activeOpacity={0.9}
            style={{
              backgroundColor: colors.card,
              borderRadius: borderRadius.lg,
              overflow: "hidden",
              marginBottom: spacing.md,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            {/* Lesson image area */}
            <View
              style={{
                height: 140,
                backgroundColor: lesson.gradient?.[0] ?? colors.primaryMuted,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name={lesson.icon} size={48} color={colors.primaryDark} />
            </View>
            <View style={{ padding: spacing.md }}>
              <Text style={{ fontSize: fontSize.base, fontWeight: "700", color: colors.foreground, marginBottom: spacing.sm }}>
                {lesson.title}
              </Text>
              <View style={{ flexDirection: "row", gap: spacing.md, marginBottom: spacing.sm }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Ionicons name="time-outline" size={14} color={colors.mutedForeground} />
                  <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>{lesson.duration}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Ionicons name="volume-high" size={14} color={colors.mutedForeground} />
                  <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>{lesson.meta}</Text>
                </View>
              </View>

              {lesson.status === "completed" && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                    backgroundColor: colors.primaryMuted,
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                    borderRadius: 12,
                    alignSelf: "flex-start",
                  }}
                >
                  <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                  <Text style={{ fontSize: fontSize.xs, fontWeight: "600", color: colors.success }}>
                    Yararangiye
                  </Text>
                </View>
              )}

              {lesson.status === "progress" && (
                <>
                  <View style={{ height: 6, backgroundColor: colors.muted, borderRadius: 3, marginBottom: spacing.xs, overflow: "hidden" }}>
                    <View
                      style={{
                        width: `${lesson.progress}%`,
                        height: "100%",
                        backgroundColor: colors.primary,
                        borderRadius: 3,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                      backgroundColor: colors.warningBg,
                      paddingVertical: 4,
                      paddingHorizontal: 12,
                      borderRadius: 12,
                      alignSelf: "flex-start",
                    }}
                  >
                    <Ionicons name="hourglass-outline" size={16} color={colors.warning} />
                    <Text style={{ fontSize: fontSize.xs, fontWeight: "600", color: colors.warning }}>
                      Urikuri
                    </Text>
                  </View>
                </>
              )}

              {lesson.status === "new" && (
                <Button
                  title="Tangira Isomo"
                  onPress={() => router.push(`/lesson/${lesson.id}`)}
                  variant="primary"
                  style={{ marginTop: spacing.sm }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
