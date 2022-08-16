require("dotenv/config");

module.exports = {
  Access: {
    Secret: process.env.ACCESS_SECRET,
    Option: {
      algorithm: process.env.ACCESS_OPTION_ALGORITHM,
      expiresIn: process.env.ACCESS_OPTION_EXPIRESIN,
    },
  },
  Refresh: {
    Secret: process.env.REFRESH_SECRET_KEY,
    Option: {
      algorithm: process.env.REFRESH_OPTION_ALGORITHM,
      expiresIn: process.env.REFRESH_OPTION_EXPIRESIN,
    },
  },
};
