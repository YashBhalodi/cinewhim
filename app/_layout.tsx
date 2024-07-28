import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Link, Stack } from "expo-router";

export { ErrorBoundary } from "expo-router";

import { ThemedIcon } from "@/components/ThemedIcon";
import NetInfo from "@react-native-community/netinfo";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { onlineManager } from "@tanstack/react-query";
import { Pressable } from "react-native";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DarkTheme}>
        <Stack initialRouteName="(tabs)">
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="about" options={{ title: "About" }} />
          <Stack.Screen name="favourite" options={{ title: "Favourite" }} />
          <Stack.Screen name="movie" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
