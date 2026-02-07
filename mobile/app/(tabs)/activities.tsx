import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize } from "@/theme";

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
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: spacing.xl * 2,
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
            <Ionicons name="bar-chart" size={40} color={colors.primary} />
          </View>
          <Text style={{ fontSize: fontSize.lg, fontWeight: "600", color: colors.foreground, textAlign: "center" }}>
            Kuri ibi bikorwa, komeza kwiga!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
