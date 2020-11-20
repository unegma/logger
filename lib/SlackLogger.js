const fetch = require('node-fetch');
const Logger = require('./Logger');
const ErrorWithLoggerError = require('./errors');

/**
 * Slack Logger
 */
class SlackLogger extends Logger {

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
   * Log by posting to Slack
   *
   * @param identifier
   * @param details
   * @param postToSlack
   * @returns {Promise<*>}
   */
  async log(identifier, details = "", postToSlack = true) {
    super.log(identifier, details);

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
                  {text: this._logString})
            });
        return await slackResponse.text();
      }
    } catch (error) {
      console.log("ERROR WITH LOGGER");
      throw new ErrorWithLoggerError(error.message);
    }
  }
}

module.exports = SlackLogger;
