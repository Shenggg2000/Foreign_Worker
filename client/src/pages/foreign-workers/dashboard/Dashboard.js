
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button, ButtonGroup, Dropdown, Image } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown, faChevronRight, faHandHoldingUsd, faUserFriends, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Progress from '../../../components/Progress';
import useToken from '../useToken';
import { useHistory } from "react-router-dom";
import "./styles.scss";
import ExpireList from './components/ExpireList';

export default (props) => {
  const { token } = useToken();
  const history = useHistory();
  const [company, setCompany] = useState({
    name: "",
    value: 100,
  });
  const [payrollRunable, setPayrollRunable] = useState(false);
  const [info, setInfo] = useState({
    empCount: 1,
    payrollCount: 1,
    dayCount: 1,
  });
  const [expireType, setExpireType] = useState("Permit Expire");
  const [dayRange, setDayRange] = useState(30);
  const [expireEmp, setExpireEmp] = useState([]);
  const hiCard = useRef(null);
  const payrollCard = useRef(null);
  const reminderHeader = useRef(null);
  const colourfulComponents = useRef(null);

  const goSetting = (e) => {
    history.push("/setting");
  }

  const goPayroll = (e) => {
    history.push("/payroll/run");
  }

  useEffect(() => {
    getCompany();
    getPayrollRunable();
    getInfo();
  }, [])

  useEffect(() => {
    getExpireList();
  }, [dayRange, expireType])

  const getCompany = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    fetch('http://localhost:3001/api/dashboard/company', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setCompany(data.data);
        }
      });
  }

  const getPayrollRunable = () => {
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
          if (data.data.paid) {
            setPayrollRunable(false);
          } else {
            setPayrollRunable(true);
          }
        }
      });
  }

  const getInfo = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    fetch('http://localhost:3001/api/dashboard/info', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setInfo(data.data);
        }
      });
  }

  const getExpireList = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ expireType, dayRange })
    };
    fetch('http://localhost:3001/api/dashboard/expireList', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setExpireEmp(data.data);
        }
      });
  }

  const calculateHeight = () => {
    let height = hiCard.current?.clientHeight + 24 + payrollCard.current?.clientHeight - colourfulComponents.current?.clientHeight - 24 - reminderHeader.current?.clientHeight;
    if (height) {
      return { height };
    }
    return {};
  }

  return (
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <div className='d-flex justify-content-between mb-3'>
              <h1 className="fs-4 fw-bold">Dashboard</h1>
            </div>
            <Row>
              <Col xs={12} md={4} >
                <div ref={hiCard} className='w-100 mb-4 rounded hi-card'>
                  <h1 className="fs-3 fw-7 text-truncate mb-4">👋, {company.name}</h1>
                  <p>{company.value < 100 ? "You haven't complete your company information yet." : "your company information is complete."}</p>
                  <div className="mb-4">
                    <Progress variant="tertiary" label="Your Progress" size="md" value={company.value} />
                  </div>
                  <Button onClick={goSetting} variant="secondary" className="w-100">Go Setting</Button>
                </div>
                <div ref={payrollCard} id='payroll-card' className='w-100 rounded payroll-card'>
                  <h1 className="fs-4 fw-bold mb-4">Payroll</h1>
                  <p>{payrollRunable ? `You haven't run your ${"S"} payroll yet.` : `You have run your ${"S"} payroll.`}</p>
                  <Button onClick={goPayroll} variant="secondary" className="w-100">{payrollRunable ? `Run Payroll` : `View History`}</Button>
                </div>
              </Col>
              <Col xs={12} md={8} >
                <div className='mx-2'>
                  <div className='border-bottom-eee'>
                    <div ref={reminderHeader} className='d-flex align-items-center mb-4'>
                      <h1 className="fs-4 fw-bold mb-0 flex-grow-2">Reminder</h1>
                      <div className='me-4'>
                        <Dropdown as={ButtonGroup} onSelect={(e) => {
                          setExpireType(e);
                        }}>
                          <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0 d-flex align-items-center">
                            <p className='mb-0 fw-bold text-secondary'>{expireType} <span className="ms-2 icon icon-small"><FontAwesomeIcon icon={faChevronDown} /></span></p>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu-right" >
                            <Dropdown.Item className="d-flex fw-bold" eventKey="Permit Expire">
                              Permit Expire
                              {
                                expireType === "Permit Expire" &&
                                <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                              }
                            </Dropdown.Item>
                            <Dropdown.Item className="fw-bold" eventKey="Health Examination Expire">Health Examination Expire
                              {
                                expireType === "Health Examination Expire" &&
                                <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                              }
                            </Dropdown.Item>
                            <Dropdown.Item className="fw-bold" eventKey="Passport Expire">Passport Expire
                              {
                                expireType === "Passport Expire" &&
                                <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                              }
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div>
                        <Dropdown as={ButtonGroup} onSelect={(e) => {
                          setDayRange(parseInt(e));
                        }}>
                          <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0 d-flex align-items-center">
                            <p className='mb-0 fw-bold text-secondary'>{dayRange} days <span className="ms-2 icon icon-small"><FontAwesomeIcon icon={faChevronDown} /></span></p>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu-right short" >
                            <Dropdown.Item className="fw-bold" eventKey="7">
                              7 days
                              {
                                dayRange === 7 &&
                                <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                              }
                            </Dropdown.Item>
                            <Dropdown.Item className="d-flex fw-bold" eventKey="30">
                              30 days
                              {
                                dayRange === 30 &&
                                <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                              }
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className='reminder-container' style={calculateHeight()}>
                      {
                        expireEmp.length > 0 ? 
                        expireEmp.map((emp) => {
                          return (
                            <ExpireList key={emp.id} emp={emp} expireType={expireType} />
                          )
                        }):
                        <p>No Employee {expireType} in {dayRange} days</p>
                      }
                    </div>
                  </div>
                  <Row ref={colourfulComponents}>
                    <Col xs={12} md={4} >
                      <div className='w-100 mt-4 rounded emp-component p-4 d-flex align-items-center'>
                        <div className='icon ys-icon me-3'>
                          <FontAwesomeIcon icon={faUserFriends} />
                        </div>
                        <div className='flex-grow-2 d-flex flex-column'>
                          <h1 className='fs-5 fw-7 mb-0'>{info.empCount}</h1>
                          <p className='mb-0 fw-bold'>Employees</p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={4} >
                      <div className='w-100 mt-4 rounded payroll-component p-4 d-flex align-items-center'>
                        <div className='icon ys-icon me-3'>
                          <FontAwesomeIcon icon={faHandHoldingUsd} />
                        </div>
                        <div className='flex-grow-2 d-flex flex-column'>
                          <h1 className='fs-5 fw-7 mb-0'>{info.payrollCount}</h1>
                          <p className='mb-0 fw-bold'>Payrolls</p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={4} >
                      <div className='w-100 mt-4 rounded start-component p-4 d-flex align-items-center'>
                        <div className='icon ys-icon me-3'>
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </div>
                        <div className='flex-grow-2 d-flex flex-column'>
                          <h1 className='fs-5 fw-7 mb-0'>{info.dayCount}</h1>
                          <p className='mb-0 fw-bold'>Days used</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}


