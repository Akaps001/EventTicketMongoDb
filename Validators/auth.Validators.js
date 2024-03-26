const joi = require("joi");

const signupSchema = Joi.object({
  fullname: Joi.string().alphanum().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

const loginSchema = joi
  .object({
    username: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  })
  .or("email", username);

//validating signupmiddleware
const validateSignupMiddleware = (req, res, next) => {
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
      return res.status(404).json({
        message: error.message,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
const validateLoginMiddleware = (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(404).json({
        message: error.message,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
module.exports = {
  validateSignupMiddleware,
  loginSchema,
  signupSchema,
  validateLoginMiddleware,
};
