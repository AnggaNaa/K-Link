import Joi = require("joi");

export const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
});

export const productSChema = Joi.object({
  harga: Joi.number(),
  filename: Joi.string(),
  prdnm: Joi.string(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
