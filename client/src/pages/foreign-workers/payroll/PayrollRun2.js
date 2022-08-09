import React from 'react';
import { usePayroll, usePayrollUpdate } from './contexts/PayrollContext';
import { Row, Col } from '@themesberg/react-bootstrap';
import RunEmployeeList2 from './components/RunEmployeeList2';

export default () => {
  const payroll = usePayroll();
  const payrollUpdate = usePayrollUpdate();

  const countOptInEmployees = () => {
    return payroll.employees.reduce((count, emp) => {
      return emp.optIn ? ++count : count;
    }, 0)
  }

  return (
    <>
      <Row>
        <Col xs={12}>
          <div className='thead d-flex px-3 py-2 rounded'>
            <div className='flex-grow-1'>
              <p className='mb-0 card-title'>Employees</p>
              <p className='mb-0 fw-bolder'>{countOptInEmployees()}</p>
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
          </div>
          <div>
            {
              payroll.employees.map((emp) => {
                return (
                  <RunEmployeeList2 key={emp.empId} emp={emp} />
                )
              })
            }
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className='payroll-summary pt-4 px-3'>
            <p className="fs-6 fw-bold mb-3">Summary of Total Cost to Employer</p>
            <div className='d-flex justify-content-between mb-3'>
              <p className='mb-0'>Total Employees Net Pay</p>
              <p className='mb-0 fw-bold'>RM {payroll.totalNetSalary == 0 ? 0 : Number(payroll.totalNetSalary).toFixed(2)}</p>
            </div>
            <div className='d-flex justify-content-between mb-3'>
              <p className='mb-0'>Total EPF Payment</p>
              <p className='mb-0 fw-bold'>RM {payroll.totalEpf == 0 ? 0 : Number(payroll.totalEpf).toFixed(2)}</p>
            </div>
            <div className='d-flex justify-content-between mb-3'>
              <p className='mb-0'>Total SOCSO Payment</p>
              <p className='mb-0 fw-bold '>RM {payroll.totalSocso == 0 ? 0 : Number(payroll.totalSocso).toFixed(2)}</p>
            </div>
            <div className='d-flex justify-content-between mb-3'>
              <p className='mb-0'>Total EIS Payment</p>
              <p className='mb-0 fw-bold'>RM {payroll.totalEis == 0 ? 0 : Number(payroll.totalEis).toFixed(2)}</p>
            </div>
            <div className='d-flex justify-content-between mb-3'>
              <p className='mb-0 fw-bold'>Grand Total for Employer</p>
              <p className='mb-0 fw-bold'>RM {payroll.grandTotal == 0 ? 0 : Number(payroll.grandTotal).toFixed(2)}</p>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
