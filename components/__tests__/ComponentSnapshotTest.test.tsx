import * as React from "react";
import renderer from "react-test-renderer";

import ThemedIcon from "../ThemedIcon";
import ThemedText from "../ThemedText";
import GenreTag from "../GenreTag";
import IconButton from "../IconButton";
import MovieCard from "../MovieCard";
import RatingView from "../RatingView";

describe("ThemedIcon", () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<ThemedIcon name="home" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe("ThemedText", () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(<ThemedText>Snapshot test!</ThemedText>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe("GenreTag", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<GenreTag genre={{ id: 1, name: "Family" }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("IconButton", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<IconButton iconProps={{ name: "home" }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("MovieCard", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <MovieCard
          movie={{
            adult: false,
            backdrop_path: "/buawWBeKYjYfeiPoS2jIcjOrghZ.jpg",
            genre_ids: [27, 53],
            id: 1214509,
            original_language: "en",
            original_title: "In a Violent Nature",
            overview:
              "The enigmatic resurrection, rampage, and retribution of an undead monster in a remote wilderness unleashes an iconic new killer after a locket is removed from a collapsed fire tower that entombed its rotting corpse.",
            popularity: 463.811,
            poster_path: "/hPfWHgq07nXbeldwEGxWB4JqwtE.jpg",
            release_date: "2024-05-31",
            title: "In a Violent Nature",
            video: false,
            vote_average: 5.794,
            vote_count: 126,
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("RatingView", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<RatingView rating={5.794} voteCount={126} size="md" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
