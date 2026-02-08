import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { Button } from "@/components/ui/Button";
import { MOCK_PRACTICE_MATCH } from "@/data/mock";

const MATCH_BOX_COLOR = "#f5e6d3";

export default function PracticeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, paddingHorizontal: spacing.md, paddingTop: spacing.sm }}>Literacy Exercise</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <View style={{ width: 40 }} />
        <Text style={{ fontSize: fontSize.lg, fontWeight: "600", color: colors.foreground }}>Iyitoze</Text>
        <TouchableOpacity style={{ padding: spacing.sm }}>
          <Ionicons name="volume-high" size={22} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100, flexGrow: 1 }}
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

        {MOCK_PRACTICE_MATCH.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: spacing.lg,
            }}
          >
            <View
              style={{
                width: 88,
                height: 88,
                backgroundColor: colors.primaryMuted,
                borderRadius: borderRadius.md,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Ionicons name={item.icon as any} size={36} color={colors.primary} />
              <Text style={{ fontSize: fontSize.xs, color: colors.foreground, marginTop: spacing.xs }}>{item.image}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", paddingHorizontal: spacing.sm }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <View
                  key={i}
                  style={{
                    width: 6,
                    height: 2,
                    backgroundColor: colors.mutedForeground,
                    opacity: 0.5,
                    marginHorizontal: 2,
                  }}
                />
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: MATCH_BOX_COLOR,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                borderRadius: borderRadius.full,
                gap: spacing.xs,
                borderWidth: 1,
                borderColor: "#e5d5c3",
              }}
            >
              <Text style={{ fontSize: fontSize.base, color: colors.foreground }}>{item.word}</Text>
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            </View>
          </View>
        ))}

        <Button title="Ohereza" onPress={() => {}} style={{ marginTop: spacing.lg }} />
      </ScrollView>
    </SafeAreaView>
  );
}
