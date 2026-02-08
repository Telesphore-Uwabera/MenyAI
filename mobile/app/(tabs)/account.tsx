import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize } from "@/theme";

export default function AccountScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: spacing.lg, marginBottom: spacing.md }}>
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: colors.primaryMuted,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="person" size={36} color={colors.primary} />
          </View>
        </View>
        <Text style={{ fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground }}>
          Konti
        </Text>
        <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs, textAlign: "center" }}>
          Menya ibyacu kuri inzira yacu
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/profile")}
          style={{
            marginTop: spacing.xl,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: spacing.lg,
            backgroundColor: colors.muted,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <Ionicons name="person" size={24} color={colors.primary} />
            <Text style={{ fontSize: fontSize.base, fontWeight: "600", color: colors.foreground }}>Guhindura amakuru</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/settings")}
          style={{
            marginTop: spacing.xl,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: spacing.lg,
            backgroundColor: colors.muted,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <Ionicons name="settings" size={24} color={colors.primary} />
            <Text style={{ fontSize: fontSize.base, fontWeight: "600", color: colors.foreground }}>Igenamiterere</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/login")}
          style={{ marginTop: spacing.xl, paddingVertical: spacing.sm }}
        >
          <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground }}>Gusohoka / Injira</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
