
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from '@themesberg/react-bootstrap';
import HistoryList from './components/HistoryList';

export default () => {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    let apiReturn = [
      {
        id: 1,
        timestamp: 1654532435,
        numEmp: 2,
        status: true,
        total: 3000,
      },
      {
        id: 2,
        timestamp: 1658552446,
        numEmp: 3,
        status: false,
        total: 4000,
      },
    ];
    processHistoryList(apiReturn);
  }, [])

  function processHistoryList(list) {
    let newHistoryList = [];
    for (let n of list) {
      let timestampToDate = new Date(n.timestamp * 1000);
      let year = timestampToDate.getFullYear();
      let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(timestampToDate);
      let date = timestampToDate.getDate();
      if (newHistoryList.length == 0) {
        newHistoryList.push({ year, item: [{ ...n, year, month, date }] });
      } else {
        let addNewYear = true;
        for (let o of newHistoryList) {
          if (o.year == year) {
            o.item.push({ ...n, year, month, date });
            addNewYear = false;
          }
        }
        if (addNewYear) {
          newHistoryList.push({ year, item: [{ ...n, year, month, date }] });
        }
      }
    }
    setHistoryList(newHistoryList);
  }

  return (
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body className=''>
            <div className='mb-3'>
              <div>
                <h1 className="fs-4 fw-bold">Payroll History</h1>
              </div>
            </div>
            <div className='w-100'>
              {
                historyList.map((eachYear) => {
                  return (
                    <div key={eachYear.year}>
                      <div className='text-dark mb-2 fs-5 fw-bold'>{eachYear.year}</div>
                      {eachYear.item.map((eachMonth) => {
                        return (
                          <HistoryList key={eachMonth.id} pId={eachMonth.id} pYear={eachMonth.year}
                          pMonth={eachMonth.month} pDate={eachMonth.date}
                          pNumEmp={eachMonth.numEmp} pStatus={eachMonth.status}
                          pTotal={eachMonth.total}
                          ></HistoryList>
                        )
                      })}
                    </div>
                  )
                })
              }
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
};