import { IconButton, ThemedIcon, ThemedText } from "@/components";
import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { Link, Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: Colors.dark.textDefault,
          tabBarActiveTintColor: Colors.dark.iconGreen,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Now Playing",
            tabBarIcon: ({ focused }) => (
              <ThemedIcon
                size={"md"}
                name="play"
                variant={focused ? "iconGreen" : "iconSubtle"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="popular"
          options={{
            title: "Popular",
            tabBarIcon: ({ focused }) => (
              <ThemedIcon
                size={"md"}
                name="diamond"
                variant={focused ? "iconGreen" : "iconSubtle"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="top_rated"
          options={{
            title: "Top Rated",
            tabBarIcon: ({ focused }) => (
              <ThemedIcon
                size={"md"}
                name="star"
                variant={focused ? "iconGreen" : "iconSubtle"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="upcoming"
          options={{
            title: "Upcoming",
            tabBarIcon: ({ focused }) => (
              <ThemedIcon
                size={"md"}
                name="line-chart"
                variant={focused ? "iconGreen" : "iconSubtle"}
              />
            ),
          }}
        />
      </Tabs>
      <BlurView
        style={[styles.headerContainer, { paddingTop: 16 + top }]}
        experimentalBlurMethod="dimezisBlurView"
        intensity={30}
      >
        <ThemedText type="heading3" color="textGreen">
          CineWhim
        </ThemedText>

        <Link href={"about"} asChild>
          <IconButton iconProps={{ name: "info" }} />
        </Link>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: "100%", width: "100%" },
  headerContainer: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    width: "100%",
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
});
