import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg }}>
          <Text style={{ fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground }}>Kwiga Rwanda</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground }}>Kinyarwanda / EN</Text>
            <TouchableOpacity>
              <Ionicons name="volume-high" size={24} color={colors.foreground} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Info card */}
        <Card style={{ backgroundColor: colors.primary, borderColor: colors.primary, marginBottom: spacing.lg }}>
          <Text style={{ fontSize: fontSize.base, fontWeight: "600", color: colors.primaryForeground, marginBottom: spacing.xs }}>
            Injira ubone iterambere ryawe
          </Text>
          <Text style={{ fontSize: fontSize.sm, color: "rgba(255,255,255,0.9)", marginBottom: spacing.md }}>
            Kwiga, kumva amajwi, no gukurikirana amasomo yawe nubwo udafite interineti.
          </Text>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            <Ionicons name="play-circle" size={24} color={colors.primaryForeground} />
            <Text style={{ fontSize: fontSize.sm, color: colors.primaryForeground }}>Tega amatwi amabwiriza</Text>
          </TouchableOpacity>
        </Card>

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

        <TouchableOpacity style={{ paddingVertical: spacing.sm, marginBottom: spacing.sm }}>
          <Text style={{ fontSize: fontSize.sm, color: colors.primary, textAlign: "center" }}>
            Ndumva nshya, tangira kwiyandikisha
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "center", gap: spacing.lg }}>
          <TouchableOpacity>
            <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>Wibagiwe PIN?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground }}>Saba indi PIN</Text>
          </TouchableOpacity>
        </View>

        {/* Offline banner */}
        <View
          style={{
            marginTop: spacing.xl,
            padding: spacing.sm,
            backgroundColor: colors.warningBg,
            borderRadius: borderRadius.sm,
          }}
        >
          <Text style={{ fontSize: fontSize.xs, color: colors.foreground, textAlign: "center" }}>
            Amasomo ushobora kuyabika kuri telefoni yawe ugakomeza kwiga n'iyo interineti
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
