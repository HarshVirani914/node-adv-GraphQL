const gql = require("graphql-tag");
const createTestServer = require("./helper");

const CREATE_POST = gql`
  mutation {
    createPost(input: { message: "hello" }) {
      message
    }
  }
`;

const UPDATE_SETTINGS = gql`
  mutation {
    updateSettings(input: { theme: DARK }) {
      theme
    }
  }
`;

describe("mutations", () => {
  test("createPost", async () => {
    const { mutate } = createTestServer({
      user: { id: 1 },
      models: {
        Post: {
          createOne: jest.fn(() => ({
            message: "hello",
          })),
        },
      },
    });

    const res = await mutate({ mutation: CREATE_POST });
    expect(res).toMatchSnapshot();
  });

  test("updateSettings", async () => {
    const { mutate } = createTestServer({
      user: { id: 1 },
      models: {
        Settings: {
          updateOne: jest.fn(() => ({
            theme: "DARK",
          })),
        },
      },
    });

    const res = await mutate({ mutation: UPDATE_SETTINGS });
    expect(res).toMatchSnapshot();
  });
});
