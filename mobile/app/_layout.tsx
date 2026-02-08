import { View } from "react-native";
import { Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BottomNav } from "@/components/BottomNav";

export default function RootLayout() {
  const segments = useSegments();
  const isInTabs = segments[0] === "(tabs)";
  const showBottomNav = !isInTabs;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
      {showBottomNav && <BottomNav />}
    </View>
  );
}
