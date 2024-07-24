import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Link, Stack } from "expo-router";

export { ErrorBoundary } from "expo-router";

import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { Pressable, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { ThemedIcon } from "@/components/ThemedIcon";

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
              headerShown: true,
              title: "",
              headerRight: (props) => {
                return (
                  <Link href={"about"} asChild push>
                    <Pressable>
                      <ThemedIcon size={"md"} name="cog" />
                    </Pressable>
                  </Link>
                );
              },
              headerLeft: (props) => {
                return (
                  <Link href={"favourite"} asChild push>
                    <Pressable>
                      <ThemedIcon size={"md"} name="heart" />
                    </Pressable>
                  </Link>
                );
              },
              headerSearchBarOptions: {
                onChangeText: console.log,
                textColor: "white",
                tintColor: "orange",
                hideNavigationBar: true,
              },
            }}
          />
          <Stack.Screen name="about" options={{ title: "About" }} />
          <Stack.Screen name="favourite" options={{ title: "Favourite" }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
