const getTokenFromHeaders = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");
const appErr = require("../utils/appErr");

const isLogin = (req, res, next) => {
  //get token from headers
  const token = getTokenFromHeaders(req);

  //verify the token

  const decodedUser = verifyToken(token);
  req.userAuth = decodedUser.id;

  // console.log(decodedUser);
  if (!decodedUser) {
    return next(appErr("invalid/expired token,please log in again", 500));
  } else {
    next();
  }
};

module.exports = isLogin;
