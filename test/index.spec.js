require('dotenv').config({ path: '.env' });
const {
  SLACK_LOG_URL = 'https://example.com/services',
} = process.env;
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const nock = require('nock')
const Logger = require('../lib/Logger');
const SlackLogger = require('../lib/SlackLogger');
const ErrorLogger = require('../lib/ErrorLogger');
const SlackErrorLogger = require('../lib/SlackErrorLogger');
const ErrorWithLoggerError = require('../lib/errors/ErrorWithLoggerError');

describe('Errors Test', () => {
  beforeEach(function() {
    sinon.spy(console, 'log');
  });

  afterEach(function() {
    console.log.restore();
  });

  it('should create an instance of an ErrorWithLoggerError', () => {
    const error = new ErrorWithLoggerError('Error Happened');
    expect(error.message).to.equal('Error Happened');
  });

  it('should create an instance of an Logger', () => {
    const logger = new Logger();
    expect(logger).to.be.instanceOf(Logger);
    expect(() => {
      logger.throwError('Message')
    }).to.throw(ErrorWithLoggerError);
  });

  it('should create an instance of a SlackLogger', () => {
    const slackLogger = new SlackLogger(SLACK_LOG_URL);
    expect(slackLogger).to.be.instanceOf(SlackLogger);
    expect(() => {
      slackLogger.throwError()
    }).to.throw(ErrorWithLoggerError);
  });

  it('should handle an Error', () => {
    const logger = new Logger();
    logger.log('testLog', 'This is a test');
    expect(console.log).to.have.been.calledTwice;
  });

  it('should handle an Error and Post to Slack', async () => {
    nock(SLACK_LOG_URL)
      .post(uri => uri.includes('services'))
      .reply(200, "ok");

    const slackLogger = new SlackLogger(SLACK_LOG_URL); // 'YYYY-MM-DD-dddd'
    const response = await slackLogger.log('testLog', 'This is a test');
    expect(console.log).to.have.callCount(3);
    expect(response).to.equal('ok');
  });


  it('should create an instance of an ErrorWithLoggerError', () => {
    const error = new ErrorWithLoggerError('Error Happened');
    expect(error.message).to.equal('Error Happened');
  });

  it('should create an instance of an ErrorLogger', () => {
    const errorLogger = new ErrorLogger();
    expect(errorLogger).to.be.instanceOf(ErrorLogger);
    expect(() => {
      errorLogger.throwError('Message')
    }).to.throw(ErrorWithLoggerError);
  });

  it('should create an instance of a SlackErrorLogger', () => {
    const slackErrorLogger = new SlackErrorLogger(SLACK_LOG_URL);
    expect(slackErrorLogger).to.be.instanceOf(SlackErrorLogger);
    expect(() => {
      slackErrorLogger.throwError()
    }).to.throw(ErrorWithLoggerError);
  });

  it('should handle an Error', () => {
    const errorLogger = new ErrorLogger();
    errorLogger.logError('testError', 'This is a test', 'Test Error');
    expect(console.log).to.have.been.calledTwice;
  });

  it('should handle an Error and Post to Slack', async () => {
    nock(SLACK_LOG_URL)
        .post(uri => uri.includes('services'))
        .reply(200, "ok");

    const slackErrorLogger = new SlackErrorLogger(SLACK_LOG_URL); // 'YYYY-MM-DD-dddd'
    const response = await slackErrorLogger.logError('testError', 'This is a test', 'Test Error');
    expect(console.log).to.have.callCount(3);
    expect(response).to.equal('ok');
  });

});
