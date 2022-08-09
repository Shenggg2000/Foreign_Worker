
import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import HistoryEmployeeList from './components/HistoryEmployeeList';
import "./styles.scss";

export default () => {
  const [payroll, setPayroll] = useState({});
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    let apiReturn = {
      id: 1,
      totalPayrollCost: 6974,
      totalEmployeeNetPay: 5426,
      totalEpfPayment: 1408,
      totalSocsoPayment: 80,
      totalGrossSalary: 6400,
      totalDeduction: 200,
      totalContribution: 774,
      totalNetSalary: 5426,
      totalEmployerCost: 774,
      employees: [
        {
          empName: "Ali",
          empImg: "https://i.pinimg.com/originals/10/c9/c0/10c9c02224ae9c08ba781bae2a856675.jpg",
          grossSalary: 3200,
          basicSalary: 3000,
          compensation: {
            totalAmount: 200,
            items: [
              {
                name: 'Bonus',
                amount: 200,
              }
            ]
          },
          deduction: {
            totalAmount: 100,
            items: [
              {
                name: 'Late',
                amount: 100,
              }
            ]
          },
          contribution: {
            totalAmount: 387,
            items: [
              {
                name: 'EPF',
                amount: 352,
              },
              {
                name: 'SOCSO',
                amount: 20,
              },
              {
                name: 'Other',
                amount: 15,
              }
            ]
          },
          netSalary: 2713,
          employerCost: {
            totalAmount: 387,
            items: [
              {
                name: 'EPF',
                amount: 352,
              },
              {
                name: 'SOCSO',
                amount: 20,
              },
              {
                name: 'Other',
                amount: 15,
              }
            ]
          },
        },
        {
          empName: "Abi",
          empImg: "https://i.pinimg.com/originals/10/c9/c0/10c9c02224ae9c08ba781bae2a856675.jpg",
          grossSalary: 3200,
          basicSalary: 3000,
          compensation: {
            totalAmount: 200,
            items: [
              {
                name: 'Bonus',
                amount: 200,
              }
            ]
          },
          deduction: {
            totalAmount: 100,
            items: [
              {
                name: 'Late',
                amount: 100,
              }
            ]
          },
          contribution: {
            totalAmount: 387,
            items: [
              {
                name: 'EPF',
                amount: 352,
              },
              {
                name: 'SOCSO',
                amount: 20,
              },
              {
                name: 'Other',
                amount: 15,
              }
            ]
          },
          netSalary: 2713,
          employerCost: {
            totalAmount: 387,
            items: [
              {
                name: 'EPF',
                amount: 352,
              },
              {
                name: 'SOCSO',
                amount: 20,
              },
              {
                name: 'Other',
                amount: 15,
              }
            ]
          },
        },
      ],
    };
    setPayroll(apiReturn);
    setEmployeeList(apiReturn.employees);
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
                  <p className='mb-0 fw-bolder'>RM {payroll.totalPayrollCost}</p>
                </div>
              </Col>
              <Col md={3} xs={12} className="mb-3">
                <div className='p-3 rounded payroll-detail'>
                  <p className='mb-1 card-title'>Total Employee Net Pay</p>
                  <p className='mb-0 fw-bolder'>RM {payroll.totalEmployeeNetPay}</p>
                </div>
              </Col>
              <Col md={3} xs={12} className="mb-3">
                <div className='p-3 rounded payroll-detail'>
                  <p className='mb-1 card-title'>Total EPF Payment</p>
                  <p className='mb-0 fw-bolder'>RM {payroll.totalEpfPayment}</p>
                </div>
              </Col>
              <Col md={3} xs={12} className="mb-3">
                <div className='p-3 rounded payroll-detail'>
                  <p className='mb-1 card-title'>Total SOCSO Payment</p>
                  <p className='mb-0 fw-bolder'>RM {payroll.totalSocsoPayment}</p>
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
                    <p className='mb-0 fw-bolder'>RM {payroll.totalGrossSalary}</p>
                  </div>
                  <div className='cost'>
                    <p className='mb-0 card-title'>Deduction</p>
                    <p className='mb-0 fw-bolder'>RM {payroll.totalDeduction}</p>
                  </div>
                  <div className='cost'>
                    <p className='mb-0 card-title'>Contribution</p>
                    <p className='mb-0 fw-bolder'>RM {payroll.totalContribution}</p>
                  </div>
                  <div className='cost'>
                    <p className='mb-0 card-title'>Net Salary</p>
                    <p className='mb-0 fw-bolder'>RM {payroll.totalNetSalary}</p>
                  </div>
                  <div className='cost'>
                    <p className='mb-0 card-title'>Employer Cost</p>
                    <p className='mb-0 fw-bolder'>RM {payroll.totalEmployerCost}</p>
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
