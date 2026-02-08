import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("+250 7XX XXX XXX");
  const [pin, setPin] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header: Iterambere + MenyAI */}
        <View style={{ marginBottom: spacing.lg }}>
          <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: spacing.xs }}>
            Iterambere
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
              <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="book" size={16} color="#fff" />
              </View>
              <Text style={{ fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground }}>MenyAI</Text>
            </View>
          </View>
        </View>

        {/* Green info card with headphones icon on right */}
        <View
          style={{
            backgroundColor: colors.primary,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            marginBottom: spacing.lg,
            position: "relative",
          }}
        >
          <Text style={{ fontSize: fontSize.lg, fontWeight: "700", color: colors.primaryForeground, marginBottom: spacing.sm }}>
            Injira ubone iterambere ryawe
          </Text>
          <Text style={{ fontSize: fontSize.sm, color: "rgba(255,255,255,0.95)", marginBottom: spacing.lg, lineHeight: 22 }}>
            Kwiga, kumva amajwi, no gukurikirana amasomo yawe.
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.sm,
                backgroundColor: "rgba(255,255,255,0.2)",
                paddingVertical: spacing.sm,
                paddingHorizontal: spacing.md,
                borderRadius: borderRadius.md,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.5)",
              }}
            >
              <Ionicons name="play" size={18} color={colors.primaryForeground} />
              <Text style={{ fontSize: fontSize.sm, color: colors.primaryForeground }}>Tega amatwi amabwiriza</Text>
            </TouchableOpacity>
            <Ionicons name="headset" size={48} color="rgba(255,255,255,0.8)" />
          </View>
        </View>

        {/* Steps */}
        <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: spacing.sm }}>
          1. Shyiramo nimero ya telefoni
        </Text>
        <Input
          label="Telefoni"
          placeholder="Urugero: 07xx xxx xxx"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          rightIcon={<Ionicons name="volume-high" size={20} color={colors.mutedForeground} />}
          containerStyle={{ marginBottom: spacing.lg }}
        />

        <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: spacing.sm }}>
          2. Injiza PIN cyangwa ijambo banga
        </Text>
        <Input
          label="PIN"
          placeholder="Imibare 4"
          value={pin}
          onChangeText={setPin}
          secureTextEntry
          keyboardType="number-pad"
          maxLength={4}
          rightIcon={<Ionicons name="volume-high" size={20} color={colors.mutedForeground} />}
          containerStyle={{ marginBottom: spacing.lg }}
        />

        <Button
          title="Injira"
          onPress={() => router.replace("/(tabs)")}
          icon={<Ionicons name="chevron-forward" size={20} color={colors.primaryForeground} />}
          style={{ marginBottom: spacing.md }}
        />

        <TouchableOpacity
          onPress={() => router.push("/register")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: spacing.sm,
            paddingVertical: spacing.md,
            backgroundColor: colors.muted,
            borderRadius: borderRadius.md,
            marginBottom: spacing.md,
          }}
        >
          <Ionicons name="person-add" size={20} color={colors.foreground} />
          <Text style={{ fontSize: fontSize.sm, color: colors.foreground }}>Ndumva nshya, tangira kwiyandikisha</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TouchableOpacity onPress={() => router.push("/forgot-pin")}>
            <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>Wibagiwe PIN?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/forgot-pin")}>
            <Text style={{ fontSize: fontSize.xs, color: colors.primary, fontWeight: "500" }}>Saba indi PIN</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
