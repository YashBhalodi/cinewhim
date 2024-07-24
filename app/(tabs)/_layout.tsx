import { ThemedIcon } from "@/components/ThemedIcon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "orange",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Now Playing",
          tabBarIcon: ({ focused }) => (
            <ThemedIcon
              size={"md"}
              name="home"
              variant={focused ? "iconCritical" : "iconDefault"}
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
              variant={focused ? "iconCritical" : "iconDefault"}
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
              variant={focused ? "iconCritical" : "iconDefault"}
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
              variant={focused ? "iconCritical" : "iconDefault"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
