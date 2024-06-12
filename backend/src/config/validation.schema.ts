import * as Joi from 'joi';

const defaultConfigSchema = {
  NODE_ENV: Joi.string().valid('local', 'development', 'production').required(),
  PORT: Joi.number().default(8000),
};

const databaseConfigSchema = {
  MYSQL_HOST: Joi.string().required(),
  MYSQL_PORT: Joi.number().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_ROOT_PASSWORD: Joi.string().required(),
  SESSION_SECRET: Joi.string().required(),
  SESSION_NAME: Joi.string().required(),
};

const googleConfigSchema = {
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_REDIRECT_URL: Joi.string().required(),
  GOOGLE_TOKEN_URL: Joi.string().required(),
  GOOGLE_USERINFO_URL: Joi.string().required(),
};

const naverConfigSchema = {
  NAVER_CLIENT_ID: Joi.string().required(),
  NAVER_CLIENT_SECRET: Joi.string().required(),
  NAVER_REDIRECT_URL: Joi.string().required(),
  NAVER_TOKEN_URL: Joi.string().required(),
  NAVER_USERINFO_URL: Joi.string().required(),
};

export const validationSchema = Joi.object({
  ...defaultConfigSchema,
  ...databaseConfigSchema,
  ...googleConfigSchema,
  ...naverConfigSchema,
});

// const commonConfigSchema = Joi.object({
//   mode: Joi.string().valid('local', 'development', 'production').required(),
//   port: Joi.number().default(8000),
// });

// const databaseConfigSchema = Joi.object({
//   database: Joi.object({
//     host: Joi.string().required(),
//     port: Joi.number().required(),
//     username: Joi.string().required(),
//     password: Joi.string().required(),
//     name: Joi.string().required(),
//     synchronize: Joi.boolean().required(),
//     logging: Joi.boolean().required(),
//   }).required(),
// });

// const googleConfigSchema = Joi.object({
//   google: Joi.object({
//     clientId: Joi.string().required(),
//     clientSecret: Joi.string().required(),
//     redirectUrl: Joi.string().required(),
//     tokenUrl: Joi.string().required(),
//     userInfoUrl: Joi.string().required(),
//   }).required(),
// });

// const naverConfigSchema = Joi.object({
//   naver: Joi.object({
//     clientId: Joi.string().required(),
//     clientSecret: Joi.string().required(),
//     redirectUrl: Joi.string().required(),
//     tokenUrl: Joi.string().required(),
//     userInfoUrl: Joi.string().required(),
//   }).required(),
// });
