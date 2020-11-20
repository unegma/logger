# Logger Utility

* Console log version (basic logging)
* Slack Version (posts errors to Slack based on desired timestamp format)

## Usage

`npm install @unegma/logger --save`

```
const {
  SLACK_LOG_URL
} = process.env;
const { SlackLogger } = require('@unegma/logger');
const slackLogger = new SlackLogger(SLACK_LOG_URL);

...

try {
  throw new Error();

} catch(error) {
  await slackLogger.log('myFunction', `myModule failed.`, error);
}
```

Regular Logging (not async):

```
const {
  SLACK_LOG_URL
} = process.env;
const { Logger } = require('@unegma/logger');
const logger = new Logger();

...

try {
  throw new Error();

} catch(error) {
  logger.log('myFunction', `myModule failed.`, error);
}
```

