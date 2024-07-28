import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useMovieDetailQuery } from "@/api/hooks";
import { Image, ImageBackground } from "expo-image";
import { getImageUrl } from "@/api/api";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieDetail = () => {
  const { movieId } = useLocalSearchParams();
  const { data, error, isLoading } = useMovieDetailQuery(movieId as string);

  if (isLoading || data === undefined) {
    return (
      <ThemedView>
        <ThemedText>loading</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView>
      <ImageBackground
        source={getImageUrl(data.backdrop_path)}
        imageStyle={{
          width: "100%",
          height: "100%",
          borderWidth: 1,
          borderColor: "white",
          position: "absolute",
          zIndex: -1,
          opacity: 0.25,
        }}
      >
        <ScrollView
          style={{ height: "100%", width: "100%" }}
          contentContainerStyle={{
            paddingVertical: 32,
            gap: 16,
            alignItems: "center",
          }}
        >
          <Image
            source={getImageUrl(data.poster_path)}
            style={{
              width: "80%",
              aspectRatio: 1 / 1.5,
              borderWidth: 1,
              alignSelf: "center",
              borderRadius: 8,
            }}
          />
          <ThemedText>{data.title}</ThemedText>
          <ThemedText>{data.tagline}</ThemedText>
          <ThemedText>{data.overview}</ThemedText>
          <ThemedText>{data.runtime}</ThemedText>
          <ThemedText>{data.belongs_to_collection?.name}</ThemedText>
          <ThemedText>{data.status}</ThemedText>
          <ThemedText>{data.release_date}</ThemedText>
          <ThemedText>
            {data.genres.map((g) => (
              <ThemedText>{g.name}</ThemedText>
            ))}
          </ThemedText>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MovieDetail;
