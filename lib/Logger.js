const moment = require('moment');
const FORMAT = '### *YYYY-MM-DD/ddd* *HH:mm:ss*';
const { ErrorWithLoggerError } = require('./errors');

/**
 * Logger
 */
class Logger {

  /**
   * Constructor
   *
   * @param format
   */
  constructor(format = FORMAT) {
    this.format = format;
    this._logString = '';
  }

  /**
   * Log with just Console logging
   *
   * @param identifier
   * @param details
   */
  log(identifier, details = "") {
    console.log(`## Beginning log`);
    try {
      this._logString = `${moment(Date.now()).format(this.format)}\n${identifier}: ${details}.\n`;
      console.log(this._logString);
    } catch(error) {
      console.log("ERROR WITH LOGGER");
      throw new ErrorWithLoggerError(error.message);
    }
  }

  // used for testing
  throwError() {
    throw new ErrorWithLoggerError();
  }

}

module.exports = Logger;
