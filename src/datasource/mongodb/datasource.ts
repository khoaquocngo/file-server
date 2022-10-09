import * as mongoose from 'mongoose';

import mongoConfig from '../../../odmconfig';

export const connectMongoDB = async (): Promise<void> => {
  mongoose.connect(
    mongoConfig.database_url ||
      `mongoConfig://${mongoConfig.database_host}/${mongoConfig.database}`,
    mongoConfig.mongoOptions,
    err => {
      if (err) {
        logger.info(`💩 mongodb connection failed ${err}`);
      } else {
        logger.info('🌈 hello from mongodb');
      }
    }
  );
};
