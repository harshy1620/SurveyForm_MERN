const jwt = require("jsonwebtoken");
const User = require("../models/User");

// the client sends the jwt token in the header and then it is checked/ verified and then the further request takes place
module.exports.authenticateUser = async (req, res, next) => {
  try {
    // Accessing the token from header
    const token = req.header("Authorization").replace("Bearer ", "");
    // Verifying the token
    const decoded = jwt.verify(token, "jwttokensecret");
    // Finding the user based on the decoded user ID
    const user = await User.findById(decoded.userId);
    // if user is not found, then throw an error
    if (!user) {
      return res.json({
        success: false,
        message: "User not found or invalid token.",
      });
    }
    // Attaching the user to the request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Authentication failed" });
  }
};
