/**
 * Helpers for the app
 * 
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

// Third-party dependencies
const { ApolloError } = require('apollo-server-express');
const jschemator = require('jschemator');


// Validate a payload against the schema
function validateRequestInput(schema, payload) {
  const validator = jschemator(schema, 'en', {
    flat : true,
    $data: true
  });

  if (!validator.validate(payload)) {
    // Validation failed
    const errors = { fields: validator.paths, detail: validator.errors };
    throw new ApolloError('error.verify_data', 'ERROR_VERIFY_DATA', errors);
  }
}

module.exports = { validateRequestInput };
