class ErrorWithLoggerError extends Error {
  constructor (message) {
    super(message);
    this.name = 'ErrorWithLoggerError';
  }
}

module.exports = ErrorWithLoggerError;
