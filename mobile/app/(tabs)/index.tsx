import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MOCK_USER } from "@/data/mock";

export default function HomeScreen() {
  const router = useRouter();
  const userName = MOCK_USER.name;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header: language + speaker */}
        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginBottom: spacing.sm }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground }}>Kinyarwanda / EN</Text>
            <TouchableOpacity>
              <Ionicons name="volume-high" size={24} color={colors.foreground} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting */}
        <View style={{ marginBottom: spacing.lg }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.xs }}>
            <Text style={{ fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground }}>
              Muraho, {userName}!
            </Text>
            <TouchableOpacity>
              <Ionicons name="volume-high" size={22} color={colors.foreground} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: fontSize.base, color: colors.mutedForeground }}>
            Ni he ushaka kwiga uyu munsi?
          </Text>
        </View>

        {/* Hero image placeholder */}
        <View
          style={{
            height: 200,
            backgroundColor: colors.primaryMuted,
            borderRadius: borderRadius.lg,
            marginBottom: spacing.md,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 48 }}>🌿</Text>
        </View>

        {/* Tags */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.md }}>
          <View style={{ backgroundColor: colors.primaryMuted, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full }}>
            <Text style={{ fontSize: fontSize.xs, color: colors.primary }}>Kinyarwanda</Text>
          </View>
          <View style={{ backgroundColor: colors.primaryMuted, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full }}>
            <Text style={{ fontSize: fontSize.xs, color: colors.primary }}>Intangiriro</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.primaryMuted, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full }}>
            <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
            <Text style={{ fontSize: fontSize.xs, color: colors.primary, marginLeft: 4 }}>Ubwisanzure</Text>
          </View>
        </View>

        {/* Offline banner */}
        <Card style={{ backgroundColor: colors.warningBg, borderColor: colors.warning, marginBottom: spacing.lg }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            <Ionicons name="cloud-done" size={24} color={colors.foreground} />
            <View>
              <Text style={{ fontWeight: "600", color: colors.foreground }}>Amasomo yose yamanuwe</Text>
              <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>Wiga udafite internet</Text>
            </View>
          </View>
        </Card>

        {/* CTA Buttons */}
        <Button
          title="Amasomo"
          onPress={() => router.push("/learn/1")}
          icon={<Ionicons name="chevron-forward" size={20} color={colors.primaryForeground} />}
          style={{ marginBottom: spacing.sm }}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: spacing.md,
            backgroundColor: colors.muted,
            borderRadius: borderRadius.md,
            gap: spacing.sm,
          }}
          onPress={() => router.push("/(tabs)/lessons")}
        >
          <Ionicons name="grid" size={20} color={colors.foreground} />
          <Text style={{ fontSize: fontSize.base, fontWeight: "500", color: colors.foreground }}>
            Amasomo yose
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
