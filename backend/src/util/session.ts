import * as session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);

const options = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const sessionConfig = session({
  secret: 'korgeobug-secret',
  name: 'korgeobug-session',
  store: new MySQLStore(options),
  resave: false,
  saveUninitialized: true,
});

export default sessionConfig;
