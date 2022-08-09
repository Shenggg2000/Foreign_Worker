import React, { useContext, useState, useEffect } from 'react';
import { calculateSocso } from '../utils/SocsoCalculation';
import { calculateEis } from '../utils/EisCalculation';

const PayrollContext = React.createContext();
const PayrollUpdateContext = React.createContext();

export function usePayroll() {
  return useContext(PayrollContext);
}

export function usePayrollUpdate() {
  return useContext(PayrollUpdateContext)
}

export function PayrollProvider({ children }) {
  const [payroll, setPayroll] = useState({
    employees: [],
    totalGrossSalary: 0,
    totalDeduction: 0,
    totalContribution: 0,
    totalNetSalary: 0,
    totalEmployerCost: 0
  });

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
    }
  }

  useEffect(() => {
    let apiReturn = [
      {
        empId: 1,
        empName: "Ali",
        empImg: "https://i.pinimg.com/originals/10/c9/c0/10c9c02224ae9c08ba781bae2a856675.jpg",
        basicSalary: 3000,
        compensation: {
          totalAmount: 0,
          items: []
        },
        deduction: {
          totalAmount: 0,
          items: []
        },
        contributionOption: {
          pcbNeeded: false,
          eisNeeded: true,
          epfNeeded: true,
          employeeRate: 0.11,
          employerRate: 0.13,
          isSocsoCategory1: false,
        },
      },
      {
        empId: 2,
        empName: "Abi",
        empImg: "https://i.pinimg.com/originals/10/c9/c0/10c9c02224ae9c08ba781bae2a856675.jpg",
        basicSalary: 3000,
        compensation: {
          totalAmount: 0,
          items: []
        },
        deduction: {
          totalAmount: 0,
          items: []
        },
        contributionOption: {
          pcbNeeded: false,
          eisNeeded: true,
          epfNeeded: true,
          employeeRate: 0.11,
          employerRate: 0.13,
          isSocsoCategory1: false,
        },
      },
    ];
    let calculatedPayroll = calculatePayroll(apiReturn);
    setPayroll(calculatedPayroll);
  }, []);

  function calculatePayroll(emps) {
    let employees = emps.map((emp) => {
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
      if(emp.optIn){
        total = total + emp.contribution.items[0].amount + emp.employerCost.items[0].amount;
      }
      return total;
    }, 0);
    let totalSocso = employees.reduce((total, emp) => {
      if(emp.optIn){
        total = total + emp.contribution.items[1].amount + emp.employerCost.items[1].amount;
      }
      return total;
    }, 0);
    let totalEis = employees.reduce((total, emp) => {
      if(emp.optIn){
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
        {children}
      </PayrollUpdateContext.Provider>
    </PayrollContext.Provider>
  )
}
