import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSize } from "@/theme";

const TABS = [
  { key: "index", route: "/(tabs)", label: "Amasomo", icon: "home" as const },
  { key: "progress", route: "/(tabs)/progress", label: "Iterambere", icon: "checkmark-done" as const },
  { key: "activities", route: "/(tabs)/activities", label: "Ibikorwa", icon: "checkbox" as const },
  { key: "practice", route: "/(tabs)/practice", label: "Iyitoze", icon: "bar-chart" as const },
  { key: "account", route: "/(tabs)/account", label: "Konti", icon: "person" as const },
] as const;

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === "/(tabs)") return pathname === "/(tabs)" || pathname === "/(tabs)/" || pathname.includes("/(tabs)/index");
    return pathname.includes(route);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 8,
        paddingBottom: 24,
        paddingHorizontal: 8,
        height: 64,
      }}
    >
      {TABS.map((tab) => {
        const active = isActive(tab.route);
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => router.push(tab.route as any)}
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Ionicons
              name={tab.icon}
              size={22}
              color={active ? colors.primary : colors.mutedForeground}
            />
            <Text
              style={{
                fontSize: 11,
                fontWeight: "500",
                color: active ? colors.primary : colors.mutedForeground,
                marginTop: 2,
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
