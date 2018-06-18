const bcrypt = require("bcrypt");
const bcrypt_p = require("bcrypt-promise");

const createPasswordHash = async password => {
  let salt, hash;
  [err, salt] = await to(bcrypt.genSalt(10));
  if (err) TE(err.message, true);

  [err, hash] = await to(bcrypt.hash(password, salt));
  if (err) TE(err.message, true);

  return hash;
};

module.exports = {
  createPasswordHash
};
