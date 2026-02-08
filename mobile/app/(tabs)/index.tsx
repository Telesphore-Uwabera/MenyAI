import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { MOCK_USER, MOCK_PROGRESS } from "@/data/mock";

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
        {/* Top Bar - Greeting + Profile icon */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: spacing.lg,
            paddingBottom: spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          <View>
            <Text style={{ fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground }}>
              Muraho, {userName}!
            </Text>
            <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 }}>
              Komeza kwiga neza
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/account")}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: colors.accentOrange,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>A</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Lesson Card - Primary green gradient */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/lessons")}
          style={{
            backgroundColor: colors.primary,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.md,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm }}>
            <Ionicons name="locate" size={20} color="#fff" />
            <Text style={{ fontSize: fontSize.lg, fontWeight: "700", color: "#fff" }}>
              Isomo Ryawe Rya None
            </Text>
          </View>
          <Text style={{ fontSize: fontSize.sm, color: "rgba(255,255,255,0.95)", marginBottom: spacing.md, lineHeight: 22 }}>
            Kwiga gusoma amagambo yibanze mu Kinyarwanda
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/lessons")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.sm,
              backgroundColor: "#fff",
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.lg,
              borderRadius: borderRadius.md,
              alignSelf: "flex-start",
            }}
          >
            <Ionicons name="play" size={18} color={colors.primary} />
            <Text style={{ fontSize: fontSize.sm, fontWeight: "600", color: colors.primary }}>
              Tangira Isomo
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Stats Grid */}
        <View style={{ flexDirection: "row", gap: spacing.md, marginBottom: spacing.lg }}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.card,
              borderRadius: borderRadius.md,
              padding: spacing.md,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: fontSize["3xl"], fontWeight: "800", color: colors.primary, marginBottom: 4 }}>
              {MOCK_PROGRESS.completedLessons}
            </Text>
            <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>Amasomo Yarangiye</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.card,
              borderRadius: borderRadius.md,
              padding: spacing.md,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: fontSize["3xl"], fontWeight: "800", color: colors.primary, marginBottom: 4 }}>
              {MOCK_PROGRESS.remainingLessons ?? MOCK_PROGRESS.totalLessons - MOCK_PROGRESS.completedLessons}
            </Text>
            <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>Amasomo Asigaye</Text>
          </View>
        </View>

        {/* Ibikorwa Byihuse - Quick Actions */}
        <Text style={{ fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground, marginBottom: spacing.md }}>
          Ibikorwa Byihuse
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/lessons")}
          style={{
            backgroundColor: colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.md,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm }}>
            <Ionicons name="book" size={20} color={colors.primary} />
            <Text style={{ fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground }}>Amasomo</Text>
          </View>
          <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, lineHeight: 22 }}>
            Reba amasomo yose akugenewe
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/progress")}
          style={{
            backgroundColor: colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.md,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm }}>
            <Ionicons name="stats-chart" size={20} color={colors.primary} />
            <Text style={{ fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground }}>Iterambere</Text>
          </View>
          <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, lineHeight: 22 }}>
            Reba uko witeze imbere
          </Text>
        </TouchableOpacity>

        {/* AI Assistant Button - Purple gradient */}
        <TouchableOpacity
          onPress={() => router.push("/ai-assistant")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: spacing.sm,
            backgroundColor: colors.aiPurpleStart,
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.lg,
            borderRadius: borderRadius.md,
            marginTop: spacing.sm,
          }}
        >
          <Ionicons name="chatbubble-ellipses" size={22} color="#fff" />
          <Text style={{ fontSize: fontSize.base, fontWeight: "600", color: "#fff" }}>
            Baza AI Umufasha
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
