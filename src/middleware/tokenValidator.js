const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, "KEY", (err, data) => {
      if (err) {
        res.status(401);
        throw new Error("Unauthorize User");
      }

      req.user = data.user;
      next();
    });
  }

  if (!token) {
    res.status(404);
    throw new Error("Unauthorize User OR Token not provided");
  }
});

module.exports = validateToken;
