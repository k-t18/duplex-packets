const checkUserSession = (req, res, next) => {
  if (req.cookies.sid) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = checkUserSession;
