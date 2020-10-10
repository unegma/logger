const ErrorHandler  = require('./lib/ErrorHandler');
const SlackErrorHandler  = require('./lib/SlackErrorHandler');
const ErrorWithErrorHandlerError = require('./lib/errors');

module.exports = {
  ErrorWithErrorHandlerError,
  ErrorHandler,
  SlackErrorHandler
}
