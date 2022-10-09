import './src/application/config';

import { defaultLogger } from '@gln-libs/node-infrastructure';

import { startHttpServer } from './src/application/server';

global.logger = defaultLogger();

const start = async () => {
  startHttpServer();
};

start();
