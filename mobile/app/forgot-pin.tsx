import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize } from "@/theme";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function ForgotPinScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
          <Ionicons name="arrow-back" size={24} color={colors.foreground} />
        </TouchableOpacity>

        <Text style={{ fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground, marginBottom: spacing.xs }}>
          Wibagiwe PIN?
        </Text>
        <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: spacing.lg }}>
          Shyiramo nimero ya telefoni kugira ngo dutume PIN nshya
        </Text>

        <Input
          label="Nimero ya telefoni"
          placeholder="+250 7xx xxx xxx"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          containerStyle={{ marginBottom: spacing.lg }}
        />

        <Button
          title="Ohereza"
          onPress={() => router.back()}
          style={{ marginBottom: spacing.md }}
        />

        <TouchableOpacity onPress={() => router.back()} style={{ alignItems: "center" }}>
          <Text style={{ fontSize: fontSize.sm, color: colors.primary }}>Subiza kuri login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
