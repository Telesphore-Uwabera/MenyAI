import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function RegisterScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

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
          Kwiyandikisha
        </Text>
        <Text style={{ fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: spacing.lg }}>
          Shyiramo amakuru ukeneye kugira ngo utangire kwiga
        </Text>

        <Input
          label="Amazina"
          placeholder="Urugero: Alice"
          value={name}
          onChangeText={setName}
          containerStyle={{ marginBottom: spacing.md }}
        />
        <Input
          label="Nimero ya telefoni"
          placeholder="+250 7xx xxx xxx"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          containerStyle={{ marginBottom: spacing.lg }}
        />

        <Text style={{ fontSize: fontSize.xs, color: colors.mutedForeground, marginBottom: spacing.md }}>
          Uzahabwa PIN nshya ku telefoni yawe nyuma yo kwiyandikisha.
        </Text>

        <Button
          title="Yandika"
          onPress={() => router.replace("/(tabs)")}
          style={{ marginBottom: spacing.md }}
        />

        <TouchableOpacity onPress={() => router.back()} style={{ alignItems: "center" }}>
          <Text style={{ fontSize: fontSize.sm, color: colors.primary }}>Ndi mwenemwo, injira</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
