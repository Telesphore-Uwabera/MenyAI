import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { MOCK_LESSONS, MOCK_LEVELS } from "@/data/mock";

export default function LessonsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground }}>
            Amasomo
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground }}>Kinyarwanda</Text>
            <TouchableOpacity>
              <Ionicons name="volume-high" size={24} color={colors.foreground} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: fontSize.lg, fontWeight: "600", color: colors.foreground, marginBottom: spacing.md }}>
          Hitamo Icyiciro
        </Text>

        {MOCK_LESSONS.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            onPress={() => router.push(`/learn/${lesson.id}`)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
              padding: spacing.md,
              marginBottom: spacing.sm,
            }}
          >
            <View
              style={{
                width: 72,
                height: 72,
                backgroundColor: colors.primaryMuted,
                borderRadius: borderRadius.md,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 32 }}>{lesson.emoji}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={{ fontSize: fontSize.base, fontWeight: "600", color: colors.foreground }}>
                {lesson.title}
              </Text>
              <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 }}>
                Urwego rwacu: {lesson.levelLabel ?? "Ikirenga 1"}
              </Text>
            </View>
            {lesson.completed ? (
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            ) : lesson.hasDownload ? (
              <TouchableOpacity>
                <Ionicons name="download-outline" size={24} color={colors.foreground} />
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
        ))}

        <View style={{ borderTopWidth: 1, borderColor: colors.border, marginVertical: spacing.lg }} />

        <Text style={{ fontSize: fontSize.lg, fontWeight: "600", color: colors.foreground, marginBottom: spacing.md }}>
          Hitamo Icyiciro
        </Text>
        {MOCK_LEVELS.map((level) => (
          <TouchableOpacity
            key={level.id}
            onPress={() => router.push(`/learn/${level.id}`)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: colors.primaryMuted,
              borderWidth: 1,
              borderColor: colors.primary + "40",
              borderRadius: borderRadius.md,
              padding: spacing.md,
              marginBottom: spacing.sm,
            }}
          >
            <View>
              <Text style={{ fontWeight: "600", color: colors.foreground }}>{level.label}</Text>
              <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>{level.lessonCount} amasomo</Text>
            </View>
            <Text style={{ fontSize: 24 }}>📚</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
