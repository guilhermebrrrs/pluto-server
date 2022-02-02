import { ApolloServer } from "apollo-server";
import { resolvers, Typedefs } from "./graphql";
import { MongoDBService } from "./services";
import { loadEnvironmentVariables } from "./utils";

const init = async () => {
  loadEnvironmentVariables();
  await MongoDBService.connect();

  const apolloServer = new ApolloServer({
    resolvers: resolvers,
    typeDefs: Typedefs,
  });

  apolloServer
    .listen({ port: process.env.PORT })
    .then(({ url }) => console.log(`Server is running at ${url}`));
};

(async () => {
  try {
    await init();
  } catch (err: any) {
    if (err instanceof Error) {
      const error = err as Error;

      console.error(error.message, error.stack);
    } else {
      console.log("Unknown error!");
    }
  }
})();
