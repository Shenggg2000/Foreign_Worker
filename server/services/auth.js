const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function register(regInfo) {
  let message = 'Error in creating user';
  try {
    const result = await db.query(
      `INSERT INTO employers 
      (name, created_at) 
      VALUES 
      ("${regInfo.companyName}", NOW())`
    );

    if (result.affectedRows > 0) {
      message = result.insertId;
      const result2 = await db.query(
        `INSERT INTO users 
        (username, email, password, employer_id, created_at) 
        VALUES 
        ("${regInfo.username}", "${regInfo.email}", "${regInfo.password}", "${message}", NOW())`
      );
      if (!result2.affectedRows) {
        await db.query(
          `DELETE FROM employers 
          WHERE id = ${message}`
        );
        message = 'Error in creating user';
      }
    }

    return message;
  } catch (err) {
    console.log(err);
    if (message != "Error in creating user") {
      console.log(message);
      await db.query(
        `DELETE FROM employers 
        WHERE id = ${message}`
      );
    }
    return 'Error in creating user'
  }
}

async function login(loginInfo) {
  try {
    const result = await db.query(
      `SELECT * FROM users WHERE email = "${loginInfo.email}" AND password = "${loginInfo.password}" LIMIT 1`
    );

    const found = result.length > 0 ? result[0].employer_id : "Not Found";

    return found;
  } catch (err) {
    return "Not Found"
  }
}

async function user(user) {
  const rows = await db.query(
    `SELECT users.id AS user_id, username, users.email AS user_email, users.employer_id AS employer_id, 
    employers.name AS employer_name, employers.email AS employer_email, contact, address_street, 
    address_city, address_state, address_post_code, logo, reg_no, epf_no, socso_no
    FROM users LEFT JOIN employers
    ON users.employer_id = employers.id WHERE users.employer_id  = ${user.employer_id}`
  );

  const data = helper.emptyOrRows(rows);

  return data;
}

async function updateUser(input, user) {
  let result = null;
  if(input.oldpassword && input.newpassword){
    result = await db.query(
      `UPDATE users 
      SET password="${input.newpassword}", username="${input.username}", modified_at=NOW() 
      WHERE employer_id = "${user.employer_id}" AND password="${input.oldpassword}"`
    );
  }else{
    result = await db.query(
      `UPDATE users 
      SET username="${input.username}", modified_at=NOW() 
      WHERE employer_id = "${user.employer_id}"`
    );
  }

  let message = 'Update Fail';

  if (result.affectedRows > 0) {
    console.log(123);
    message = 'User updated successfully';
  }

  return message;
}

async function updateEmployer(input, user, logo) {
  console.log(input);
  let sqlLogo = "";
  if (logo) {
    sqlLogo = 'logo="' + logo.filename + '", ';
  }
  const result = await db.query(
    `UPDATE employers 
    SET name="${input.employer_name}", email="${input.employer_email}", contact="${input.contact}", address_street="${input.address_street}", address_city="${input.address_city}",
    address_state="${input.address_state}", address_post_code="${input.address_post_code}", ${sqlLogo} reg_no="${input.reg_no}", 
    epf_no="${input.epf_no}", socso_no="${input.socso_no}", modified_at=NOW() 
    WHERE id = "${user.employer_id}"`
  );

  let message = 'Update Fail';

  if (result.affectedRows) {
    message = 'User updated successfully';
  }

  return message;
}

module.exports = {
  register,
  login,
  updateUser,
  updateEmployer,
  user
}