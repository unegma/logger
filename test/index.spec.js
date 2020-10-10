require('dotenv').config({ path: '.env' });
const {
  SLACK_ERROR_LOG,
} = process.env;
const chai = require('chai');
const expect = chai.expect;
const ErrorHandler = require('../lib/ErrorHandler');
const SlackErrorHandler = require('../lib/SlackErrorHandler');
const ErrorWithErrorHandlerError = require('../lib/errors/ErrorWithErrorHandlerError');

describe('Errors Test', () => {

  it('should create an instance of an ErrorWithErrorHandlerError', () => {
    const error = new ErrorWithErrorHandlerError('Error Happened');
    expect(error.message).to.equal('Error Happened');
  });

  it('should create an instance of an ErrorHandler', () => {
    const errorHandler = new ErrorHandler('Console', 'https://example.com');
    expect(errorHandler.sayLogType()).to.equal('Console');
    expect(errorHandler.sayLogUrl()).to.equal('https://example.com');
  });

  it('should create an instance of a SlackErrorHandler', () => {
    const slackErrorHandler = new SlackErrorHandler('Slack', 'https://example.com', SLACK_ERROR_LOG);
    expect(slackErrorHandler.sayLogType()).to.equal('Slack');
    expect(slackErrorHandler.sayLogUrl()).to.equal('https://example.com');
    expect(slackErrorHandler.saySlackUrl()).to.contain('hooks.slack.com');
    expect(() => {
      slackErrorHandler.throwError('Message')
    }).to.throw(ErrorWithErrorHandlerError);
  });

});
