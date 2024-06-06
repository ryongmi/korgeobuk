import * as session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore({
  // MySQLStore 설정
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const sessionConfig = session({
  secret: 'korgeobug-secret',
  name: 'korgeobug-session',
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  //   cookie: {
  //     domain: '.example.com', // 메인 도메인 및 서브도메인에서 사용 가능하도록 설정
  //     secure: false, // HTTPS에서만 사용할 것인지 여부
  //     httpOnly: true, // 클라이언트에서 쿠키에 접근하는 것을 막음
  //     maxAge: 24 * 60 * 60 * 1000 // 쿠키 만료 시간 설정 (예: 1일) // 1000 = 1초
  // }
});
