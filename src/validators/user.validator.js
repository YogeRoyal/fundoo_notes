import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    fname: Joi.string().min(3).required(),
    lname: Joi.string().min(1).required(),
    username:Joi.string().min(4).required(),
    password:Joi.string().min(4).required(),
    phone_no:Joi.string().max(10).required(),
    city: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
