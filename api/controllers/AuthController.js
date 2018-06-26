const authService = require("./../services/AuthService");

const login = async function(req, res) {
  const body = req.body;
  let err, user;

  [err, user] = await to(authService.authUser(req.body));
  if (err) return ReE(res, err, 401);

  return ReS(res, { token: user.getJWT(), user: user.toWeb() });
};

const session = async function(req, res) {
  let user = req.user;

  if (user) {
    return ReS(res, { token: user.getJWT(), user: user.toWeb() });
  } else {
    return ReE(res, "Invalid token");
  }
};

module.exports = {
  login,
  session
};
