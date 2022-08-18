const jwt = require('jsonwebtoken');

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function generateAccessToken(name) {
  return jwt.sign(name, process.env.TOKEN_SECRET, { expiresIn: '604800s' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)

    req.user = user
    console.log(user);

    next()
  })
}

module.exports = {
  getOffset,
  emptyOrRows,
  generateAccessToken,
  authenticateToken,
}