
import React from 'react';
import { Row, Col, Card } from '@themesberg/react-bootstrap';

export default (props) => {
  return (
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <div className='d-flex justify-content-between mb-3'>
              <h1 className="fs-4 fw-bold">Reminder</h1>
            </div>
            <div className='w-100'>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
