const Joi = require('joi');

const userValidationSchema = Joi.object({
  fullName: Joi.string().max(50).default(''),
  username: Joi.string().max(25).required(),
  email: Joi.string().email().required()
});

const validateUser = (data) => {
  return userValidationSchema.validate(data);
};

module.exports = { validateUser };