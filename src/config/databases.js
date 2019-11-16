/**
 * Connection urls
 *  @author Victor Huerta <vhuertahnz@gmail.com>
 */
module.exports = {
  mongo: {
    connectionUrl: process.env.MONGODB_URI || 'mongodb://localhost'
  },
  redis: {
    connectionUrl: process.env.REDISDB_URI || 'redis://localhost'
  }
}; 