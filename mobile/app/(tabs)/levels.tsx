import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { MOCK_LESSONS, MOCK_LEVELS } from "@/data/mock";

export default function LevelsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm }}>
        <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: 2 }}>Hitamo icyiciro</Text>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground }}>Amasomo</Text>
          <TouchableOpacity style={{ padding: spacing.sm }}>
            <Ionicons name="volume-high" size={22} color={colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: fontSize.lg, fontWeight: "600", color: colors.foreground, marginBottom: spacing.md }}>
          Hitamo Icyiciro
        </Text>

        {MOCK_LESSONS.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            onPress={() => router.push(`/(tabs)/learn/${lesson.id}`)}
            style={{
              backgroundColor: colors.card,
              borderRadius: borderRadius.lg,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.md,
              overflow: "hidden",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", padding: spacing.md }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#eab30840",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="book" size={20} color="#b45309" />
              </View>
              <Text style={{ fontSize: fontSize.base, fontWeight: "600", color: colors.foreground, marginLeft: spacing.md }}>
                {lesson.title}
              </Text>
            </View>
            <View
              style={{
                height: 160,
                backgroundColor: colors.primaryMuted,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name={lesson.icon} size={48} color={colors.primary} />
              {lesson.completed && (
                <View
                  style={{
                    position: "absolute",
                    top: spacing.sm,
                    right: spacing.sm,
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ borderTopWidth: 1, borderColor: colors.border, marginVertical: spacing.lg }} />

        <Text style={{ fontSize: fontSize.lg, fontWeight: "600", color: colors.foreground, marginBottom: spacing.md }}>
          Hitamo Icyiciro
        </Text>
        {MOCK_LEVELS.map((level) => (
          <TouchableOpacity
            key={level.id}
            onPress={() => router.push(`/(tabs)/learn/${level.id}`)}
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
            <Ionicons name="school" size={28} color={colors.primary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
