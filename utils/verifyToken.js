const JWT = require("jsonwebtoken");

const verifyToken = (token) => {
  return JWT.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      // console.log(err);
      return false;
    } else {
      return decoded;
    }
  });
};

module.exports = verifyToken;
