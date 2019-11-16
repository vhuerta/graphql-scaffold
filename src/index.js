/**
 * Entry file
 *
 *  @author Victor Huerta <vhuertahnz@gmail.com>
 */

/** Register graphql imports */
require('graphql-import-node/register');

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');

const logger = require('logger');
const app = require('app');
const config = require('config').webserver;

// Apollo and express server
const server = new ApolloServer(app);
const expressApp = express();

// Configure middlewares
expressApp.use(cors());
// Apply express middlewares to apollo
server.applyMiddleware({ app: expressApp, path: '/graphql' });
// Start the application
expressApp.listen({ port: config.port }, () =>
  logger.info(
    `🚀 Server running at http://localhost:${config.port}${server.graphqlPath}`
  )
);
