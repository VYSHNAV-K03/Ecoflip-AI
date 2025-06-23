const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate requests
const authMiddleware = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-auth-token"];

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await User.findById(decoded.id);
    // console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.user = user;
    req.user.userId = user._id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// 67b6b2cb540dcaf713981cbb

module.exports = authMiddleware;
