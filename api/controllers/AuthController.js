const authService = require("./../services/AuthService");

const login = async function(req, res) {
  const body = req.body;
  let err, user;

  [err, user] = await to(authService.authUser(req.body));
  if (err) return ReE(res, err, 422);

  return ReS(res, { token: user.getJWT(), user: user.toWeb() });
};

module.exports = {
  login
};
