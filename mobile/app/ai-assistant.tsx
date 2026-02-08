import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { colors, spacing, fontSize, borderRadius } from "@/theme";

const MOCK_MESSAGES = [
  { id: "1", type: "ai", text: "Muraho! Ndi MenyAI, umufasha wawe. Ufite ikibazo cyangwa ukenera ubufasha kuri iki gisomo?" },
  { id: "2", type: "user", text: "Ntibinsobanukiwe neza itandukaniro riri hagati ya \"Gatanu\" na \"Gatandatu\"" },
  {
    id: "3",
    type: "ai",
    text: "Nzagusobanurira neza!\n\nGatanu = 5\nNi nk'iminwe itanu ku kiganza.\n\nGatandatu = 6\nNi nk'iminwe itanu ku kiganza + ukundi kumwe.\n\nReka tugerageze hamwe: Bara iminwe yawe itanu (Gatanu), hanyuma ongeraho ukundi kumwe (Gatandatu). Urabyumva?",
  },
  { id: "4", type: "user", text: "Yego! Murakoze cyane! Ubu ndasobanukiwe" },
  { id: "5", type: "ai", text: "Nta kibazo! Nishimiye kukubafasha. Wifuza gukomeza isomo cyangwa ufite ikindi kibazo?" },
];

export default function AIAssistantScreen() {
  const router = useRouter();
  const [input, setInput] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      {/* AI Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.md,
          borderBottomWidth: 2,
          borderBottomColor: colors.border,
          marginBottom: spacing.md,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.aiPurpleStart,
            alignItems: "center",
            justifyContent: "center",
            marginRight: spacing.md,
          }}
        >
          <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: fontSize.base, fontWeight: "700", color: colors.foreground }}>
            MenyAI Umufasha
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.success,
              }}
            />
            <Text style={{ fontSize: fontSize.xs, color: colors.success }}>Ndi hano kugufasha</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: spacing.sm }}>
          <Ionicons name="close" size={24} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Info card */}
        <View
          style={{
            backgroundColor: "#E3F2FD",
            padding: spacing.md,
            borderRadius: borderRadius.md,
            marginBottom: spacing.lg,
          }}
        >
          <Text style={{ fontSize: fontSize.sm, color: colors.foreground, lineHeight: 22 }}>
            Menya: Baza AI igihe cyose ufite ikibazo. Itanga ibisubizo mu Kinyarwanda!
          </Text>
        </View>

        {/* Chat messages */}
        {MOCK_MESSAGES.map((msg) => (
          <View
            key={msg.id}
            style={{
              alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
              maxWidth: "80%",
              marginBottom: spacing.md,
            }}
          >
            <View
              style={{
                paddingVertical: spacing.sm,
                paddingHorizontal: spacing.md,
                borderRadius: borderRadius.lg,
                backgroundColor: msg.type === "user" ? colors.primary : colors.muted,
                borderBottomRightRadius: msg.type === "user" ? 4 : borderRadius.lg,
                borderBottomLeftRadius: msg.type === "user" ? borderRadius.lg : 4,
              }}
            >
              <Text
                style={{
                  fontSize: fontSize.sm,
                  color: msg.type === "user" ? "#fff" : colors.foreground,
                  lineHeight: 22,
                }}
              >
                {msg.text}
              </Text>
            </View>
          </View>
        ))}

        {/* Quick action buttons */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md }}>
          <TouchableOpacity
            style={{
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.md,
              borderRadius: borderRadius.md,
              borderWidth: 2,
              borderColor: colors.primary,
            }}
          >
            <Text style={{ fontSize: fontSize.xs, fontWeight: "600", color: colors.primary }}>Sobanura neza</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.md,
              borderRadius: borderRadius.md,
              borderWidth: 2,
              borderColor: colors.primary,
            }}
          >
            <Text style={{ fontSize: fontSize.xs, fontWeight: "600", color: colors.primary }}>Mpa urugero</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.md,
              borderRadius: borderRadius.md,
              borderWidth: 2,
              borderColor: colors.primary,
            }}
          >
            <Text style={{ fontSize: fontSize.xs, fontWeight: "600", color: colors.primary }}>Komeza isomo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Chat input - fixed at bottom */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.sm,
          padding: spacing.md,
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}
      >
        <TextInput
          placeholder="Andika ikibazo cyawe hano..."
          placeholderTextColor={colors.mutedForeground}
          value={input}
          onChangeText={setInput}
          style={{
            flex: 1,
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.md,
            borderRadius: borderRadius.md,
            borderWidth: 2,
            borderColor: colors.border,
            fontSize: fontSize.sm,
            color: colors.foreground,
          }}
        />
        <TouchableOpacity
          style={{
            width: 44,
            height: 44,
            borderRadius: borderRadius.md,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
