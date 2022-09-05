
import React, { useState } from 'react';
import { Row, Col, Card, Button } from '@themesberg/react-bootstrap';
import PayrollRun1 from './PayrollRun1';
import PayrollRun2 from './PayrollRun2';
import { usePayroll } from './contexts/PayrollContext';
import useToken from '../useToken';
import { useHistory } from "react-router-dom";
import "./styles.scss";

export default (props) => {
  const [isStage1, setIsStage1] = useState(true);
  const payroll = usePayroll();
  const { token } = useToken();
  const history = useHistory();

  function changeStage() {
    setIsStage1(prevIsStage1 => !prevIsStage1)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(payroll)
    }
    fetch('http://localhost:3001/api/payroll/run', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          history.push("/payroll/history/view/" + data.data.id);
        }
      });
  }

  const currentYear = () => {
    let timestampToDate = new Date();
    return timestampToDate.getFullYear();
  }

  const currentMonth = () => {
    let timestampToDate = new Date();
    return timestampToDate.toLocaleString('default', { month: 'long' });
  }

  const currentDate = () => {
    let timestampToDate = new Date();
    return timestampToDate.getDate();
  }

  return (
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <div className='d-flex justify-content-between mb-3'>
              <div>
                <h1 className="fs-4 fw-bold">Run Payroll for {currentMonth()} {currentYear()}</h1>
                <p className='text-light m-0'>created on {currentDate()} {currentMonth()}, {currentYear()}</p>
              </div>
              <div>
                {
                  isStage1 ?
                    <Button onClick={changeStage} variant="secondary" className="">Confirm Payroll</Button>
                    :
                    <>
                      <Button onClick={changeStage} variant="lighten" className="me-3">Back</Button>
                      <Button onClick={onSubmit} variant="secondary" className="">Run Payroll</Button>
                    </>
                }
              </div>
            </div>
            <div className='w-100'>
              {
                isStage1 ?
                  <PayrollRun1></PayrollRun1>
                  :
                  <PayrollRun2></PayrollRun2>
              }
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
