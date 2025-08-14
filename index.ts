import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';
import http from 'http';

import { resolvers, typeDefs } from '@/apollo';
import { TaskManager } from '@/models';

import { dbConnection } from './src/hooks/database';

export interface AppContext {
  db: TaskManager;
  res: unknown;
  token: string;
}

async function startServer() {
  const mongoose = await dbConnection();
  const db = new TaskManager(mongoose);
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<AppContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const corsDef = cors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const middleware = expressMiddleware(server, {
    context: async ({ req, res }): Promise<AppContext> => {
      return {
        db,
        res,
        token: req.headers.token as string,
      };
    },
  });

  app.use('/', corsDef, express.json({ limit: '50mb' }), middleware);

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000/`);
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
