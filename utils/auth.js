const withAuth = (req, res, next) => {
  if (!req.session.user_name) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
