import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT, 10),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  name: process.env.MYSQL_DATABASE,
  synchronize: process.env.NODE_ENV !== 'production' ? true : false, // 개발 환경에서는 true, 프로덕션 환경에서는 false로 설정
  logging: process.env.NODE_ENV !== 'production' ? true : false,
}));

// export const databaseConfig = () => ({
//   database: {
//     host: process.env.MYSQL_HOST,
//     port: parseInt(process.env.MYSQL_PORT, 10),
//     username: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     name: process.env.MYSQL_DATABASE,
//     synchronize: process.env.NODE_ENV !== 'production' ? true : false, // 개발 환경에서는 true, 프로덕션 환경에서는 false로 설정
//     logging: process.env.NODE_ENV !== 'production' ? true : false,
//   }
// });
