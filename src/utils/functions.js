/**
 * Utils to manage functions
 *
 *  @author Victor Huerta <vhuertahnz@gmail.com>
 */

/**
 * Partial apply arguments to a function
 */
module.exports.partial = func => (...args) => func.bind(null, ...args);
