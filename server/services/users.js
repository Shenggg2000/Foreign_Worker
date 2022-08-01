const db = require('./db');
const helper = require('../helper');

async function getUsers(){
  const rows = await db.query(
    `SELECT * FROM users`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

module.exports = {
  getUsers
}