# Error Handler Utility

* Console log version (basic logging)
* Slack Version (posts errors to Slack based on desired timestamp formate)

## Usage
```
const {
  SLACK_ERROR_LOG
} = process.env;
const { SlackErrorHandler } = require('@unegma/error-handler');
const slackErrorHandler = new SlackErrorHandler(SLACK_ERROR_LOG);

...

try {
  throw new Error();

} catch(error) {
  await slackErrorHandler.handleError('myFunction', `myModule failed.`, error);
}
```
