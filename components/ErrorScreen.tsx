import * as Clipboard from "expo-clipboard";
import _get from "lodash/get";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "./IconButton";
import ThemedText from "./ThemedText";

interface ErrorScreenProps {
  componentKey:
    | "movie_feed"
    | "collection_movies"
    | "recommended_movies"
    | "movie_detail";
  error: Error | null;
}

const ErrorScreen = (props: ErrorScreenProps) => {
  const isVpnIssue = _get(props, "error.cause.status") === 401;
  const [copied, setCopied] = useState(false);

  const copyToClipBoard = async () => {
    if (props.error !== null) {
      const errorLog = JSON.stringify(
        {
          message: props.error.message,
          name: props.error.name,
          stack: props.error.stack,
          cause: props.error.cause,
        },
        null,
        2
      );
      await Clipboard.setStringAsync(errorLog);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 4000);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <ThemedText style={{ textAlign: "center" }}>
        {isVpnIssue
          ? "TMDB is not available in your region\nYou can use any free VPN to browse movies"
          : props.error?.message ?? "Something went wrong!"}
      </ThemedText>
      <Pressable onPress={copyToClipBoard} style={style.copyButton}>
        <ThemedText>{copied ? "Copied" : "Copy error details"}</ThemedText>
        <IconButton iconProps={{ name: copied ? "check" : "clipboard" }} />
      </Pressable>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: 8,
  },
  copyButton: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(256,256,256,0.1)",
  },
});

export default ErrorScreen;
