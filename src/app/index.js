/**
 * Generates apollo app stucture
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

const { createContext } = require('app/context');
const { typeDefs, resolvers, models } = require('app/modules').modules;

const app = {
  typeDefs,
  resolvers,
  cors       : true,
  context    : createContext(models),
  formatError: error => {
    const { extensions, message } = error;
    if (process.env.NODE_ENV === 'production') { // Not show stacktrace on prod
      delete extensions.exception.stacktrace;
    }
    return { ...extensions.exception, message };
  }
};

module.exports = app;
