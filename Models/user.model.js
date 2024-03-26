const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
saltRounds = 10;
const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phonenumber: { type: Number, required: true },
  },
  { timestamp: true }
);

userSchema.pre("save", () => {
  let salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(this.password);
  this.password = hash;
});
//
userSchema.method("generateToken", () => {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { issuer: "", expiresIn: "4H" }
  );
  return token;
});
const User = mongoose.model("User", userSchema);
module.exports = { User };
