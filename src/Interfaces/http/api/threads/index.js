const ThreadsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'threads',
  register: async (server, { container, validator }) => {
    const threadsHandler = new ThreadsHandler(container, validator);
    server.route(routes(threadsHandler));
  },
};
