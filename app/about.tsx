import { ExternalLink, IconButton, ThemedText } from "@/components";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function About() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, { top }]}>
        <IconButton
          iconProps={{ name: "chevron-left", variant: "iconSubtle" }}
          onPress={navigation.goBack}
        />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.centerContainer}>
          <ThemedText type="label1">Movie data from</ThemedText>
          <Image
            source={require("@/assets/images/tmdb.svg")}
            style={{ width: "50%", aspectRatio: 1 }}
            contentFit="contain"
          />
        </View>
        <View style={styles.centerContainer}>
          <ThemedText type="label1">
            Designed and Developed by{" "}
            <ExternalLink href="https://github.com/YashBhalodi/cinewhim">
              <ThemedText color="textGreen">Yash Bhalodi</ThemedText>
            </ExternalLink>
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  headerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: "100%",
    zIndex: 10,
  },
  bodyContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    gap: 32,
    flex: 1,
  },
  centerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
