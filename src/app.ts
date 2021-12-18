import { ApolloServer } from "apollo-server";
import { loadEnvironmentVariables } from "./utils";
import { generateResolvers, Typedefs } from "./graphql";
import { MongoDBService } from "./services";

const init = async () => {
  loadEnvironmentVariables();
  await MongoDBService.connect();

  const apolloServer = new ApolloServer({
    typeDefs: Typedefs,
    resolvers: await generateResolvers(),
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
