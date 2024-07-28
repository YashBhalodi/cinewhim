import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import _get from "lodash/get";

interface LoaderProps {
  componentKey:
    | "movie_feed"
    | "collection_movies"
    | "recommended_movies"
    | "movie_detail";
}
const Loader = (props: LoaderProps) => {
  return (
    <View style={[style.container, _get(style, [props.componentKey])]}>
      <ActivityIndicator />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  collection_movies: {
    flex: 1,
    maxHeight: 350,
  },
  recommended_movies: {
    flex: 1,
    maxHeight: 350,
  },
});

export default Loader;
