const jwt = require("jsonwebtoken");
const User = require("../src/models/user");


const jwtToken = async (req, res, next) => {
  let token = req.cookies.token;
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({
        error: "Not authorized, token failed"
      });
    }
    const userData = await User.findById(decoded.id)
    if (!userData) {
      return res.status(404).send({
        error: "User not found",
      });
    }
    req.user = userData;
    next();
  } catch (err) {
    return res.status(401).send({
      error: "Not authorized, token failed"
    });
  }
};

module.exports = jwtToken;
