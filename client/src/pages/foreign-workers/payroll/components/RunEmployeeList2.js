import React from 'react';
import { Image } from '@themesberg/react-bootstrap';

export default (props) => {
  const { emp } = props;

  return (
    <>
      <div className={'twrapper'}>
        <div className={'tbody d-flex align-items-center px-3'}>
          <div className='flex-grow-1'>
            <div className='d-flex align-items-center'>
              <Image src={"http://localhost:3001/uploads/"+emp.empImg} className="user-avatar md-avatar rounded-circle me-2" />
              <p className='mb-0 fw-bold'>{emp.empName}</p>
            </div>
          </div>
          <div className='cost'>
            <p className='mb-0 fw-bold'>RM {emp.grossSalary == 0 ? 0 : Number(emp.grossSalary).toFixed(2)}</p>
          </div>
          <div className='cost'>
            <p className='mb-0 fw-bold'>RM {emp.deduction.totalAmount == 0 ? 0 : Number(emp.deduction.totalAmount).toFixed(2)}</p>
          </div>
          <div className='cost'>
            <p className='mb-0 fw-bold'>RM {emp.contribution.totalAmount == 0 ? 0 : Number(emp.contribution.totalAmount).toFixed(2)}</p>
          </div>
          <div className='cost'>
            <p className='mb-0 fw-bold'>RM {emp.netSalary == 0 ? 0 : Number(emp.netSalary).toFixed(2)}</p>
          </div>
          <div className='cost'>
            <p className='mb-0 fw-bold'>RM {emp.employerCost.totalAmount == 0 ? 0 : Number(emp.employerCost.totalAmount).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
