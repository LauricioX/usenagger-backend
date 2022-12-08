const jwt = require("jsonwebtoken");

let secret = "lauricio";

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    const bearer = authToken.split(" ");

    let token = bearer[1];

    try {
      let decoded = jwt.verify(token, secret);
      if (decoded.role == 1) {
        next();
      } else {
        res.status(403);
        res.send("você não está autorizado !");
        return;
      }
    } catch (erro) {
      res.status(403);
      res.send("você não está autorizado !");
      return;
    }
  } else {
    res.status(403);
    res.send("voce não está authorizado");
    return;
  }
};
