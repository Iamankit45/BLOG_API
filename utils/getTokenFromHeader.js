const getTokenFromHeaders = (req) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token !== undefined) {
    return token;
  } else {
    return false;
  }
};

module.exports = getTokenFromHeaders;
