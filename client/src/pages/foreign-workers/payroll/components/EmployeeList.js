import React, { useState } from 'react';
import { Image } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import "../styles.scss";

export default (props) => {
  const { emp } = props;
  const [showMoreDetail, setShowMoreDetail] = useState(false);

  const changeShow = () => setShowMoreDetail(prevShow => !prevShow);

  return (
    <div className='twrapper'>
      <div className='tbody d-flex align-items-center px-3' onClick={changeShow}>
        <div className='flex-grow-1'>
          <div className='d-flex align-items-center'>
            <Image src={emp.empImg} className="user-avatar md-avatar rounded-circle me-2" />
            <p className='mb-0 fw-bold'>{emp.empName}</p>
          </div>
        </div>
        <div className='cost'>
          <p className='mb-0 fw-bold'>RM {emp.grossSalary}</p>
        </div>
        <div className='cost'>
          <p className='mb-0 fw-bold'>RM {emp.deduction.totalAmount}</p>
        </div>
        <div className='cost'>
          <p className='mb-0 fw-bold'>RM {emp.contribution.totalAmount}</p>
        </div>
        <div className='cost'>
          <p className='mb-0 fw-bold'>RM {emp.netSalary}</p>
        </div>
        <div className='cost'>
          <p className='mb-0 fw-bold'>RM {emp.employerCost.totalAmount}</p>
        </div>
        <div className='dropdown-column'>
          <FontAwesomeIcon icon={showMoreDetail ? faAngleUp : faAngleDown} />
        </div>
      </div>
      {
        showMoreDetail
          ?
          <div className='tbody-more-detail d-flex mx-3 p-3'>
            <div className='flex-grow-1'>
              <p className='ms-4 mb-0 fw-bold text-primary'><FontAwesomeIcon icon={faFilePdf} className="me-2"/>Payslip</p>
            </div>
            <div className='detail-area'>
              <div className='d-flex'>
                <div className='flex-grow-1 pe-4 border-end-eee'>
                  <div className='d-flex justify-content-between pb-2 border-bottom-eee'>
                    <p className='mb-0 fw-bold'>Basic Salary (Monthly)</p>
                    <p className='mb-0 fw-bold'>RM {emp.basicSalary}</p>
                  </div>
                  <div className='pt-2 border-bottom-eee'>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 fw-bold'>Total Compensation</p>
                      <p className='mb-0 fw-bold'>RM {emp.compensation.totalAmount}</p>
                    </div>
                    {
                      emp.compensation.items.map((item) => {
                        return (
                          <div key={item.name} className='d-flex justify-content-between pb-2 text-light-gray'>
                            <p className='mb-0'>{item.name}</p>
                            <p className='mb-0'>RM {item.amount}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className='pt-2 border-bottom-eee'>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 fw-bold'>Total Deduction</p>
                      <p className='mb-0 fw-bold'>RM {emp.deduction.totalAmount}</p>
                    </div>
                    {
                      emp.deduction.items.map((item) => {
                        return (
                          <div key={item.name} className='d-flex justify-content-between pb-2 text-light-gray'>
                            <p className='mb-0'>{item.name}</p>
                            <p className='mb-0'>RM {item.amount}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className='pt-2'>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 fw-bold'>Total Contribution</p>
                      <p className='mb-0 fw-bold'>RM {emp.contribution.totalAmount}</p>
                    </div>
                    {
                      emp.contribution.items.map((item) => {
                        return (
                          <div key={item.name} className='d-flex justify-content-between pb-2 text-light-gray'>
                            <p className='mb-0'>{item.name}</p>
                            <p className='mb-0'>RM {item.amount}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                <div className='flex-grow-1 ps-4'>
                  <div className='border-bottom-eee'>
                    <p className='pb-2 mb-0 fw-bold'>Summary</p>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 text-light-gray'>Basic Salary</p>
                      <p className='mb-0 fw-bold'>RM {emp.basicSalary}</p>
                    </div>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 text-light-gray'>Total Compensation</p>
                      <p className='mb-0 fw-bold text-success'>RM {emp.compensation.totalAmount}</p>
                    </div>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 text-light-gray'>Total Deduction</p>
                      <p className='mb-0 fw-bold text-danger'>RM {emp.deduction.totalAmount}</p>
                    </div>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0  text-light-gray'>Total Contribution</p>
                      <p className='mb-0 fw-bold text-danger'>RM {emp.contribution.totalAmount}</p>
                    </div>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0  text-light-gray'>Net Salary</p>
                      <p className='mb-0 fw-bold'>RM {emp.netSalary}</p>
                    </div>
                  </div>
                  <div className='pt-2'>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 fw-bold'>Employer Cost</p>
                      <p className='mb-0 fw-bold'>RM {emp.employerCost.totalAmount}</p>
                    </div>
                    {
                      emp.employerCost.items.map((item) => {
                        return (
                          <div key={item.name} className='d-flex justify-content-between pb-2 text-light-gray'>
                            <p className='mb-0'>{item.name}</p>
                            <p className='mb-0'>RM {item.amount}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          ''
      }
    </div>
  )
};
