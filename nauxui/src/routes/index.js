const pillRouter = require('./pill');
const boxRouter = require('./box');
const cors = require('cors')


function route(app) {
  app.use(cors())
  app.use('/box', boxRouter);
  app.use('/pill', pillRouter);
}

module.exports = route;
