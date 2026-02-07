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
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl * 2, alignItems: "center" }}
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

        <View
          style={{
            marginTop: spacing.xl,
            padding: spacing.lg,
            backgroundColor: colors.muted,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border,
            width: "100%",
            maxWidth: 400,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: spacing.md, textAlign: "center" }}>
            Iyi page izaba irangira vuba!
          </Text>
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)")}
            style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}
          >
            <Text style={{ fontSize: fontSize.base, fontWeight: "600", color: colors.primary }}>
              Subiza Nyumba
            </Text>
            <Ionicons name="arrow-forward" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

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
