import { httpLogger, ResponseUtils } from '@gln-libs/node-infrastructure';
import express from 'express';

import { AppConfig } from './config';
import ExampleController from './example/example.controller';
import FileController from './file/file.controller';
import { corsMiddleware } from './middleware';

const setupAppMiddlewares = (app: express.Express) => {
  app.use(httpLogger());
  app.use((_, res, next) => {
    Object.assign(res, ResponseUtils(res));
    next();
  });

  app.use(corsMiddleware(AppConfig.HttpServer.CORS));
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
};

const initializeControllers = (app: express.Express): void => {
  app.use('/api/example', ExampleController);
  app.use('/api/file', FileController);
};

export const startHttpServer = (): void => {
  const { port } = AppConfig.HttpServer;
  const app = express();

  setupAppMiddlewares(app);

  initializeControllers(app);

  app.listen(port, () => {
    global.logger.info(`HttpServer started on port ${port}`);
  });
};
