import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState("Umukoresha");
  const [phone, setPhone] = useState("+250 7XX XXX XXX");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
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
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: spacing.md }}>
          <Ionicons name="arrow-back" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={{ fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground }}>
          Guhindura amakuru
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: spacing.xl,
          }}
        >
          <View
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              backgroundColor: colors.primaryMuted,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: spacing.md,
            }}
          >
            <Ionicons name="person" size={44} color={colors.primary} />
          </View>
          <TouchableOpacity>
            <Text style={{ fontSize: fontSize.sm, color: colors.primary, fontWeight: "600" }}>
              Hindura ifoto
            </Text>
          </TouchableOpacity>
        </View>

        <Input
          label="Amazina"
          value={name}
          onChangeText={setName}
          placeholder="Andika amazina yawe"
          autoCapitalize="words"
        />

        <View style={{ marginTop: spacing.md }}>
          <Input
            label="Telefoni"
            value={phone}
            onChangeText={setPhone}
            placeholder="+250 7XX XXX XXX"
            keyboardType="phone-pad"
          />
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <Button
            title="Bika amakuru"
            onPress={() => router.back()}
            icon={<Ionicons name="checkmark" size={18} color={colors.primaryForeground} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
