/* eslint-disable camelcase */
export type MongoDB = {
  database_test: string;
  database_url: string;
  database_host: string;
  database: string;
  mongoOptions: object;
};

const mongoConfig: MongoDB = {
  database_test: process.env.DB_TEST || 'mongodb://localhost:27017/test',
  database_host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DEFAULT || 'db_yemusic',
  database_url: process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017',
  mongoOptions: {
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
    authSource: process.env.DB_AUTH,
  },
};

export default mongoConfig;
