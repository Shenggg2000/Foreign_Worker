
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Container } from '@themesberg/react-bootstrap';

export default () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <Container className="px-0">
      <Row>
        <Col xs={12} className="p-3">
          <Card>
            <Card.Body>
              <article>
                <h1 className="h2">Dashboard {data}</h1>
              </article>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
