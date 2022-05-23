import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import http from "http";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    },
    bodyParserConfig: true,
  });
  await new Promise((resolve) => httpServer.listen({ port: 8000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`);
}

startApolloServer();
