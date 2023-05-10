const defaultConfig = require("../config/default.config");
const { GetTokenInfo } = require("../services/auth.service");

const Auth = async (req, res, next) => {
  const {
    jwt: { secret },
  } = defaultConfig;

  const user = await GetTokenInfo(req.headers, secret);

  if (!user) {
    res.status(403).json({
      success: false,
      message: "Login invalid!",
    });
  } else {
    await next();
  }
};

module.exports = {
  Auth,
};
