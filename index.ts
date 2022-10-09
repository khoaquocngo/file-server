import '@app/config';

import { startHttpServer } from '@app/server';
import { connectMongoDB } from '@datasource/mongodb/datasource';
import { defaultLogger } from '@gln-libs/node-infrastructure';

global.logger = defaultLogger();

const start = async () => {
  await connectMongoDB();
  startHttpServer();
};

start();
