import React from 'react';
import { Image } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import "../styles.scss";

export default (props) => {
  const { emp, expireType } = props;

  const timestampToYear = (date) => {
    let timestampToDate = new Date(date);
    return timestampToDate.getFullYear();
  }

  const timestampToMonth = (date) => {
    let timestampToDate = new Date(date);
    return timestampToDate.toLocaleString('default', { month: 'long' });
  }

  const timestampToDate = (date) => {
    let timestampToDate = new Date(date);
    return timestampToDate.getDate();
  }

  return (
    <Link to={{
      pathname: '/payroll/history/view/' + 1,
    }}>
      <div className='cursor-pointer w-100 mb-4 rounded emp-row py-3 px-4 d-flex align-items-center'>
        <div>
          <Image src={"http://localhost:3001/uploads/"+emp.img} className="user-avatar md-avatar rounded-circle me-3" />
        </div>
        <div className='flex-grow-2 d-flex flex-column'>
          <h1 className='fs-5 fw-bold mb-0'>{emp.name}</h1>
          <p className='mb-0'>{expireType} on <span className='text-danger'>{timestampToDate(emp.date)} {timestampToMonth(emp.date)} {timestampToYear(emp.date)}</span></p>
        </div>
        <div>
          <span className="ms-2 icon icon-ys-small"><FontAwesomeIcon icon={faChevronRight} /></span>
        </div>
      </div>
    </Link>

  )
};
