import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize } from "@/theme";
import { MOCK_PROGRESS } from "@/data/mock";

export default function ProgressScreen() {
  const percent = MOCK_PROGRESS.totalLessons
    ? Math.round((MOCK_PROGRESS.completedLessons / MOCK_PROGRESS.totalLessons) * 100)
    : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ padding: spacing.md }}>
        <Text style={{ fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground }}>
          Iterambere
        </Text>
        <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs }}>
          Reba iterambere ryawe
        </Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,
            padding: spacing.lg,
            marginBottom: spacing.md,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.sm }}>
            <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground }}>Amasomo byarangiwe</Text>
            <Text style={{ fontSize: fontSize.sm, fontWeight: "600", color: colors.primary }}>{percent}%</Text>
          </View>
          <View style={{ height: 8, backgroundColor: colors.muted, borderRadius: 4, overflow: "hidden" }}>
            <View
              style={{
                width: `${percent}%`,
                height: "100%",
                backgroundColor: colors.primary,
                borderRadius: 4,
              }}
            />
          </View>
          <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: spacing.xs }}>
            {MOCK_PROGRESS.completedLessons} / {MOCK_PROGRESS.totalLessons} amasomo
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: spacing.xl,
            backgroundColor: colors.muted,
            borderRadius: 12,
            marginHorizontal: spacing.md,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.primaryMuted,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: spacing.md,
            }}
          >
            <Ionicons name="flame" size={40} color={colors.primary} />
          </View>
          <Text style={{ fontSize: fontSize.lg, fontWeight: "600", color: colors.foreground }}>
            Umunsi {MOCK_PROGRESS.streakDays} – streak!
          </Text>
          <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm, textAlign: "center" }}>
            Komeza kwiga buri munsi kugira ngo ube streak
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
