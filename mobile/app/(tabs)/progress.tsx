import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

type HistoryItem = {
  lessonId: string;
  score: number;
  passed: boolean;
  attempts: number;
  updatedAt: string;
};

export default function ProgressScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({ completedLessons: 0, totalLessons: 30, streakDays: 0, remainingLessons: 30 });
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [badge, setBadge] = useState<{ key: string; label: string; color: string } | null>(null);
  const [nextBadge, setNextBadge] = useState<{ label: string; needsTotal: number; remaining: number } | null>(null);

  useEffect(() => {
    const load = async () => {
      const [p, h] = await Promise.all([
        api.getProgress(null),
        api.getLessonHistory(null),
      ]);
      if (p) {
        setProgress({
          completedLessons: p.completedLessons,
          totalLessons: p.totalLessons,
          streakDays: p.streakDays,
          remainingLessons: p.remainingLessons ?? (p.totalLessons - p.completedLessons),
        });
        if (p.badge?.key !== "none") setBadge(p.badge ?? null);
        setNextBadge(p.nextBadge ?? null);
      }
      setHistory(h);
      setLoading(false);
    };
    load();
  }, []);

  const percent = progress.totalLessons
    ? Math.round((progress.completedLessons / progress.totalLessons) * 100)
    : 0;

  const nextPercent = nextBadge
    ? Math.round(((progress.completedLessons) / nextBadge.needsTotal) * 100)
    : 100;

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("rw-RW", { day: "numeric", month: "short" });
    } catch {
      return iso;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      {/* Header */}
      <View style={{ paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <Text style={{ fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground }}>Iterambere</Text>
        <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 }}>
          Reba uko witeze imbere
        </Text>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.mutedForeground, marginTop: spacing.md }}>Gutegura amakuru...</Text>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Quick Actions */}
          <View style={{ flexDirection: "row", gap: spacing.sm, marginBottom: spacing.md }}>
            <TouchableOpacity
              onPress={() => router.push("/review" as any)}
              style={{ flex: 1, backgroundColor: "#EEF2FF", borderRadius: borderRadius.md, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.sm }}
            >
              <Ionicons name="albums" size={22} color="#6366F1" />
              <View>
                <Text style={{ fontWeight: "700", color: "#6366F1", fontSize: fontSize.sm }}>Flashcards</Text>
                <Text style={{ fontSize: 10, color: "#8182C4" }}>Subiramo amagambo</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/report" as any)}
              style={{ flex: 1, backgroundColor: "#F0FDF4", borderRadius: borderRadius.md, padding: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.sm }}
            >
              <Ionicons name="ribbon" size={22} color={colors.primary} />
              <View>
                <Text style={{ fontWeight: "700", color: colors.primary, fontSize: fontSize.sm }}>Raporo</Text>
                <Text style={{ fontSize: 10, color: colors.mutedForeground }}>Raporo yanjye</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Badge Card */}
          {badge ? (
            <View style={{
              backgroundColor: badge.color,
              borderRadius: borderRadius.lg,
              padding: spacing.lg,
              marginBottom: spacing.md,
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.md,
              shadowColor: badge.color, shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.35, shadowRadius: 12, elevation: 6,
            }}>
              <Text style={{ fontSize: 48 }}>
                {badge.label.split(" ").pop()}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#fff", fontSize: fontSize.xs, fontWeight: "600", opacity: 0.85 }}>IMPAMYABUSHOBOZI YAWE</Text>
                <Text style={{ color: "#fff", fontSize: fontSize["2xl"], fontWeight: "800", marginTop: 2 }}>
                  {badge.label.split(" ").slice(0, -1).join(" ")}
                </Text>
                <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: fontSize.xs, marginTop: 4 }}>
                  Warangije amasomo {progress.completedLessons}. Komeza gutsinda!
                </Text>
              </View>
            </View>
          ) : (
            <View style={{
              backgroundColor: colors.card, borderRadius: borderRadius.lg,
              padding: spacing.lg, marginBottom: spacing.md,
              flexDirection: "row", alignItems: "center", gap: spacing.md,
              borderWidth: 2, borderColor: colors.border, borderStyle: "dashed",
            }}>
              <Text style={{ fontSize: 40 }}>🏅</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: fontSize.base, fontWeight: "700", color: colors.foreground }}>
                  Rangira isomo rya mbere!
                </Text>
                <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 }}>
                  Uzahabwa umudari wa Inzibacyuho 🥉 nyuma yo gutsinda isomo rimwe.
                </Text>
              </View>
            </View>
          )}

          {/* Next Badge Goal */}
          {nextBadge && (
            <View style={{
              backgroundColor: colors.card, borderRadius: borderRadius.lg,
              padding: spacing.md, marginBottom: spacing.md,
              shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.06, shadowRadius: 4, elevation: 1,
            }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.xs }}>
                <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground }}>
                  Umudari ukurikira: <Text style={{ fontWeight: "700", color: colors.foreground }}>{nextBadge.label}</Text>
                </Text>
                <Text style={{ fontSize: fontSize.sm, fontWeight: "700", color: colors.primary }}>
                  {nextBadge.remaining} asigaye
                </Text>
              </View>
              <View style={{ height: 6, backgroundColor: colors.muted, borderRadius: 3, overflow: "hidden" }}>
                <View style={{ width: `${Math.min(nextPercent, 100)}%`, height: "100%", backgroundColor: colors.primary, borderRadius: 3 }} />
              </View>
            </View>
          )}

          {/* Overall Progress Bar */}
          <View style={{
            backgroundColor: colors.card,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.md,
            shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08, shadowRadius: 8, elevation: 2,
          }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.sm }}>
              <Text style={{ fontSize: fontSize.base, fontWeight: "700", color: colors.foreground }}>Imburagihe</Text>
              <Text style={{ fontSize: fontSize.xl, fontWeight: "800", color: colors.primary }}>{percent}%</Text>
            </View>
            <View style={{ height: 10, backgroundColor: colors.muted, borderRadius: 5, overflow: "hidden", marginBottom: spacing.sm }}>
              <View style={{ width: `${percent}%`, height: "100%", backgroundColor: colors.primary, borderRadius: 5 }} />
            </View>
            <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>
              {progress.completedLessons} muri {progress.totalLessons} amasomo yarangiye
            </Text>
          </View>

          {/* Stats Grid */}
          <View style={{ flexDirection: "row", gap: spacing.md, marginBottom: spacing.md }}>
            {/* Completed */}
            <View style={{
              flex: 1, backgroundColor: colors.card, borderRadius: borderRadius.md,
              padding: spacing.md, alignItems: "center",
              shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
            }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primaryMuted, alignItems: "center", justifyContent: "center", marginBottom: spacing.xs }}>
                <Ionicons name="checkmark-done-circle" size={26} color={colors.primary} />
              </View>
              <Text style={{ fontSize: fontSize["2xl"], fontWeight: "800", color: colors.primary }}>{progress.completedLessons}</Text>
              <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, textAlign: "center", marginTop: 2 }}>Yarangiye</Text>
            </View>

            {/* Remaining */}
            <View style={{
              flex: 1, backgroundColor: colors.card, borderRadius: borderRadius.md,
              padding: spacing.md, alignItems: "center",
              shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
            }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#FFF3E0", alignItems: "center", justifyContent: "center", marginBottom: spacing.xs }}>
                <Ionicons name="time" size={26} color="#F59E0B" />
              </View>
              <Text style={{ fontSize: fontSize["2xl"], fontWeight: "800", color: "#F59E0B" }}>{progress.remainingLessons}</Text>
              <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, textAlign: "center", marginTop: 2 }}>Asigaye</Text>
            </View>

            {/* Streak */}
            <View style={{
              flex: 1, backgroundColor: colors.card, borderRadius: borderRadius.md,
              padding: spacing.md, alignItems: "center",
              shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
            }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#FFE4E1", alignItems: "center", justifyContent: "center", marginBottom: spacing.xs }}>
                <Ionicons name="flame" size={26} color="#EF4444" />
              </View>
              <Text style={{ fontSize: fontSize["2xl"], fontWeight: "800", color: "#EF4444" }}>{progress.streakDays}</Text>
              <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, textAlign: "center", marginTop: 2 }}>Iminsi</Text>
            </View>
          </View>

          {/* Lesson History */}
          <Text style={{ fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground, marginBottom: spacing.md }}>
            Amasomo Yarangiye
          </Text>

          {history.length === 0 ? (
            <View style={{
              backgroundColor: colors.card, borderRadius: borderRadius.lg,
              padding: spacing.xl, alignItems: "center",
              shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
            }}>
              <Ionicons name="school-outline" size={56} color={colors.mutedForeground} />
              <Text style={{ color: colors.mutedForeground, marginTop: spacing.md, fontSize: fontSize.base, fontWeight: "600", textAlign: "center" }}>
                Ntamasomo yarangiwe
              </Text>
              <Text style={{ color: colors.mutedForeground, marginTop: spacing.xs, fontSize: fontSize.sm, textAlign: "center" }}>
                Tangira isomo ukunde, iterambere ryawe rizagaragara hano.
              </Text>
            </View>
          ) : (
            history.map((item) => (
              <View
                key={item.lessonId}
                style={{
                  backgroundColor: colors.card,
                  borderRadius: borderRadius.lg,
                  padding: spacing.md,
                  marginBottom: spacing.sm,
                  flexDirection: "row",
                  alignItems: "center",
                  shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.06, shadowRadius: 4, elevation: 1,
                }}
              >
                {/* Pass/Fail Icon */}
                <View style={{
                  width: 48, height: 48, borderRadius: 24,
                  backgroundColor: item.passed ? colors.primaryMuted : "#FFE4E1",
                  alignItems: "center", justifyContent: "center", marginRight: spacing.md,
                }}>
                  <Ionicons
                    name={item.passed ? "checkmark-circle" : "close-circle"}
                    size={28}
                    color={item.passed ? colors.success : "#EF4444"}
                  />
                </View>

                {/* Lesson Info */}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: fontSize.sm, fontWeight: "600", color: colors.foreground }}>
                    Isomo #{item.lessonId.slice(0, 6)}
                  </Text>
                  <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 }}>
                    {item.attempts} {item.attempts === 1 ? "ugerageze" : "ibigerageza"} • {formatDate(item.updatedAt)}
                  </Text>
                </View>

                {/* Score Badge */}
                <View style={{
                  backgroundColor: item.passed ? colors.primaryMuted : "#FFE4E1",
                  paddingHorizontal: spacing.sm,
                  paddingVertical: 4,
                  borderRadius: borderRadius.full,
                }}>
                  <Text style={{
                    fontSize: fontSize.sm,
                    fontWeight: "700",
                    color: item.passed ? colors.primary : "#EF4444",
                  }}>
                    {item.score}%
                  </Text>
                </View>
              </View>
            ))
          )}

          {/* Encouragement banner */}
          {progress.completedLessons > 0 && (
            <View style={{
              backgroundColor: colors.primary,
              borderRadius: borderRadius.lg,
              padding: spacing.lg,
              marginTop: spacing.md,
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.md,
            }}>
              <Ionicons name="trophy" size={32} color="#fff" />
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: fontSize.base }}>
                  Komeza gutsinda!
                </Text>
                <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: fontSize.xs, marginTop: 2 }}>
                  Warangije amasomo {progress.completedLessons}. Tangira indi kugira ngo iterambere ryawe ryiyongere.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
