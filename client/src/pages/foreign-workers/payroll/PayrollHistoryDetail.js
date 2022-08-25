
import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import HistoryEmployeeList from './components/HistoryEmployeeList';
import useToken from '../useToken';
import "./styles.scss";

export default (props) => {
  const [payroll, setPayroll] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const { token } = useToken();

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    fetch('http://localhost:3001/api/payroll/history/' + props.match.params.id, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setPayroll(data.data);
          setEmployeeList(data.data.employees);
        }
      });

  }, [])

  return (
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <div>
                <h1 className="fs-4 fw-bold">Payroll for July 2022</h1>
                <p className='text-light m-0'>created on 13 July, 2022</p>
              </div>
              <div>
                <p className='text-primary mb-0 me-2'><FontAwesomeIcon icon={faDownload} className="me-2" /> Export</p>
              </div>
            </div>
            <Row>
              <Col md={3} xs={12} className="mb-3">
                <div className='p-3 rounded payroll-detail'>
                  <p className='mb-1 card-title'>Total Payroll Cost</p>
                  <p className='mb-0 fw-bolder'>RM {payroll.totalPayrollCost == 0 ? 0 : Number(payroll.totalPayrollCost).toFixed(2)}</p>
                </div>
              </Col>
              <Col md={3} xs={12} className="mb-3">
                <div className='p-3 rounded payroll-detail'>
                  <p className='mb-1 card-title'>Total Employee Net Pay</p>
                  <p className='mb-0 fw-bolder'>RM {payroll.totalEmployeeNetPay == 0 ? 0 : Number(payroll.totalEmployeeNetPay).toFixed(2)}</p>
                </div>
              </Col>
              <Col md={3} xs={12} className="mb-3">
                <div className='p-3 rounded payroll-detail'>
                  <p className='mb-1 card-title'>Total EPF Payment</p>
                  <p className='mb-0 fw-bolder'>RM {payroll.totalEpfPayment == 0 ? 0 : Number(payroll.totalEpfPayment).toFixed(2)}</p>
                </div>
              </Col>
              <Col md={3} xs={12} className="mb-3">
                <div className='p-3 rounded payroll-detail'>
                  <p className='mb-1 card-title'>Total SOCSO Payment</p>
                  <p className='mb-0 fw-bolder'>RM {payroll.totalSocsoPayment == 0 ? 0 : Number(payroll.totalSocsoPayment).toFixed(2)}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className='thead d-flex px-3 py-2 rounded'>
                  <div className='flex-grow-1'>
                    <p className='mb-0 card-title'>Employees</p>
                    <p className='mb-0 fw-bolder'>2</p>
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
                    employeeList.map((emp) => {
                      return (
                        <HistoryEmployeeList key={emp.empName} emp={emp} />
                      )
                    })
                  }
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row >
  );
}
