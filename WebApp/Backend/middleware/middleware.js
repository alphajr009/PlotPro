const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    console.log(req.headers, 'auth');
    if (!req.headers.authorization) {
      return res.status(401).send({
        success: false,
        message: "Auth Failed",
      });
    }

    // Extract token from authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1]; // Assumes the format is "Bearer token"

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Auth Failed",
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      console.log("decode", decode);
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
          err,
        });
      } else {
        req.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error, 'no token');
    return res.status(401).send({
      success: false,
      error,
      message: "Auth Failed",
    });
  }
};
