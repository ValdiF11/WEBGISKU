const { verifyToken } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization;
    if (!access_token) {
      throw { name: "Invalid Token" };
    }
    let [bearer, token] = access_token.split(" ");
    if (bearer !== "Bearer") {
      throw { name: "Invalid Token" };
    }
    let payload = verifyToken(token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Invalid Token" };
    }
    req.user = {
      id: user.id,
      role: user.role,
    };
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authentication;
