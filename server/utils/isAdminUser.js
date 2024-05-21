const isAdminUser = (req, res, next) => {
  if (req.cookies.sid) {
    console.log(req.cookies);
    next();
  } else {
    res
      .status(401)
      .json({ message: "You are not authorized to create Atom :( " });
  }
};
module.exports = isAdminUser;
