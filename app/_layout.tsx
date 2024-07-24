import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Link, Stack } from "expo-router";

export { ErrorBoundary } from "expo-router";

import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { Pressable, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
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
                    <FontAwesome size={24} name="cog" />
                  </Pressable>
                </Link>
              );
            },
            headerLeft: (props) => {
              return (
                <Link href={"favourite"} asChild push>
                  <Pressable>
                    <FontAwesome size={24} name="heart" />
                  </Pressable>
                </Link>
              );
            },
            headerSearchBarOptions: {
              onChangeText: console.log,
            },
          }}
        />
        <Stack.Screen name="about" options={{ title: "About" }} />
        <Stack.Screen name="favourite" options={{ title: "Favourite" }} />
      </Stack>
    </QueryClientProvider>
  );
}
