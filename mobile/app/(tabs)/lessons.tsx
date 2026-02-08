import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";

const FILTERS = [
  { id: "all", label: "Yose", icon: "apps" },
  { id: "reading", label: "Gusoma", icon: "book" },
  { id: "writing", label: "Kwandika", icon: "pencil" },
];

const LESSON_CARDS = [
  {
    id: "1",
    title: "Gusoma: Icyiciro 1",
    subtitle: "Inyuguti n'amagambo y'ibanze",
    progress: 40,
    lessonCount: "2/5",
    status: "completed" as const,
    icon: "book" as const,
  },
  {
    id: "2",
    title: "Kwandika: Icyiciro 1",
    subtitle: "Kwiga gutera intambwe",
    status: "download" as const,
    icon: "create" as const,
  },
];

export default function LessonsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm }}>
        <Text style={{ fontSize: fontSize.sm, color: colors.primary, marginBottom: 2 }}>Amasomo Yose</Text>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground }}>
            Amasomo Yose
          </Text>
          <TouchableOpacity style={{ padding: spacing.sm }}>
            <Ionicons name="volume-high" size={22} color={colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter bar */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: spacing.lg }}>
          <Ionicons name="filter" size={18} color={colors.foreground} />
          <Text style={{ fontSize: fontSize.sm, color: colors.foreground, marginLeft: spacing.sm }}>
            Hitamo Icyiciro
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: spacing.sm, marginBottom: spacing.lg }}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.id}
              onPress={() => setActiveFilter(f.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.xs,
                paddingVertical: spacing.sm,
                paddingHorizontal: spacing.md,
                borderRadius: borderRadius.full,
                backgroundColor: activeFilter === f.id ? colors.primary : colors.muted,
              }}
            >
              <Ionicons
                name={f.icon as "apps" | "book" | "pencil"}
                size={16}
                color={activeFilter === f.id ? colors.primaryForeground : colors.foreground}
              />
              <Text
                style={{
                  fontSize: fontSize.sm,
                  color: activeFilter === f.id ? colors.primaryForeground : colors.foreground,
                  fontWeight: activeFilter === f.id ? "600" : "400",
                }}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lesson cards */}
        {LESSON_CARDS.map((card) => (
          <View
            key={card.id}
            style={{
              backgroundColor: colors.card,
              borderRadius: borderRadius.lg,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: spacing.md,
              overflow: "hidden",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 120,
                  height: 120,
                  backgroundColor: colors.primaryMuted,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name={card.icon} size={40} color={colors.primary} />
                {card.status === "completed" && (
                  <View
                    style={{
                      position: "absolute",
                      top: spacing.sm,
                      right: spacing.sm,
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: colors.primaryMuted,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                  </View>
                )}
              </View>
              <View style={{ flex: 1, padding: spacing.md, justifyContent: "space-between" }}>
                <View>
                  <Text style={{ fontSize: fontSize.base, fontWeight: "700", color: colors.foreground }}>
                    {card.title}
                  </Text>
                  <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 }}>
                    {card.subtitle}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.sm }}>
                  {card.progress != null ? (
                    <>
                      <View style={{ flex: 1, height: 6, backgroundColor: colors.muted, borderRadius: 3, marginRight: spacing.sm, overflow: "hidden" }}>
                        <View style={{ width: `${card.progress}%`, height: "100%", backgroundColor: colors.primary, borderRadius: 3 }} />
                      </View>
                      <Text style={{ fontSize: fontSize.xs, color: colors.primary, fontWeight: "600" }}>{card.progress}% Byarangiye</Text>
                      <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, marginLeft: spacing.sm }}>Isomo {card.lessonCount}</Text>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity style={{ padding: 0 }}>
                        <Ionicons name="volume-high" size={20} color="#eab308" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => router.push(`/(tabs)/learn/${card.id}`)}
                        style={{
                          backgroundColor: colors.muted,
                          paddingVertical: spacing.xs,
                          paddingHorizontal: spacing.md,
                          borderRadius: borderRadius.sm,
                        }}
                      >
                        <Text style={{ fontSize: fontSize.xs, fontWeight: "600", color: colors.foreground }}>Tangira Isomo</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
