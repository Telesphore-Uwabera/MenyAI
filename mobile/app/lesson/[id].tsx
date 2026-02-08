import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { Button } from "@/components/ui/Button";
import { getLessonsForLevel } from "@/data/mock";

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const allLessons = ["1", "2", "3"].flatMap((lvl) => getLessonsForLevel(lvl));
  const lesson = allLessons.find((l) => l.id === id) ?? allLessons[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
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
        <TouchableOpacity onPress={() => router.back()} style={{ padding: spacing.sm }}>
          <Ionicons name="arrow-back" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={{ fontSize: fontSize.lg, fontWeight: "600", color: colors.foreground }}>{lesson.title}</Text>
        <TouchableOpacity style={{ padding: spacing.sm }}>
          <Ionicons name="volume-high" size={22} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            height: 180,
            backgroundColor: colors.primaryMuted,
            borderRadius: borderRadius.lg,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: spacing.lg,
          }}
        >
          <Ionicons name={(lesson.icon ?? "leaf") as any} size={64} color={colors.primary} />
        </View>

        <Text style={{ fontSize: fontSize.base, color: colors.mutedForeground, marginBottom: spacing.lg }}>
          {lesson.subtitle}
        </Text>

        <View
          style={{
            backgroundColor: colors.muted,
            borderRadius: borderRadius.md,
            padding: spacing.lg,
            marginBottom: spacing.lg,
          }}
        >
          <Text style={{ fontSize: fontSize.sm, color: colors.foreground, lineHeight: 24 }}>
            Iyi ni isomo y'ibanze. Tangira ubu ugiye kwiga amagambo n'ishusho.
          </Text>
        </View>

        {lesson.status !== "locked" && (
          <Button
            title="Tangira Iyitoze"
            onPress={() => router.push("/(tabs)/practice")}
            icon={<Ionicons name="play" size={18} color={colors.primaryForeground} />}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
