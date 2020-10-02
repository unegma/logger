const chai = require('chai');
const expect = chai.expect;
const ErrorWithErrorHandlerError = require('../lib/errors/ErrorWithErrorHandlerError');

describe('First Test', () => {

  it('should create an instance of an ErrorWithErrorHandlerError', () => {
    const error = new ErrorWithErrorHandlerError('Error Happened');
    expect(error.message).to.equal('Error Happened');
  });

});
