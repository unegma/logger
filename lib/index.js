module.exports = require('./errors');

module.exports = {
  SlackLogger: require('./SlackLogger'),
  SlackErrorLogger: require('./SlackErrorLogger'),
  Logger: require('./Logger'),
  ErrorLogger: require('./ErrorLogger')
}
