import * as Joi from 'joi';

export const databaseConfigSchema = Joi.object({
  database: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    database: Joi.string().required(),
  }).required(),
});

export const googleConfigSchema = Joi.object({
  google: Joi.object({
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required(),
    redirectUrl: Joi.string().required(),
    tokenUrl: Joi.string().required(),
    userInfoUrl: Joi.string().required(),
  }).required(),
});

export const naverConfigSchema = Joi.object({
  naver: Joi.object({
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required(),
    redirectUrl: Joi.string().required(),
    tokenUrl: Joi.string().required(),
    userInfoUrl: Joi.string().required(),
  }).required(),
});
