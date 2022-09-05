
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
  const [company, setCompany] = useState({
    address_city: "",
    address_post_code: "",
    address_state: "",
    address_street: "",
    contact: "",
    employer_email: "",
    employer_id: "",
    employer_name: "",
    epf_no: "",
    logo: "",
    reg_no: "",
    socso_no: "",
  });

  const getEmployer = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      // body: JSON.stringify({})
    };
    fetch('http://localhost:3001/api/auth/user', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          let info = data.data.result
          console.log(info + "123");
          setCompany({
            address_city: detectIsNull(info.address_city),
            address_post_code: detectIsNull(info.address_post_code),
            address_state: detectIsNull(info.address_state),
            address_street: detectIsNull(info.address_street),
            contact: detectIsNull(info.contact),
            employer_email: detectIsNull(info.employer_email),
            employer_id: info.employer_id,
            employer_name: info.employer_name,
            epf_no: detectIsNull(info.epf_no),
            logo: detectIsNull(info.logo),
            reg_no: detectIsNull(info.reg_no),
            socso_no: detectIsNull(info.socso_no),
          });
        }
      });
  }

  const detectIsNull = (str) => {
    if (!str) {
      return "";
    } else if (str === "null" || str === "NULL") {
      return "";
    }
    return str;
  }

  const getHistory = () => {
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
  }
  
  useEffect(() => {
    getHistory();
    getEmployer();
  }, [])

  const timestampToYear = (timestamp) => {
    let timestampToDate = new Date(parseInt(timestamp) * 1000);
    return timestampToDate.getFullYear();
  }

  const timestampToMonth = (timestamp) => {
    let timestampToDate = new Date(parseInt(timestamp) * 1000);
    return timestampToDate.toLocaleString('default', { month: 'long' });
  }

  const timestampToDate = (timestamp) => {
    let timestampToDate = new Date(parseInt(timestamp) * 1000);
    return timestampToDate.getDate();
  }

  return (
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <div>
                <h1 className="fs-4 fw-bold">Payroll for {timestampToMonth(payroll.timestamp)} {timestampToYear(payroll.timestamp)}</h1>
                <p className='text-light m-0'>created on {timestampToDate(payroll.timestamp)} {timestampToMonth(payroll.timestamp)}, {timestampToYear(payroll.timestamp)}</p>
              </div>
              {/* <div>
                <p className='text-primary mb-0 me-2'><FontAwesomeIcon icon={faDownload} className="me-2" /> Export</p>
              </div> */}
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
                        <HistoryEmployeeList key={emp.empName} emp={emp} company={company} month={timestampToMonth(payroll.timestamp)} year={timestampToYear(payroll.timestamp)}/>
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
