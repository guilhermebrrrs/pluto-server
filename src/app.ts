import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { loadEnvironmentVariables } from "./utils";
import { MainService } from "./services";
import { resolvers } from "graphql";

const init = async () => {
  loadEnvironmentVariables();
  MainService.initMainService();

  const schema = await buildSchema({ resolvers: resolvers, validate: false });
  const apolloServer = new ApolloServer({
    schema: schema,
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
