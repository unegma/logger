const moment = require('moment');
const ErrorWithErrorHandlerError = require('./errors').ErrorWithErrorHandlerError;
const ERROR_FORMAT = '### *YYYY-MM-DD-ddd* *HH:mm:ss*';

/**
 * Error Handler
 */
class ErrorHandler {

  /**
   * Constructor
   *
   * @param logType
   * @param logUrl
   * @param format
   */
  constructor(logType, logUrl, format = ERROR_FORMAT) {
    this.logType = logType;
    this.logUrl = logUrl;
    this.format = format;
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

  handleError(identifier, details = "", error) {
    console.log(`## Beginning handleError`);
    try {
      let errorMessage = 'See Log for details';
      let stack = ''; let errorName = '';

      if (typeof error === 'string') {
        errorMessage = error;
      } else if (typeof error !== 'undefined' && typeof error.message === 'string') {
        errorMessage = error.message;
        if (error.stack) stack = error.stack;
        if (error.name) errorName = error.name;
      }

      const errorString = `${moment(Date.now()).format(this.format)}\nERROR handling ${identifier}: ${details}.\n${errorMessage} ${errorName}:\n${stack}`;
      console.log(errorString);

    } catch(error) {
      console.log("ERROR WITH ERROR HANDLER");
      throw new ErrorWithErrorHandlerError(error.message);
    }
  }

}

module.exports = ErrorHandler;
