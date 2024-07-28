import { getRuntimeText, getReleaseDateText } from "../formattingUtils";

describe("getRuntimeText - Util", () => {
  it("60 minutes is 1h 0min", () => {
    const response = getRuntimeText(60);
    expect(response).toBe("1h 0min");
  });
  it("59 minutes is 59min", () => {
    const response = getRuntimeText(59);
    expect(response).toBe("59min");
  });
  it("0 minutes is 0min", () => {
    const response = getRuntimeText(0);
    expect(response).toBe("0min");
  });
  it("123 minutes is 2hr 3min", () => {
    const response = getRuntimeText(123);
    expect(response).toBe("2h 3min");
  });
  it("1234 minutes is 20hr 34min", () => {
    const response = getRuntimeText(1234);
    expect(response).toBe("20h 34min");
  });
});

describe("getReleaseDateText - Util", () => {
  it("empty string returns undefined", () => {
    const response = getReleaseDateText("");
    expect(response).toBe(undefined);
  });
  it("2017-04-01 means Apr 01, 2017", () => {
    const response = getReleaseDateText("2017-04-01");
    expect(response).toBe("Apr 1, 2017");
  });
  it("2017-12-12 means Dec 12, 2017", () => {
    const response = getReleaseDateText("2017-12-12");
    expect(response).toBe("Dec 12, 2017");
  });
});
