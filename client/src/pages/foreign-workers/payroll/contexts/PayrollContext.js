import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Card, Button } from '@themesberg/react-bootstrap';
import { calculateSocso } from '../utils/SocsoCalculation';
import { calculateEis } from '../utils/EisCalculation';
import { useHistory } from "react-router-dom";
import useToken from '../../useToken';

const PayrollContext = React.createContext();
const PayrollUpdateContext = React.createContext();

export function usePayroll() {
  return useContext(PayrollContext);
}

export function usePayrollUpdate() {
  return useContext(PayrollUpdateContext)
}

export function PayrollProvider({ children }) {
  const history = useHistory();
  const { token } = useToken();
  const [runable, setRunable] = useState(true);
  const [payroll, setPayroll] = useState({
    employees: [],
    totalGrossSalary: 0,
    totalDeduction: 0,
    totalContribution: 0,
    totalNetSalary: 0,
    totalEmployerCost: 0
  });

  useEffect(() => {
    getRunable();
  }, []);

  const getRunable = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    fetch('http://localhost:3001/api/payroll/runable', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setRunable(!data.data.paid);
          if (!data.data.paid) {
            getEmployee();
          }
        }
      });
  }

  const getEmployee = () => {
    let apiReturn = null;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    fetch('http://localhost:3001/api/payroll/getemployees', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          apiReturn = data.data;
          let calculatedPayroll = calculatePayroll(apiReturn);
          setPayroll(calculatedPayroll);
        }
      });
  }

  function updatePayroll(updateInfo) {
    if (updateInfo.action === "check-update") {
      let employees = JSON.parse(JSON.stringify(payroll.employees));
      for (let emp of employees) {
        if (emp.empId == updateInfo.empId) {
          emp.optIn = updateInfo.value;
        }
      }
      let calculatedPayroll = calculatePayroll(employees);
      setPayroll(calculatedPayroll);
    } else if (updateInfo.action === "add-compensation") {
      let employees = JSON.parse(JSON.stringify(payroll.employees));
      for (let emp of employees) {
        if (emp.empId == updateInfo.empId) {
          let amount = parseFloat(parseFloat(updateInfo.value.addCompensationAmount).toFixed(2));
          emp.compensation.totalAmount += amount;
          emp.compensation.items.push({ id: updateInfo.value.addCompensationType, amount });
        }
      }
      let calculatedPayroll = calculatePayroll(employees);
      setPayroll(calculatedPayroll);
    } else if (updateInfo.action === "add-deduction") {
      let employees = JSON.parse(JSON.stringify(payroll.employees));
      for (let emp of employees) {
        if (emp.empId == updateInfo.empId) {
          let amount = parseFloat(parseFloat(updateInfo.value.addDeductionAmount).toFixed(2));
          emp.deduction.totalAmount += amount;
          emp.deduction.items.push({ id: updateInfo.value.addDeductionType, amount });
        }
      }
      let calculatedPayroll = calculatePayroll(employees);
      setPayroll(calculatedPayroll);
    } else if (updateInfo.action === "del-compensation") {
      let employees = JSON.parse(JSON.stringify(payroll.employees));
      for (let emp of employees) {
        if (emp.empId == updateInfo.empId) {
          if (emp.compensation.items.length == 1) {
            emp.compensation.totalAmount = 0;
            emp.compensation.items = [];
          } else {
            let amount = emp.compensation.items[updateInfo.index].amount;
            emp.compensation.totalAmount -= amount;
            emp.compensation.items.splice(updateInfo.index, 1);
          }
        }
      }
      let calculatedPayroll = calculatePayroll(employees);
      setPayroll(calculatedPayroll);
    } else if (updateInfo.action === "del-deduction") {
      let employees = JSON.parse(JSON.stringify(payroll.employees));
      for (let emp of employees) {
        if (emp.empId == updateInfo.empId) {
          if (emp.deduction.items.length == 1) {
            emp.deduction.totalAmount = 0;
            emp.deduction.items = [];
          } else {
            let amount = emp.deduction.items[updateInfo.index].amount;
            emp.deduction.totalAmount -= amount;
            emp.deduction.items.splice(updateInfo.index, 1);
          }
        }
      }
      let calculatedPayroll = calculatePayroll(employees);
      setPayroll(calculatedPayroll);
    } else if (updateInfo.action === "update-salary-frequent") {
      let employees = JSON.parse(JSON.stringify(payroll.employees));
      for (let emp of employees) {
        if (emp.empId == updateInfo.empId) {
          if (emp.salaryFrequency === "daily") {
            emp.dayWorked = updateInfo.value.workUnit;
          } else if (emp.salaryFrequency === "hourly") {
            emp.hourWorked = updateInfo.value.workUnit;
          }
        }
      }
      let calculatedPayroll = calculatePayroll(employees);
      setPayroll(calculatedPayroll);
    }
  }

  function calculatePayroll(emps) {
    let employees = emps.map((emp) => {
      if (emp.salaryFrequency === "monthly") {
        emp.basicSalary = emp.basicSalaryBasedOnUnit;
      } else if (emp.salaryFrequency === "daily") {
        emp.basicSalary = emp.basicSalaryBasedOnUnit * emp.dayWorked;
      } else if (emp.salaryFrequency === "hourly") {
        emp.basicSalary = emp.basicSalaryBasedOnUnit * emp.hourWorked;
      }
      // grossSalary
      let grossSalary = emp.basicSalary + emp.compensation.totalAmount - emp.deduction.totalAmount;
      // all contribution
      let { employeeSocso, employerSocso } = calculateSocso(emp.basicSalary, emp.contributionOption.isSocsoCategory1)
      let employeeEpf, employerEpf;
      if (emp.contributionOption.epfNeeded) {
        employeeEpf = grossSalary * emp.contributionOption.employeeRate;
        employerEpf = grossSalary * emp.contributionOption.employerRate;
      }
      let employeeEis, employerEis;
      if (emp.contributionOption.eisNeeded) {
        employeeEis = employerEis = calculateEis(emp.basicSalary);
      }
      let netSalary = grossSalary - employeeSocso - employeeEis - employeeEpf;
      let contribution = {
        totalAmount: employeeSocso + employeeEis + employeeEpf,
        items: [
          {
            name: 'EPF',
            amount: employeeEpf,
          },
          {
            name: 'SOCSO',
            amount: employeeSocso,
          },
          {
            name: 'EIS',
            amount: employeeEis,
          }
        ]
      };
      let employerCost = {
        totalAmount: employerSocso + employerEis + employerEpf,
        items: [
          {
            name: 'EPF',
            amount: employerEpf,
          },
          {
            name: 'SOCSO',
            amount: employerSocso,
          },
          {
            name: 'EIS',
            amount: employerEis,
          }
        ]
      };
      let optIn = emp.optIn != undefined ? emp.optIn : true;

      return { ...emp, grossSalary, contribution, netSalary, employerCost, optIn }
    })
    let totalGrossSalary = employees.reduce((total, emp) => {
      return emp.optIn ? total + emp.grossSalary : total;
    }, 0);
    let totalDeduction = employees.reduce((total, emp) => {
      return emp.optIn ? total + emp.deduction.totalAmount : total;
    }, 0);
    let totalContribution = employees.reduce((total, emp) => {
      return emp.optIn ? total + emp.contribution.totalAmount : total;
    }, 0);
    let totalNetSalary = employees.reduce((total, emp) => {
      return emp.optIn ? total + emp.netSalary : total;
    }, 0);
    let totalEmployerCost = employees.reduce((total, emp) => {
      return emp.optIn ? total + emp.employerCost.totalAmount : total;
    }, 0);
    let totalEpf = employees.reduce((total, emp) => {
      if (emp.optIn) {
        total = total + emp.contribution.items[0].amount + emp.employerCost.items[0].amount;
      }
      return total;
    }, 0);
    let totalSocso = employees.reduce((total, emp) => {
      if (emp.optIn) {
        total = total + emp.contribution.items[1].amount + emp.employerCost.items[1].amount;
      }
      return total;
    }, 0);
    let totalEis = employees.reduce((total, emp) => {
      if (emp.optIn) {
        total = total + emp.contribution.items[2].amount + emp.employerCost.items[2].amount;
      }
      return total;
    }, 0);
    let grandTotal = totalNetSalary + totalEpf + totalSocso + totalEis;
    return { totalGrossSalary, totalDeduction, totalContribution, totalNetSalary, totalEmployerCost, totalEpf, totalSocso, totalEis, grandTotal, employees }
  }

  return (
    <PayrollContext.Provider value={payroll}>
      <PayrollUpdateContext.Provider value={updatePayroll}>
        {runable ? children :
          <Row>
            <Col xs={12} className="p-3">
              <Card>
                <Card.Body>
                  <div className='w-100'>
                    <div className='d-flex flex-column justify-content-between align-items-center py-6'>
                      <h1 className="fs-4 fw-bold mb-3">You can run payroll once a month only.</h1>
                      <Button onClick={() => {
                        history.push("/payroll/history");
                      }} variant="secondary" className="">Go To History</Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        }
      </PayrollUpdateContext.Provider>
    </PayrollContext.Provider>
  )
}
