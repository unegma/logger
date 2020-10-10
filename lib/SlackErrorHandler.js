const fetch = require('node-fetch');
const ErrorHandler = require('./ErrorHandler');

/**
 * Slack Error Handler
 */
class SlackErrorHandler extends ErrorHandler {

  /**
   * Constructor
   * @param logType
   * @param logUrl
   * @param slackUrl
   */
  constructor(logType, logUrl, slackUrl) {
    super(logType, logUrl);
    this.slackUrl = slackUrl;
  }

  saySlackUrl() {
    return this.slackUrl;
  }
}

module.exports = SlackErrorHandler;
