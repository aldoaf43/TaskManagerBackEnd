import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { expressMiddleware } from "@as-integrations/express5";
import { dbConnection } from "./src/hooks/database";

async function startServer() {
  const db = await dbConnection();
  // const dbCollection = new TaskManager(db);
  const app = express();
  const httpServer = http.createServer(app);

  // const server = new ApolloServer<AppContext>({
  //     typeDefs,
  //     resolvers,
  //     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // });

  // await server.start();

  const corsDef = cors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  // const middleware = expressMiddleware(server, {
  //     context: async ({req,res}): Promise <AppContext> => {
  //         return {
  //             db: database,
  //             res,
  //             token: req.headers.token as string | undefined,
  //         }
  //     }
  // })

  app.use(
    "/",
    corsDef,
    express.json({ limit: "50mb" }),
    // middleware,
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );

  console.log(`🚀 Server ready at http://localhost:4000/`);
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
