import * as React from "react";
import renderer from "react-test-renderer";

import { ThemedIcon } from "../ThemedIcon";

describe("ThemedIcon", () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<ThemedIcon name="home" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
