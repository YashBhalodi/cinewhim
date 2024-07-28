import { View, Text } from "react-native";
import React from "react";

interface ErrorScreenProps {
  componentKey:
    | "movie_feed"
    | "collection_movies"
    | "recommended_movies"
    | "movie_detail";
  error: Error | null;
}

const ErrorScreen = (props: ErrorScreenProps) => {
  return (
    <View>
      <Text>ErrorScreen</Text>
    </View>
  );
};

export default ErrorScreen;
