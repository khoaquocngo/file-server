import './src/application/config';

import { defaultLogger } from '@gln-libs/node-infrastructure';

import { startHttpServer } from './src/application/server';
import { connectMongoDB } from './src/datasource/mongodb/datasource';

global.logger = defaultLogger();

const start = async () => {
  await connectMongoDB();
  startHttpServer();
};

start();
