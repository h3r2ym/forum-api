const ReplyHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'replys',
  register: async (server, { container, validator }) => {
    const replyHandler = new ReplyHandler(container, validator);
    server.route(routes(replyHandler));
  },
};
