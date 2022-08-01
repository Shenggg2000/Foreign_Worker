
import React from 'react';
import { Row, Col, Card, Container } from '@themesberg/react-bootstrap';

export default () => (
  <Container className="px-0">
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <article>
              <h1 className="h2">Reminder</h1>
            </article>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
