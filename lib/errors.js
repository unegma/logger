class ErrorWithErrorHandlerError extends Error {
  constructor (message) {
    super(message);
    this.name = 'ErrorWithErrorHandlerError';
  }
}

module.exports = {
  ErrorWithErrorHandlerError,
};
