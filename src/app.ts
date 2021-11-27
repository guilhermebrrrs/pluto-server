import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { loadEnvironmentVariables } from "./utils";
import { MainService } from "./services";

const init = async () => {
  loadEnvironmentVariables();
  MainService.initMainService();

  const apolloServer = new ApolloServer({
    typeDefs: Typedefs,
    resolvers: Resolvers,
    context: MainService.getMainService().getPrismaClient(),
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
