const asyncHandler = require("express-async-handler");
const User = require("../model/authSchema");
const bcrypt = require("bcrypt");
const { createCustomError } = require("../errors/customErrors");
const jwt = require("jsonwebtoken");

const registerController = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (email && name && password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({ user });
  } else {
    return next(createCustomError("resource not dound", 404));
  }
});

const loginController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const data = await User.findOne({ email });
  if (!data) {
    return next(createCustomError("resource not found", 404));
  }
  if (email && bcrypt.compareSync(password, data.password)) {
    jwt.sign(
      { email: data.email, id: data._id, name: data.name },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" },
      (err, token) => {
        if (err) {
          console.log(err);
          return next(createCustomError("Token signing failed", 500));
        }
        res
          .status(200)
          .cookie("token", token)
          .json({
            data: data,
            message: "Login Successful",
            success: true,
            token: token,
          });
      }
    );
  }else{
        return next(createCustomError("incorrect credentials", 401));
  }
  
});

const allDetails = asyncHandler(async (req, res) => {
  const data = await User.find({});
  res.status(200).json({ success: true, data: data });
});
module.exports = { registerController, loginController, allDetails };
