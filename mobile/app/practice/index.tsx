import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { Button } from "@/components/ui/Button";
import { MOCK_PRACTICE_MATCH } from "@/data/mock";

export default function PracticeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <TouchableOpacity onPress={() => router.back()} style={{ padding: spacing.sm }}>
          <Ionicons name="arrow-back" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={{ fontSize: fontSize.lg, fontWeight: "600", color: colors.foreground }}>
          Iyitoze
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
          <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground }}>English</Text>
          <TouchableOpacity>
            <Ionicons name="volume-high" size={24} color={colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl * 2, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: spacing.sm,
            backgroundColor: colors.primary,
            padding: spacing.md,
            borderRadius: borderRadius.md,
            marginBottom: spacing.lg,
          }}
        >
          <Ionicons name="volume-high" size={22} color={colors.primaryForeground} />
          <Text style={{ fontSize: fontSize.sm, color: colors.primaryForeground }}>
            Guhuza ijambo n'ishusho
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          {MOCK_PRACTICE_MATCH.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: spacing.lg,
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: colors.muted,
                  borderRadius: borderRadius.md,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: fontSize.xs, color: colors.foreground, textAlign: "center" }} numberOfLines={2}>
                  {item.image}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#f5e6d3",
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  borderRadius: borderRadius.md,
                  gap: spacing.xs,
                }}
              >
                <Text style={{ fontSize: fontSize.base, color: colors.foreground }}>{item.word}</Text>
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              </View>
            </View>
          ))}
        </View>

        <Button title="Ohereza" onPress={() => router.back()} style={{ marginTop: spacing.lg }} />
      </ScrollView>
    </SafeAreaView>
  );
}
