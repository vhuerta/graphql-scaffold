/**
 * Generate each database connection
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

const mongoose = require('mongoose');
const redis = require('redis');

const config = require('config').databases;

const models = {};
let connection = null;
let client = null;

/**
 * Generates a redis connection
 */
async function connectRedis() {
  // TODO: handle connection loose
  if (client === null) {
    client = redis.createClient(config.redis.connectionUrl);
  }
  return client;
}

/**
 * Connect to mongo and retur the connection object among model objects
 * @param {[mongoose.Schema]} schemas models schemas
 * @param {String} url connection url
 */
async function connectMongo(
  schemas = {},
  url = config.mongo.connectionUrl
) {
  if (connection === null) {
    // TODO: handle connection loose
    mongoose.set('debug', true);
    connection = await mongoose.createConnection(url, {
      useNewUrlParser   : true,
      useUnifiedTopology: true
    });

    // Load all models dynamically from the models object
    const modelNames = Object.keys(schemas);
    modelNames.forEach(
      modelName =>
        (models[modelName] = connection.model(modelName, schemas[modelName]))
    );
  }

  return { connection, models };
}

module.exports = { connectRedis, connectMongo };
