/**
 * Generates the context for apollo app
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
const { connectMongo, connectRedis } = require('app/connections');

/**
 * Generates the context callback for the app,
 * it's called each time that server gets a valid request
 *
 * @param {*} models
 */
const createContext = mongooseModels => async ({ req }) => {
  const [redis, mongo] = await Promise.all([
    connectRedis(),
    connectMongo(mongooseModels)
  ]);
  const { connection, models } = mongo;
  return {
    redis,
    mongo: connection,
    models,
    user : req.user
  };
};

module.exports = { createContext };
