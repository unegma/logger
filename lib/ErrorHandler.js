const moment = require('moment');
const ErrorWithErrorHandlerError = require('./errors').ErrorWithErrorHandlerError;

/**
 * Error Handler
 */
class ErrorHandler {

  /**
   * Constructor
   *
   * @param logType
   * @param logUrl
   */
  constructor(logType, logUrl) {
    this.logType = logType;
    this.logUrl = logUrl;
  }

  sayLogType() {
    return this.logType;
  }

  sayLogUrl() {
    return this.logUrl;
  }

  throwError(message) {
    throw new ErrorWithErrorHandlerError(message);
  }

}

module.exports = ErrorHandler;
