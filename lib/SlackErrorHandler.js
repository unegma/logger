const fetch = require('node-fetch');
const ErrorHandler = require('./ErrorHandler');
const ErrorWithErrorHandlerError = require('./errors').ErrorWithErrorHandlerError;

/**
 * Slack Error Handler
 */
class SlackErrorHandler extends ErrorHandler {

  /**
   * Constructor
   * @param slackUrl
   * @param format
   */
  constructor(slackUrl, format) {
    super(format);
    this.slackUrl = slackUrl;
  }

  async handleError(identifier, details = "", error, postToSlack = true) {
    super.handleError(identifier, details, error);

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
      console.log("ERROR WITH ERROR HANDLER");
      throw new ErrorWithErrorHandlerError(error.message);
    }
  }
}

module.exports = SlackErrorHandler;
