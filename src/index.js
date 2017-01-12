import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import initializeDb from './db';
import middleware from './middleware';
import routes from './routes';
import config from './config.json';

const app = express();
app.server = http.createServer(app);

// initialize dotenv

// 3rd party middleware
app.use(cors({ exposedHeaders: config.corsHeaders }));

app.use(bodyParser.json({ limit: config.bodyLimit }));

// connect to db
initializeDb((db) => {
  // internal middleware
  app.use(middleware({ config, db }));

  // api router

  app.use('/', routes);

  app.server.listen(process.env.PORT || config.port);

  console.log(`Started on port ${app.server.address().port}`); // eslint-disable-line
});

export default app;
