import React, { useState, useEffect } from 'react';
import { usePayroll, usePayrollUpdate } from './contexts/PayrollContext';
import { Row, Col } from '@themesberg/react-bootstrap';
import RunEmployeeList from './components/RunEmployeeList';
import useToken from '../useToken';

export default () => {
  const payroll = usePayroll();
  const { token } = useToken();

  const [compensationTypeList, setCompensationTypeList] = useState([]);
  const [deductionTypeList, setDeductionTypeList] = useState([]);

  useEffect(() => {
    getAdditionList();
    getDeductionList();
  }, []);

  const getAdditionList = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch('http://localhost:3001/api/payroll/getadditions', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setCompensationTypeList(data.data);
        }
      });
  }

  const getDeductionList = () => {
    const requestOptions2 = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch('http://localhost:3001/api/payroll/getdeductions', requestOptions2)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setDeductionTypeList(data.data);
        }
      });
  }

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