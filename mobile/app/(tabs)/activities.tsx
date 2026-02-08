import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { MOCK_ACTIVITIES } from "@/data/mock";

export default function ActivitiesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ padding: spacing.md }}>
        <Text style={{ fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground }}>
          Ibikorwa
        </Text>
        <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs }}>
          Reba inyandiko y'aho wanduye mu masomo
        </Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_ACTIVITIES.map((act) => (
          <TouchableOpacity
            key={act.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.card,
              borderRadius: borderRadius.md,
              padding: spacing.lg,
              marginBottom: spacing.sm,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: colors.primaryMuted,
                alignItems: "center",
                justifyContent: "center",
                marginRight: spacing.md,
              }}
            >
              <Ionicons name={act.icon} size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: fontSize.base, fontWeight: "600", color: colors.foreground }}>
                {act.title}
              </Text>
              <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 }}>
                {act.date} • {act.count} byakozwe
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
          </TouchableOpacity>
        ))}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: spacing.xl,
            backgroundColor: colors.muted,
            borderRadius: borderRadius.md,
            marginTop: spacing.md,
          }}
        >
          <Ionicons name="add-circle-outline" size={40} color={colors.primary} />
          <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm }}>
            Komeza kwiga kugira ngo ubone ibikorwa bishya
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
