const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (email && password && confirmPassword) {
    try {
      const userAlreadyExists = await User.findOne({ email });
      if (!userAlreadyExists) {
        if (password == confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          await User.create({ email, password: hashedPassword });
          return res.json({
            success: true,
            message: "Successfully signed up.",
          });
        }
        return res.json({ success: false, message: "Passwords do not match" });
      }
      return res.json({
        success: false,
        message: "User already exists, please login.",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Internal server error at signing in a user.",
      });
    }
  }
  return res.json({ success: false, message: "All fields are required" });
};

module.exports.Login = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const foundUser = await User.findOne({ email });
      if (foundUser) {
        const passwordMatched = await bcrypt.compare(
          password,
          foundUser.password
        );
        if (passwordMatched) {
          const token = jwt.sign({ userId: foundUser._id }, "jwttokensecret", {
            expiresIn: "2d",
          });
          return res.json({
            success: true,
            message: "Logged in successfully.",
            token,
          });
        }
        return res.json({
          success: false,
          message: "Invalid login credentials",
        });
      }
      return res.json({
        success: false,
        message: "User not found, please signup first.",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Internal server error at logging in a user.",
      });
    }
  }
  return res.json({ success: false, message: "All fields are required." });
};

module.exports.isAdmin = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, "jwttokensecret");
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found or invalid token.",
      });
    } else {
      const role = user.role;
      if (role === "admin") {
        return res.json({ success: true, message: "Approved as admin" });
      } else
        return res.json({ success: false, message: "Not approved as admin." });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal server error at checking admin.",
    });
  }
};
