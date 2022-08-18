
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Container } from '@themesberg/react-bootstrap';
import useToken from '../useToken';

export default () => {
  const { token } = useToken();
  const [data, setData] = useState(null);

  return (
    <Container className="px-0">
      <Row>
        <Col xs={12} className="p-3">
          <Card>
            <Card.Body>
              <article>
                <h1 className="h2">Dashboard {token}</h1>
              </article>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
