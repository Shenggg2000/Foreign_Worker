import React from 'react';
import { Link } from 'react-router-dom';
import "../styles.scss";

export default (props) => {
  const { pId, pYear, pMonth, pDate, pNumEmp, pStatus, pTotal } = props;

  return (
    <Link to={{
      pathname: '/foreign-worker/payroll/history/view/' + pId,
    }}>
      <div className='history-list d-flex p-3 rounded mb-3 align-items-end'>
        <div className='flex-grow-1'>
          <p className='m-0 fs-5 fw-bold'>{pMonth} {pYear}</p>
          <p className='m-0 text-light'>Submitted on {pDate} {pMonth} {pYear}</p>
        </div>
        <div className='custom-column-size'>
          <p className='m-0 text-end text-light'>{pNumEmp} Employee(s)</p>
        </div>
        <div className='custom-column-size'>
          <p className={`m-0 text-end fw-bold ${pStatus ? "text-success" : "text-danger"}`}>{pStatus ? "Success" : "Fail"} </p>
        </div>
        <div className='custom-column-size'>
          <p className='m-0 text-end fw-bold'>RM {pTotal}</p>
        </div>
      </div>
    </Link>
  )
};
