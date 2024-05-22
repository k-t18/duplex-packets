const isAdminUser = (req, res, next) => {
  if (req.cookies.sid && req.cookies.user.role === "Admin") {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are not authorized to create Atom :( " });
  }
};
module.exports = isAdminUser;
