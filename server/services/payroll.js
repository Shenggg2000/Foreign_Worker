const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getEmployees(user) {
  try {
    const rows = await db.query(
      `SELECT employees.id AS empId, employees.name AS empName, employees.image AS empImg,
      employment_info.salary_amount AS basicSalaryBasedOnUnit, 
      employment_info.salary_frequency AS salaryFrequency, 
      contribution_info.contribute_epf AS epfNeeded, 
      contribution_info.employee_epf_rate AS employeeRate, 
      contribution_info.employer_epf_rate AS employerRate, 
      contribution_info.contribute_eis AS eisNeeded, 
      contribution_info.contribute_pcb AS pcbNeeded, 
      contribution_info.socso_cateogry AS isSocsoCategory1
      FROM employees 
      LEFT JOIN employment_info ON employees.employment_info_id = employment_info.id 
      LEFT JOIN contribution_info ON employees.contribution_info_id = contribution_info.id 
      WHERE employees.employer_id  = ${user.employer_id}`
    );

    let emps = helper.emptyOrRows(rows);

    for (let emp of emps) {
      emp.salaryFrequency = emp.salaryFrequency.toLowerCase();
      emp.dayWorked = 20;
      emp.hourWorked = 160;
      if (emp.salaryFrequency == "monthly") {
        emp.basicSalary = emp.basicSalaryBasedOnUnit;
      } else if (emp.salaryFrequency == "hourly") {
        emp.basicSalary = emp.basicSalaryBasedOnUnit * emp.hourWorked;
      } else if (emp.salaryFrequency == "daily") {
        emp.basicSalary = emp.basicSalaryBasedOnUnit * emp.dayWorked;
      }
      emp.contributionOption = {
        pcbNeeded: emp.pcbNeeded === 1 ? true : false,
        eisNeeded: emp.eisNeeded === 1 ? true : false,
        epfNeeded: emp.epfNeeded === 1 ? true : false,
        employeeRate: emp.employeeRate / 100,
        employerRate: emp.employerRate / 100,
        isSocsoCategory1: emp.isSocsoCategory1 === 1 ? true : false,
      }
      delete emp.pcbNeeded;
      delete emp.eisNeeded;
      delete emp.epfNeeded;
      delete emp.employeeRate;
      delete emp.employerRate;
      delete emp.isSocsoCategory1;
    }

    for (let emp of emps) {
      const rows2 = await db.query(
        `SELECT deduction_types.id AS id, default_deductions.amount AS amount
        FROM default_deductions
        LEFT JOIN deduction_types ON default_deductions.deduction_type_id = deduction_types.id
        WHERE employee_id = ${emp.empId}`
      );

      let items = helper.emptyOrRows(rows2);
      let totalAmount = items.reduce((previousValue, item) => {
        return previousValue + item.amount;
      }, 0);

      emp.deduction = {
        totalAmount,
        items
      }
    }

    for (let emp of emps) {
      const rows3 = await db.query(
        `SELECT addition_types.id AS id, default_addtions.amount AS amount
        FROM default_addtions
        LEFT JOIN addition_types ON default_addtions.addition_type_id = addition_types.id
        WHERE employee_id = ${emp.empId}`
      );

      let items = helper.emptyOrRows(rows3);
      let totalAmount = items.reduce((previousValue, item) => {
        return previousValue + item.amount;
      }, 0);

      emp.compensation = {
        totalAmount,
        items
      }
    }

    return emps;
  } catch (error) {
    return "Get Employee Error";
  }

}

async function getAdditions() {
  try {
    const rows = await db.query(
      `SELECT id, addition_name AS name
      FROM addition_types`
    );

    let data = helper.emptyOrRows(rows);

    return data;
  } catch (error) {
    return "Get Additions Error";
  }

}

async function getDeductions() {
  try {
    const rows = await db.query(
      `SELECT id, deduction_name AS name
      FROM deduction_types`
    );

    let data = helper.emptyOrRows(rows);

    return data;
  } catch (error) {
    return "Get Deductions Error";
  }
}

async function run(user, input) {
  try {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let result = await db.query(
      `INSERT INTO payrolls
      (employer_id, paid_date, year, month, status, created_at) 
      VALUES 
      (${user.employer_id}, NOW(), "${year}", "${month}", "PAID", NOW())`
    );
    let payrollId = 0;
    if (result.affectedRows > 0) {
      payrollId = result.insertId;
      for (let emp of input.employees) {
        if (emp.optIn) {
          let result2 = await db.query(
            `INSERT INTO employee_payroll
            (payroll_id, employee_id, basic_salary, gross_salary, net_salary, created_at) 
            VALUES 
            (${payrollId}, ${emp.empId}, ${emp.basicSalary}, ${emp.grossSalary}, ${emp.netSalary}, NOW())`
          );

          if (result2.affectedRows > 0) {
            let empPayrollId = result2.insertId;
            for (let compensation of emp.compensation.items) {
              await db.query(
                `INSERT INTO additions
                (emp_payroll_id, addition_type_id, amount, created_at) 
                VALUES 
                (${empPayrollId}, ${compensation.id}, ${compensation.amount}, NOW())`
              );
            }
            for (let deduction of emp.deduction.items) {
              await db.query(
                `INSERT INTO deductions
                (emp_payroll_id, deduction_type_id, amount, created_at) 
                VALUES 
                (${empPayrollId}, ${deduction.id}, ${deduction.amount}, NOW())`
              );
            }
            for (let contribution of emp.contribution.items) {
              await db.query(
                `INSERT INTO employee_contributions
                (emp_payroll_id, contribution_type, amount, created_at) 
                VALUES 
                (${empPayrollId}, "${contribution.name}", ${contribution.amount}, NOW())`
              );
            }
            for (let contribution of emp.employerCost.items) {
              await db.query(
                `INSERT INTO employer_contributions
                (emp_payroll_id, contribution_type, amount, created_at) 
                VALUES 
                (${empPayrollId}, "${contribution.name}", ${contribution.amount}, NOW())`
              );
            }
          }
        }
      }
    }

    return { message: "Run Payroll Successful", id: payrollId };
  } catch (error) {
    console.log(error);
    return "Run Payroll Error"
  }
}

async function allHistory(user) {
  try {
    const rows = await db.query(
      `SELECT payrolls.id AS id, payrolls.paid_date AS paid_date, payrolls.status AS status,
      COUNT(employee_payroll.id) AS numEmp, SUM(employee_payroll.net_salary) AS total
      FROM payrolls
      LEFT JOIN employee_payroll ON payrolls.id = employee_payroll.payroll_id
      WHERE payrolls.employer_id = ${user.employer_id}
      GROUP BY payrolls.id;`
    );

    let payrolls = helper.emptyOrRows(rows);

    for (let payroll of payrolls) {
      const rows2 = await db.query(
        `SELECT SUM(amount) AS amount
        FROM employee_contributions
        WHERE emp_payroll_id IN (SELECT id
        FROM employee_payroll
        WHERE payroll_id = ${payroll.id});`
      );
      const rows3 = await db.query(
        `SELECT SUM(amount) AS amount
        FROM employer_contributions
        WHERE emp_payroll_id IN (SELECT id
        FROM employee_payroll
        WHERE payroll_id = ${payroll.id});`
      );
      payroll.total = payroll.total + rows2[0].amount + rows3[0].amount;
      payroll.status = payroll.status == "PAID" ? true : false;
      payroll.timestamp = Math.floor(new Date(payroll.paid_date).getTime() / 1000);
      delete payroll.paid_date;
    }

    return payrolls;
  } catch (error) {
    console.log(error);
    return "Get Deductions Error";
  }
}

async function history(id) {
  try {
    const rows = await db.query(
      `SELECT id, SUM(gross_salary) AS totalGrossSalary, SUM(net_salary) AS totalEmployeeNetPay
      FROM employee_payroll
      WHERE employee_payroll.payroll_id = ${id}`
    );

    let payroll = helper.emptyOrRows(rows)[0];
    payroll.totalNetSalary = payroll.totalEmployeeNetPay;

    const rows2 = await db.query(
      `SELECT employee_payroll.id AS empPayrollId, employees.id AS empId, employees.name AS empName, employees.image AS empImg,
      employee_payroll.basic_salary AS basicSalary, employee_payroll.gross_salary AS grossSalary, 
      employee_payroll.net_salary AS netSalary
      FROM employee_payroll
      LEFT JOIN employees ON employee_payroll.employee_id = employees.id
      WHERE employee_payroll.payroll_id = ${id}`
    );

    payroll.employees = helper.emptyOrRows(rows2);

    for (let emp of payroll.employees) {
      const rows3 = await db.query(
        `SELECT contribution_type AS name, amount
        FROM employee_contributions
        WHERE emp_payroll_id = ${emp.empPayrollId}`
      );

      let items = helper.emptyOrRows(rows3);
      let totalAmount = items.reduce((previousValue, item) => {
        return previousValue + item.amount;
      }, 0);
      totalAmount = Math.ceil(totalAmount * 100) / 100;

      emp.contribution = {
        totalAmount,
        items
      }
    }

    for (let emp of payroll.employees) {
      const rows3 = await db.query(
        `SELECT contribution_type AS name, amount
        FROM employer_contributions
        WHERE emp_payroll_id = ${emp.empPayrollId}`
      );

      let items = helper.emptyOrRows(rows3);
      let totalAmount = items.reduce((previousValue, item) => {
        return previousValue + item.amount;
      }, 0);
      totalAmount = Math.ceil(totalAmount * 100) / 100;

      emp.employerCost = {
        totalAmount,
        items
      }
    }

    for (let emp of payroll.employees) {
      const rows3 = await db.query(
        `SELECT addition_types.addition_name AS name, additions.amount AS amount
        FROM additions
        LEFT JOIN addition_types ON additions.addition_type_id = addition_types.id
        WHERE additions.emp_payroll_id = ${emp.empPayrollId}`
      );

      let items = helper.emptyOrRows(rows3);
      let totalAmount = items.reduce((previousValue, item) => {
        return previousValue + item.amount;
      }, 0);
      totalAmount = Math.ceil(totalAmount * 100) / 100;

      emp.compensation = {
        totalAmount,
        items
      }
    }

    for (let emp of payroll.employees) {
      const rows3 = await db.query(
        `SELECT deduction_types.deduction_name AS name, deductions.amount AS amount
        FROM deductions
        LEFT JOIN deduction_types ON deductions.deduction_type_id = deduction_types.id
        WHERE deductions.emp_payroll_id = ${emp.empPayrollId}`
      );

      let items = helper.emptyOrRows(rows3);
      let totalAmount = items.reduce((previousValue, item) => {
        return previousValue + item.amount;
      }, 0);
      totalAmount = Math.ceil(totalAmount * 100) / 100;

      emp.deduction = {
        totalAmount,
        items
      }
    }

    payroll.totalDeduction = payroll.employees.reduce((previousValue, emp) => {
      return previousValue + emp.deduction.totalAmount;
    }, 0);
    payroll.totalContribution = payroll.employees.reduce((previousValue, emp) => {
      return previousValue + emp.contribution.totalAmount;
    }, 0);
    payroll.totalEmployerCost = payroll.employees.reduce((previousValue, emp) => {
      return previousValue + emp.employerCost.totalAmount;
    }, 0);
    payroll.totalSocsoPayment = payroll.employees.reduce((previousValue, emp) => {
      let employeeSocso;
      for (let item of emp.contribution.items) {
        if (item.name === "SOCSO") {
          employeeSocso = item.amount;
        }
      }
      let employerSocso;
      for (let item of emp.employerCost.items) {
        if (item.name === "SOCSO") {
          employerSocso = item.amount;
        }
      }
      return previousValue + employeeSocso + employerSocso;
    }, 0);
    payroll.totalEpfPayment = payroll.employees.reduce((previousValue, emp) => {
      let employeeEPF;
      for (let item of emp.contribution.items) {
        if (item.name === "EPF") {
          employeeEPF = item.amount;
        }
      }
      let employerEPF;
      for (let item of emp.employerCost.items) {
        if (item.name === "EPF") {
          employerEPF = item.amount;
        }
      }
      return previousValue + employeeEPF + employerEPF;
    }, 0);
    payroll.totalEisPayment = payroll.employees.reduce((previousValue, emp) => {
      let employeeEIS;
      for (let item of emp.contribution.items) {
        if (item.name === "EIS") {
          employeeEIS = item.amount;
        }
      }
      let employerEIS;
      for (let item of emp.employerCost.items) {
        if (item.name === "EIS") {
          employerEIS = item.amount;
        }
      }
      return previousValue + employeeEIS + employerEIS;
    }, 0);
    payroll.totalPayrollCost = payroll.totalEmployeeNetPay + payroll.totalSocsoPayment + payroll.totalEpfPayment + payroll.totalEisPayment;

    return payroll;
  } catch (error) {
    console.log(error);
    return "Get Deductions Error";
  }
}

module.exports = {
  getEmployees,
  getAdditions,
  getDeductions,
  run,
  allHistory,
  history,
}