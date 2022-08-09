import React, { useState, useEffect } from 'react';
import { usePayroll, usePayrollUpdate } from './contexts/PayrollContext';
import { Row, Col } from '@themesberg/react-bootstrap';
import RunEmployeeList from './components/RunEmployeeList';

export default () => {
  const payroll = usePayroll();
  const payrollUpdate = usePayrollUpdate();

  const [compensationTypeList, setCompensationTypeList] = useState([]);
  const [deductionTypeList, setDeductionTypeList] = useState([]);

  useEffect(() => {
    let apiReturn = [
      {
        id: 1,
        name: "Bonus A",
      },
      {
        id: 2,
        name: "Bonus B",
      },
    ];
    let apiReturn2 = [
      {
        id: 1,
        name: "Deduction A",
      },
      {
        id: 2,
        name: "Deduction B",
      },
    ];
    setCompensationTypeList(apiReturn);
    setDeductionTypeList(apiReturn2);
  }, []);

  const countOptInEmployees = () => {
    return payroll.employees.reduce((count, emp)=> {
      return emp.optIn ? ++count : count;
    },0)
  }

  return (
    <>
      <Row>
        <Col xs={12}>
          <div className='thead d-flex px-3 py-2 rounded'>
            <div className='opt-column'>
            </div>
            <div className='flex-grow-1'>
              <p className='mb-0 card-title'>Employees</p>
              <p className='mb-0 fw-bolder'>{countOptInEmployees()}/{payroll.employees.length}</p>
            </div>
            <div className='cost'>
              <p className='mb-0 card-title'>Gross Salary</p>
              <p className='mb-0 fw-bolder'>RM {payroll.totalGrossSalary == 0 ? 0 : Number(payroll.totalGrossSalary).toFixed(2)}</p>
            </div>
            <div className='cost'>
              <p className='mb-0 card-title'>Deduction</p>
              <p className='mb-0 fw-bolder'>RM {payroll.totalDeduction == 0 ? 0 : Number(payroll.totalDeduction).toFixed(2)}</p>
            </div>
            <div className='cost'>
              <p className='mb-0 card-title'>Contribution</p>
              <p className='mb-0 fw-bolder'>RM {payroll.totalContribution == 0 ? 0 : Number(payroll.totalContribution).toFixed(2)}</p>
            </div>
            <div className='cost'>
              <p className='mb-0 card-title'>Net Salary</p>
              <p className='mb-0 fw-bolder'>RM {payroll.totalNetSalary == 0 ? 0 : Number(payroll.totalNetSalary).toFixed(2)}</p>
            </div>
            <div className='cost'>
              <p className='mb-0 card-title'>Employer Cost</p>
              <p className='mb-0 fw-bolder'>RM {payroll.totalEmployerCost == 0 ? 0 : Number(payroll.totalEmployerCost).toFixed(2)}</p>
            </div>
            <div className='dropdown-column'>
            </div>
          </div>
          <div>
            {
              payroll.employees.map((emp) => {
                return (
                  <RunEmployeeList key={emp.empId} emp={emp} compensationTypeList={compensationTypeList} deductionTypeList={deductionTypeList} />
                )
              })
            }
          </div>
        </Col>
      </Row>
    </>
  )
}