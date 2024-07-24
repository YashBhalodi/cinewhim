import { ThemeProvider, DarkTheme } from "@react-navigation/native";

import { Stack } from "expo-router";

import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
