/**
 * Loads each module to use it into the app
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

const merge = require('lodash/merge');
const logger = require('logger');

/** Load each module */
const modules = {
  Root: require('app/modules/root')
};

/**
 * Build the basic structure for an Apollo Server app
 * using the modules defined above
 *
 * @param {Object} modules
 */
const _makeModulesStructure = modules =>
  Object.keys(modules).reduce(
    (app, moduleName) => ({
      // If there's typeDefs add it
      typeDefs: [...app.typeDefs,
        ...(
          modules[moduleName].typeDefs
            ? [modules[moduleName].typeDefs]
            : []
        )
      ],
      // If there's resolvers add it
      resolvers: merge(
        app.resolvers,
        modules[moduleName].resolvers
          ? modules[moduleName].resolvers
          : {}
      ),
      // If there's a model add it
      models: merge(
        app.models,
        (modules[moduleName].model
          ? { [moduleName]: modules[moduleName].model }
          : {}
        )
      )
    }),
    {
      typeDefs : [],
      resolvers: {},
      models   : {}
    }
  );

logger.trace('Modules loaded', modules);
const modulesStructure = _makeModulesStructure(modules);

module.exports = {
  modules: modulesStructure
};
