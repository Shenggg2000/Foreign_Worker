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
  const [payroll, setPayroll] = useState({});

  function updatePayroll(text) {
    console.log(text);
    // setPayroll(newPayroll);
  }

  useEffect(() => {
    let apiReturn = [
      {
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
        contribution: {
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

  function calculatePayroll(employees) {
    return employees.map((emp) => {
      // grossSalary
      let grossSalary = emp.basicSalary + emp.compensation.totalAmount - emp.deduction.totalAmount;
      // all contribution
      let { employeeSocso, employerSocso } = calculateSocso(emp.basicSalary, emp.contribution.isSocsoCategory1)
      let employeeEpf, employerEpf;
      if (emp.contribution.epfNeeded) {
        employeeEpf = grossSalary * emp.contribution.employeeRate;
        employerEpf = grossSalary * emp.contribution.employerRate;
      }
      let employeeEis, employerEis;
      if (emp.contribution.eisNeeded) {
        employeeEis = employerEis = calculateEis(emp.basicSalary);
      }
      let netSalary = grossSalary - employeeSocso - employeeEis - employeeEpf;
      let contribution = {
        totalAmount:  employeeSocso + employeeEis + employeeEpf,
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
        totalAmount:  employerSocso + employerEis + employerEpf,
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

      return { ...emp, grossSalary, contribution, netSalary, employerCost }
    })
  }

  return (
    <PayrollContext.Provider value={payroll}>
      <PayrollUpdateContext.Provider value={updatePayroll}>
        {children}
      </PayrollUpdateContext.Provider>
    </PayrollContext.Provider>
  )
}
