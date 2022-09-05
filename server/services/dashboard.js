const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getCompany(user) {
  try {
    const rows = await db.query(
      `SELECT
          name,
          ((CASE WHEN name IS NULL THEN 1 ELSE 0 END)
          + (CASE WHEN email IS NULL THEN 1 ELSE 0 END)
          + (CASE WHEN contact IS NULL THEN 1 ELSE 0 END)
          + (CASE WHEN address_street IS NULL THEN 1 ELSE 0 END)
          + (CASE WHEN address_city IS NULL THEN 1 ELSE 0 END)
          + (CASE WHEN address_state IS NULL THEN 1 ELSE 0 END)
          + (CASE WHEN address_post_code IS NULL THEN 1 ELSE 0 END)
          + (CASE WHEN logo IS NULL THEN 1 ELSE 0 END) 
          + (CASE WHEN reg_no IS NULL THEN 1 ELSE 0 END) 
          + (CASE WHEN epf_no IS NULL THEN 1 ELSE 0 END) 
          + (CASE WHEN socso_no IS NULL THEN 1 ELSE 0 END)) AS sum_of_nulls
          FROM employers
          WHERE id=${user.employer_id} LIMIT 1`
    );

    let company = helper.emptyOrRows(rows);

    company[0].value = parseInt(100 * (11 - company[0].sum_of_nulls) / 11);
    delete company[0].sum_of_nulls;

    return company[0];
  } catch (error) {
    return "Get Company Error";
  }
}


async function getInfo(user) {
  try {
    const rows = await db.query(
      `SELECT COUNT(id) AS empCount FROM employees WHERE employer_id = ${user.employer_id}`
    );

    let employees = helper.emptyOrRows(rows);

    const rows2 = await db.query(
      `SELECT COUNT(id) AS payrollCount FROM payrolls WHERE employer_id = ${user.employer_id} AND status = 'PAID'`
    );

    let payrolls = helper.emptyOrRows(rows2);

    const rows3 = await db.query(
      `SELECT created_at FROM employers WHERE id = ${user.employer_id} LIMIT 1`
    );

    let date = helper.emptyOrRows(rows3);
    let currentDate = new Date();
    let createdDate = new Date(date[0].created_at);
    let diffTime = currentDate.getTime() - createdDate.getTime();
    let dayCount = Math.ceil(diffTime / (1000 * 3600 * 24));;

    return {
      empCount: employees[0].empCount,
      payrollCount: payrolls[0].payrollCount,
      dayCount
    };
  } catch (error) {
    return "Get Dashboard Info Error";
  }
}


async function getExpireList(user, input) {
  let dateType = "";
  if (input.expireType == "Permit Expire") {
    dateType = "permit_exp_date"
  } else if (input.expireType == "Health Examination Expire") {
    dateType = "medical_exp_date"
  } else if (input.expireType == "Passport Expire") {
    dateType = "passport_exp_date"
  }

  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + parseInt(input.dayRange));
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  month = month < 10 ? "0" + month : "" + month;
  let date = currentDate.getDate();
  date = date < 10 ? "0" + date : "" + date;
  let dateString = `${year}-${month}-${date}`

  try {
    const rows = await db.query(
      `SELECT employees.id AS id, employees.name AS name, employees.image AS img, employment_info.${dateType} AS date
      FROM employees
      LEFT JOIN employment_info ON employees.employment_info_id = employment_info.id
      WHERE employment_info.${dateType} <= '${dateString}' AND employees.employer_id = ${user.employer_id};`
    );

    let result = helper.emptyOrRows(rows);

    return result;
  } catch (error) {
    return "Get Expire List Error";
  }
}

module.exports = {
  getCompany,
  getInfo,
  getExpireList
}