const resolvers = require("../src/resolvers");

describe("resolvers", () => {
  test("feed", async () => {
    const result = await resolvers.Query.feed(null, null, {
      models: {
        Post: {
          findMany: jest.fn(() => [{ message: "hello" }]),
        },
      },
    });
    expect(result).toMatchSnapshot();
  });

  test("posts", async () => {
    const result = await resolvers.Query.posts(null, null, {
      user: { id: 1 },
      models: {
        Post: {
          findMany: jest.fn(() => [{ message: "hello" }]),
        },
      },
    });
    expect(result).toMatchSnapshot();
  });
});
