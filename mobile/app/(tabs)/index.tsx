import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { Button } from "@/components/ui/Button";
import { MOCK_USER } from "@/data/mock";

export default function HomeScreen() {
  const router = useRouter();
  const userName = MOCK_USER.name;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md }}>
          <Text style={{ fontSize: fontSize.sm, color: colors.primary }}>Kwiga Rwanda</Text>
          <TouchableOpacity style={{ padding: spacing.sm }}>
            <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primaryMuted, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="volume-high" size={20} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <View style={{ marginBottom: spacing.lg }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.xs }}>
            <Text style={{ fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground }}>
              Muraho, {userName}!
            </Text>
            <TouchableOpacity>
              <Ionicons name="volume-high" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: fontSize.base, color: colors.mutedForeground }}>
            Ni he ushaka kwiga uyu munsi?
          </Text>
        </View>

        {/* Hero illustration area - market scene */}
        <View
          style={{
            height: 220,
            backgroundColor: colors.primaryMuted,
            borderRadius: borderRadius.lg,
            marginBottom: spacing.md,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="leaf" size={64} color={colors.primary} />
          <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm }}>Isoko • Kwiga gusoma no kwandika</Text>
        </View>

        {/* Tags: Kinyarwanda (green + book), Intangiriro (gray + chart), Ubwisanzure (checkmark) */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.md }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.xs,
              backgroundColor: colors.primary,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderRadius: borderRadius.full,
            }}
          >
            <Ionicons name="book" size={14} color={colors.primaryForeground} />
            <Text style={{ fontSize: fontSize.xs, color: colors.primaryForeground }}>Kinyarwanda</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.xs,
              backgroundColor: colors.muted,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderRadius: borderRadius.full,
            }}
          >
            <Ionicons name="bar-chart" size={14} color={colors.foreground} />
            <Text style={{ fontSize: fontSize.xs, color: colors.foreground }}>Intangiriro</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.xs,
              backgroundColor: colors.primaryMuted,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderRadius: borderRadius.full,
            }}
          >
            <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
            <Text style={{ fontSize: fontSize.xs, color: colors.primary }}>Ubwisanzure</Text>
          </View>
        </View>

        {/* CTA Buttons */}
        <Button
          title="Amasomo"
          onPress={() => router.push("/(tabs)/levels")}
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
