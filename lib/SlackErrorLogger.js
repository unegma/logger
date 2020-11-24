const fetch = require('node-fetch');
const ErrorLogger = require('./ErrorLogger');
const { ErrorWithLoggerError } = require('./errors');

/**
 * Slack Error Logger
 */
class SlackErrorLogger extends ErrorLogger {

  /**
   * Constructor
   * @param slackUrl
   * @param format
   */
  constructor(slackUrl, format) {
    super(format);
    this.slackUrl = slackUrl;
  }

  /**
   * Log Error including posting to Slack
   *
   * todo could extend the Slack Logger class here instead (needs refactor now that have combined libraries)
   *
   * @param identifier
   * @param details
   * @param error
   * @param postToSlack
   * @returns {Promise<*>}
   */
  async logError(identifier, details = "", error, postToSlack = true) {
    super.logError(identifier, details, error);

    try {
      if (postToSlack) {
        console.log('Posting to Slack');
        const slackResponse = await fetch(
            this.slackUrl,
            {
              method: "post", headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text/plain, */*"
              },
              body: JSON.stringify(
                  {text: this._errorString})
            });
        return await slackResponse.text();
      }
    } catch (error) {
      console.log("ERROR WITH ERROR LOGGER");
      throw new ErrorWithLoggerError(error.message);
    }
  }
}

module.exports = SlackErrorLogger;
