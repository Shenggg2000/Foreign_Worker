
import React, { useState } from 'react';
import { Row, Col, Card, Button } from '@themesberg/react-bootstrap';
import { PayrollProvider } from './contexts/PayrollContext';
import PayrollRun1 from './PayrollRun1';
import PayrollRun2 from './PayrollRun2';
import "./styles.scss";

export default () => {
  const [isStage1, setIsStage1] = useState(true);

  function changeStage() {
    setIsStage1(prevIsStage1 => !prevIsStage1)
  }

  return (
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <div className='d-flex justify-content-between mb-3'>
              <div>
                <h1 className="fs-4 fw-bold">Run Payroll for July 2022</h1>
                <p className='text-light m-0'>created on 13 July, 2022</p>
              </div>
              <div>
                {
                  isStage1 ?
                    <Button onClick={changeStage} variant="secondary" className="">Confirm Payroll</Button>
                    :
                    <>
                      <Button onClick={changeStage} variant="lighten" className="me-3">Back</Button>
                      <Button variant="secondary" className="">Run Payroll</Button>
                    </>
                }
              </div>
            </div>
            <div className='w-100 d-flex'>
              <PayrollProvider>
                <PayrollRun1></PayrollRun1>
              </PayrollProvider>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
