import * as React from "react";
import renderer from "react-test-renderer";

import ThemedIcon from "../ThemedIcon";
import ThemedText from "../ThemedText";
import GenreTag from "../GenreTag";

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
