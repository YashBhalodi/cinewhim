import { getImageUrl } from "@/api/api";
import {
  useCollectionDetailsQuery,
  useMovieDetailQuery,
  useRecommendationFeedQuery,
} from "@/api/hooks";
import { Collection, Genre } from "@/api/model";
import ErrorScreen from "@/components/ErrorScreen";
import GenreTag from "@/components/GenreTag";
import IconButton from "@/components/IconButton";
import Loader from "@/components/Loader";
import MovieCardFeed from "@/components/MovieCardFeed";
import RatingView from "@/components/RatingView";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getReleaseDateText, getRuntimeText } from "@/utils/formattingUtils";
import { Image, ImageBackground } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PosterImage = (props: { posterImage: string }) => {
  const opacity = useSharedValue<number>(0);
  const scale = useSharedValue<number>(0.9);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: withTiming(scale.value, { duration: 500 }) }],
      opacity: withTiming(opacity.value),
    }),
    []
  );

  const onImageLoadEnd = useCallback(() => {
    opacity.value = 1;
    scale.value = 1;
  }, []);

  return (
    <Animated.View style={[animatedStyle, styles.posterImageShadow]}>
      <Image
        source={{ uri: getImageUrl(props.posterImage) }}
        style={styles.posterImage}
        onLoadEnd={onImageLoadEnd}
      />
    </Animated.View>
  );
};

const MovieGenres = (props: { geners: Genre[] }) => {
  return (
    <View
      style={{
        gap: 4,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {props.geners.map((g) => (
        <GenreTag genre={g} key={g.id} />
      ))}
    </View>
  );
};

const CollectionPartsFeed = (props: { collection: Collection }) => {
  const { collection } = props;
  const { data, isLoading, error } = useCollectionDetailsQuery(collection.id);

  return (
    <View style={styles.sectionContainer}>
      <ThemedText type="heading3" color="textSubtle">
        {collection.name}
      </ThemedText>
      {isLoading ? (
        <Loader componentKey="collection_movies" />
      ) : error || !data ? (
        <ErrorScreen componentKey="collection_movies" error={error} />
      ) : data ? (
        <MovieCardFeed
          movies={data?.parts}
          isLoadingMore={false}
          isHorizontal={true}
        />
      ) : null}
    </View>
  );
};

const RecommendationFeed = (props: { movieId: number }) => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useRecommendationFeedQuery(props.movieId);

  if (!isLoading && !isError && data?.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <ThemedText type="heading3" color="textSubtle">
        You may also like...
      </ThemedText>
      {isLoading ? (
        <Loader componentKey="recommended_movies" />
      ) : error || !data ? (
        <ErrorScreen componentKey="recommended_movies" error={error} />
      ) : data ? (
        <MovieCardFeed
          movies={data}
          isLoadingMore={isFetchingNextPage}
          isHorizontal={true}
          onLoadMore={() => {
            if (!isFetchingNextPage && hasNextPage) fetchNextPage();
          }}
        />
      ) : null}
    </View>
  );
};

const MovieDetail = () => {
  const { movieId } = useLocalSearchParams();
  const { data, error, isLoading } = useMovieDetailQuery(movieId as string);
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

  if (isLoading) {
    return <Loader componentKey="movie_detail" />;
  }

  if (error || !data) {
    return <ErrorScreen componentKey="movie_detail" error={error} />;
  }

  return (
    <ImageBackground
      source={getImageUrl(data.backdrop_path)}
      imageStyle={styles.backdropImage}
    >
      <View
        style={{
          position: "absolute",
          top: top,
          zIndex: 10,
          paddingHorizontal: 8,
          paddingVertical: 8,
          width: "100%",
        }}
      >
        <IconButton
          iconProps={{ name: "chevron-left", variant: "iconSubtle" }}
          onPress={navigation.goBack}
        />
      </View>
      <ScrollView
        style={styles.listStyle}
        contentContainerStyle={[
          styles.listContentContainer,
          { paddingTop: top + 48, paddingBottom: bottom + 48 },
        ]}
      >
        <PosterImage posterImage={data.poster_path} />
        <View style={styles.summaryCardsContainer}>
          <ThemedView style={styles.cardsContainer}>
            {data.vote_count > 0 ? (
              <View style={styles.cardContainer}>
                <RatingView
                  rating={data.vote_average}
                  voteCount={data.vote_count}
                  size="md"
                />
              </View>
            ) : null}
            {getReleaseDateText(data.release_date) ? (
              <View style={styles.cardContainer}>
                <ThemedIcon name="calendar" size="sm" variant="iconSubtle" />
                <ThemedText type="body2">
                  {getReleaseDateText(data.release_date)}
                </ThemedText>
              </View>
            ) : (
              <View style={styles.cardContainer}>
                <ThemedText type="body2">{data.status}</ThemedText>
              </View>
            )}
            <View style={styles.cardContainer}>
              <ThemedIcon name="clock-o" size="sm" variant="iconSubtle" />
              <ThemedText type="body2">
                {getRuntimeText(data.runtime)}
              </ThemedText>
            </View>
          </ThemedView>
          <MovieGenres geners={data.genres} />
        </View>
        <View style={styles.titleTagLineContainer}>
          <ThemedText type="heading2">{data.title}</ThemedText>
          {data.tagline ? (
            <ThemedText type="label2" color="textSubtle">
              {data.tagline}
            </ThemedText>
          ) : null}
        </View>
        <ThemedText type="body1">{data.overview}</ThemedText>

        {data.belongs_to_collection ? (
          <CollectionPartsFeed collection={data.belongs_to_collection} />
        ) : null}
        <RecommendationFeed movieId={data.id} />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: { height: "100%", width: "100%", position: "relative" },
  loaderContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backdropImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
    opacity: 0.15,
  },
  posterImage: {
    width: "80%",
    aspectRatio: 1 / 1.5,
    alignSelf: "center",
    borderRadius: 8,
  },
  posterImageShadow: {
    shadowColor: "white",
    shadowRadius: 40,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.3,
  },
  listStyle: { height: "100%", width: "100%" },
  listContentContainer: {
    paddingVertical: 32,
    gap: 16,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  titleTagLineContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  cardsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  summaryCardsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  sectionContainer: {
    alignSelf: "flex-start",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    minWidth: "100%",
  },
});

export default MovieDetail;
