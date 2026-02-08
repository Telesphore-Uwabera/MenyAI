import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { MOCK_LESSON_QUIZ, MOCK_LESSON_LIST } from "@/data/mock";
import { Button } from "@/components/ui/Button";

export default function ActiveLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const lesson = MOCK_LESSON_LIST.find((l) => l.id === id) ?? MOCK_LESSON_LIST[0];
  const quiz = MOCK_LESSON_QUIZ;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      {/* Top Bar - Back + Title + Progress */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: spacing.md, padding: spacing.sm }}>
          <Ionicons name="arrow-back" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground }}>
            {lesson.title}
          </Text>
          <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground }}>Igice 3/8</Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress bar */}
        <View style={{ height: 6, backgroundColor: colors.muted, borderRadius: 3, marginBottom: spacing.lg, overflow: "hidden" }}>
          <View
            style={{
              width: "37%",
              height: "100%",
              backgroundColor: colors.primary,
              borderRadius: 3,
            }}
          />
        </View>

        {/* Audio Player */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.accentYellow,
            padding: spacing.md,
            borderRadius: borderRadius.md,
            marginBottom: spacing.lg,
          }}
        >
          <TouchableOpacity
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
              marginRight: spacing.md,
            }}
          >
            <Ionicons name="play" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground }}>
              Umva ijwi ryerekana imibare
            </Text>
            <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>0:45 / 2:30</Text>
          </View>
        </View>

        {/* Visual content - Big 5 + Gatanu */}
        <View
          style={{
            backgroundColor: colors.accentYellow,
            minHeight: 200,
            borderRadius: borderRadius.lg,
            alignItems: "center",
            justifyContent: "center",
            padding: spacing.xl,
            marginBottom: spacing.lg,
          }}
        >
          <Text style={{ fontSize: 72, fontWeight: "800", color: colors.primaryDark }}>{quiz.visual.value}</Text>
          <Text style={{ fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground, marginTop: spacing.sm }}>
            {quiz.visual.label}
          </Text>
        </View>

        {/* Hitamo igisubizo cyiza */}
        <Text style={{ fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, marginBottom: spacing.md }}>
          {quiz.question}
        </Text>

        {quiz.options.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            onPress={() => setSelectedOption(opt.key)}
            style={{
              backgroundColor: colors.card,
              borderRadius: borderRadius.md,
              padding: spacing.lg,
              marginBottom: spacing.sm,
              borderWidth: 3,
              borderColor: selectedOption === opt.key ? colors.primary : "transparent",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: fontSize.base, fontWeight: "600", color: colors.foreground }}>
              {opt.key}. {opt.text}
            </Text>
          </TouchableOpacity>
        ))}

        {/* AI Help Button */}
        <TouchableOpacity
          onPress={() => router.push("/ai-assistant")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: spacing.sm,
            backgroundColor: colors.aiPurpleStart,
            paddingVertical: spacing.md,
            borderRadius: borderRadius.md,
            marginTop: spacing.lg,
          }}
        >
          <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
          <Text style={{ fontSize: fontSize.sm, fontWeight: "600", color: "#fff" }}>
            Baza AI Niba Ufite Ikibazo
          </Text>
        </TouchableOpacity>

        {/* Prev / Next buttons */}
        <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.lg }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.sm,
              paddingVertical: spacing.md,
              borderRadius: borderRadius.md,
              borderWidth: 2,
              borderColor: colors.primary,
            }}
          >
            <Ionicons name="arrow-back" size={18} color={colors.primary} />
            <Text style={{ fontSize: fontSize.base, fontWeight: "600", color: colors.primary }}>
              Ibanze
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.sm,
              paddingVertical: spacing.md,
              borderRadius: borderRadius.md,
              backgroundColor: colors.primary,
            }}
          >
            <Text style={{ fontSize: fontSize.base, fontWeight: "600", color: "#fff" }}>Komeza</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
