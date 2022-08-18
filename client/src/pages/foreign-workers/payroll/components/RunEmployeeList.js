import React, { useState } from 'react';
import { Image, Form, Modal, Button, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faFilePdf, faEdit } from "@fortawesome/free-solid-svg-icons";
import { usePayrollUpdate } from '../contexts/PayrollContext';
import "../styles.scss";

export default (props) => {
  const { emp, compensationTypeList, deductionTypeList } = props;
  const [showMoreDetail, setShowMoreDetail] = useState(false);
  const [showCM, setShowCM] = useState(false);
  const [showDM, setShowDM] = useState(false);
  const [showWorkUnit, setShowWorkUnit] = useState(false);
  const [addCompensationType, setAddCompensationType] = useState("");
  const [addCompensationAmount, setAddCompensationAmount] = useState(0);
  const [addDeductionType, setAddDeductionType] = useState("");
  const [addDeductionAmount, setAddDeductionAmount] = useState(0);
  let workUnitTemp = 0;
  if (emp.salaryFrequency === "daily") {
    workUnitTemp = emp.dayWorked;
  } else if (emp.salaryFrequency === "hourly") {
    workUnitTemp = emp.hourWorked;
  }
  const [workUnit, setWorkUnit] = useState(workUnitTemp);

  const changeShow = () => {
    if (emp.optIn) {
      setShowMoreDetail(prevShow => !prevShow);
    }
  }
  const handleCloseCM = () => {
    setShowCM(false);
    setAddCompensationType("");
    setAddCompensationAmount(0);
  }
  const handleCloseDM = () => {
    setShowDM(false);
    setAddDeductionType("");
    setAddDeductionAmount(0);
  };
  const handleCloseWorkUnit = () => {
    setShowWorkUnit(false);
    setWorkUnit(workUnitTemp);
  };
  const getCompensationName = (id) => {
    for (let item of compensationTypeList) {
      if (item.id == id) {
        return item.name;
      }
    }
  }
  const getDeductionName = (id) => {
    for (let item of deductionTypeList) {
      if (item.id == id) {
        return item.name;
      }
    }
  }
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const payrollUpdate = usePayrollUpdate();

  return (
    <div className={emp.optIn ? 'twrapper' : 'twrapper opt-out'}>
      <div className={emp.optIn ? 'tbody d-flex align-items-center px-3 cursor-pointer' : 'tbody d-flex align-items-center px-3'} onClick={changeShow}>
        <div className='opt-column d-flex justify-content-center'>
          <Form>
            <Form.Check defaultChecked={emp.optIn}
              onChange={(e) => {
                if (!e.target.checked) {
                  setShowMoreDetail(false);
                }
                payrollUpdate({ action: "check-update", empId: emp.empId, value: e.target.checked });
              }}
              onClick={(e) => {
                e.stopPropagation();
              }} />
          </Form>
        </div>
        <div className='flex-grow-1'>
          <div className='d-flex align-items-center'>
            <Image src={emp.empImg} className="user-avatar md-avatar rounded-circle me-2" />
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
        <div className='dropdown-column'>
          <FontAwesomeIcon icon={showMoreDetail ? faAngleUp : faAngleDown} />
        </div>
      </div>
      {
        showMoreDetail
          ?
          <div className='tbody-more-detail d-flex mx-3 p-3'>
            <div className='flex-grow-1'>
              <p className='payslip mb-0 fw-bold text-primary'><FontAwesomeIcon icon={faFilePdf} className="me-2" />Payslip</p>
            </div>
            <div className='detail-area'>
              <div className='d-flex'>
                <div className='flex-grow-1 pe-4 border-end-eee'>
                  <div className='pb-2 border-bottom-eee'>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 fw-bold'>Basic Salary (Monthly)</p>
                      <p className='mb-0 fw-bold'>RM {emp.basicSalary == 0 ? 0 : Number(emp.basicSalary).toFixed(2)}</p>
                    </div>
                    {
                      emp.salaryFrequency === "hourly" ?
                        <>
                          <div className='d-flex justify-content-between pb-2 text-light-gray'>
                            <p className='mb-0'>Salary Per Hour</p>
                            <p className='mb-0'>RM {emp.basicSalaryBasedOnUnit == 0 ? 0 : Number(emp.basicSalaryBasedOnUnit).toFixed(2)}</p>
                          </div>
                          <div className='d-flex justify-content-between pb-2 text-light-gray'>
                            <p className='mb-0'>
                              <span className='cursor-pointer me-1' onClick={() => { setShowWorkUnit(true) }}>
                                <FontAwesomeIcon icon={faEdit} />
                              </span>
                              {"Total hours"}
                            </p>
                            <p className='mb-0'>{emp.hourWorked}</p>
                          </div>
                        </>
                        : ""
                    }
                    {
                      emp.salaryFrequency === "daily" ?
                        <>
                          <div className='d-flex justify-content-between pb-2 text-light-gray'>
                            <p className='mb-0'>Salary Per Day</p>
                            <p className='mb-0'>RM {emp.basicSalaryBasedOnUnit == 0 ? 0 : Number(emp.basicSalaryBasedOnUnit).toFixed(2)}</p>
                          </div>
                          <div className='d-flex justify-content-between pb-2 text-light-gray'>
                            <p className='mb-0'>
                              <span className='cursor-pointer me-1' onClick={() => { setShowWorkUnit(true) }}>
                                <FontAwesomeIcon icon={faEdit} />
                              </span>
                              {"Total days"}
                            </p>
                            <p className='mb-0'>{emp.dayWorked}</p>
                          </div>
                        </>
                        : ""
                    }
                  </div>
                  <div className='pt-2 border-bottom-eee'>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 fw-bold'>Total Compensation</p>
                      <p className='mb-0 fw-bold'>RM {emp.compensation.totalAmount == 0 ? 0 : Number(emp.compensation.totalAmount).toFixed(2)}</p>
                    </div>
                    {
                      emp.compensation.items.map((item, index) => {
                        return (
                          <div key={item.name} className='d-flex justify-content-between pb-2 text-light-gray'>
                            <p className='mb-0'>
                              <span className='cursor-pointer' onClick={() => {
                                payrollUpdate({
                                  action: "del-compensation", empId: emp.empId, index
                                });
                              }}>-</span> {getCompensationName(item.id)}
                            </p>
                            <p className='mb-0'>RM {item.amount == 0 ? 0 : Number(item.amount).toFixed(2)}</p>
                          </div>
                        )
                      })
                    }
                    <div className='pb-2'>
                      <p className='mb-0 fw-bold text-secondary cursor-pointer' onClick={() => setShowCM(true)}>+ Add Compensation</p>
                    </div>
                  </div>
                  <div className='pt-2 border-bottom-eee'>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 fw-bold'>Total Deduction</p>
                      <p className='mb-0 fw-bold'>RM {emp.deduction.totalAmount == 0 ? 0 : Number(emp.deduction.totalAmount).toFixed(2)}</p>
                    </div>
                    {
                      emp.deduction.items.map((item, index) => {
                        return (
                          <div key={item.name} className='d-flex justify-content-between pb-2 text-light-gray'>
                            <p className='mb-0'>
                              <span className='cursor-pointer' onClick={() => {
                                payrollUpdate({
                                  action: "del-deduction", empId: emp.empId, index
                                });
                              }}>-</span> {getDeductionName(item.id)}
                            </p>
                            <p className='mb-0'>RM {item.amount == 0 ? 0 : Number(item.amount).toFixed(2)}</p>
                          </div>
                        )
                      })
                    }
                    <div className='pb-2'>
                      <p className='mb-0 fw-bold text-secondary cursor-pointer cursor-pointer' onClick={() => setShowDM(true)}>+ Add Deduction</p>
                    </div>
                  </div>
                  <div className='pt-2'>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 fw-bold'>Total Contribution</p>
                      <p className='mb-0 fw-bold'>RM {emp.contribution.totalAmount == 0 ? 0 : Number(emp.contribution.totalAmount).toFixed(2)}</p>
                    </div>
                    {
                      emp.contribution.items.map((item) => {
                        return (
                          <div key={item.name} className='d-flex justify-content-between pb-2 text-light-gray'>
                            <p className='mb-0'>{item.name}</p>
                            <p className='mb-0'>RM {item.amount == 0 ? 0 : Number(item.amount).toFixed(2)}</p>
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
                      <p className='mb-0 fw-bold'>RM {emp.basicSalary == 0 ? 0 : Number(emp.basicSalary).toFixed(2)}</p>
                    </div>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 text-light-gray'>Total Compensation</p>
                      <p className='mb-0 fw-bold text-success'>RM {emp.compensation.totalAmount == 0 ? 0 : Number(emp.compensation.totalAmount).toFixed(2)}</p>
                    </div>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 text-light-gray'>Total Deduction</p>
                      <p className='mb-0 fw-bold text-danger'>RM {emp.deduction.totalAmount == 0 ? 0 : Number(emp.deduction.totalAmount).toFixed(2)}</p>
                    </div>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0  text-light-gray'>Total Contribution</p>
                      <p className='mb-0 fw-bold text-danger'>RM {emp.contribution.totalAmount == 0 ? 0 : Number(emp.contribution.totalAmount).toFixed(2)}</p>
                    </div>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0  text-light-gray'>Net Salary</p>
                      <p className='mb-0 fw-bold'>RM {emp.netSalary == 0 ? 0 : Number(emp.netSalary).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className='pt-2'>
                    <div className='d-flex justify-content-between pb-2'>
                      <p className='mb-0 fw-bold'>Employer Cost</p>
                      <p className='mb-0 fw-bold'>RM {emp.employerCost.totalAmount == 0 ? 0 : Number(emp.employerCost.totalAmount).toFixed(2)}</p>
                    </div>
                    {
                      emp.employerCost.items.map((item) => {
                        return (
                          <div key={item.name} className='d-flex justify-content-between pb-2 text-light-gray'>
                            <p className='mb-0'>{item.name}</p>
                            <p className='mb-0'>RM {item.amount == 0 ? 0 : Number(item.amount).toFixed(2)}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            <Modal as={Modal.Dialog} centered show={showCM} onHide={handleCloseCM}>
              <Modal.Header>
                <Modal.Title className="h6">Add Compensation</Modal.Title>
                <Button variant="close" aria-label="Close" onClick={handleCloseCM} />
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Compensation Type</Form.Label>
                    <Form.Select onChange={(e) => {
                      setAddCompensationType(e.target.value);
                    }}>
                      <option disabled selected>Select Compensation Type</option>
                      {
                        compensationTypeList.map((item) => {
                          return (<option key={item.id} value={item.id}>{item.name}</option>)
                        })
                      }
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>RM</InputGroup.Text>
                      <Form.Control type="number" placeholder="Amount" onChange={(e) => {
                        setAddCompensationAmount(e.target.value);
                      }} />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={(e) => {
                  payrollUpdate({
                    action: "add-compensation", empId: emp.empId, value: { addCompensationType, addCompensationAmount }
                  });
                  handleCloseCM();
                }}>
                  Add
                </Button>
                <Button variant="link" className="text-gray ms-auto" onClick={handleCloseCM}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal as={Modal.Dialog} centered show={showDM} onHide={handleCloseDM}>
              <Modal.Header>
                <Modal.Title className="h6">Add Deduction</Modal.Title>
                <Button variant="close" aria-label="Close" onClick={handleCloseDM} />
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Deduction Type</Form.Label>
                    <Form.Select onChange={(e) => {
                      setAddDeductionType(e.target.value);
                    }}>
                      <option disabled selected>Select Deduction Type</option>
                      {
                        deductionTypeList.map((item) => {
                          return (<option key={item.id} value={item.id}>{item.name}</option>)
                        })
                      }
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>RM</InputGroup.Text>
                      <Form.Control type="number" placeholder="Amount" onChange={(e) => {
                        setAddDeductionAmount(e.target.value);
                      }} />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={(e) => {
                  payrollUpdate({
                    action: "add-deduction", empId: emp.empId, value: { addDeductionType, addDeductionAmount }
                  });
                  handleCloseDM();
                }}>
                  Add
                </Button>
                <Button variant="link" className="text-gray ms-auto" onClick={handleCloseDM}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal as={Modal.Dialog} centered show={showWorkUnit} onHide={handleCloseWorkUnit}>
              <Modal.Header>
                <Modal.Title className="h6">Change Total {emp.salaryFrequency === "daily" ? "Days" : "" + emp.salaryFrequency === "hourly" ? "Hours" : ""}</Modal.Title>
                <Button variant="close" aria-label="Close" onClick={handleCloseWorkUnit} />
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Total {emp.salaryFrequency === "daily" ? "Days" : "" + emp.salaryFrequency === "hourly" ? "Hours" : ""}</Form.Label>
                    <Form.Control type="number" placeholder="Amount"
                      value={workUnit}
                      onChange={(e) => {
                        setWorkUnit(e.target.value);
                      }} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={(e) => {
                  payrollUpdate({
                    action: "update-salary-frequent", empId: emp.empId, value: { workUnit }
                  });
                  handleCloseWorkUnit();
                }}>
                  Change
                </Button>
                <Button variant="link" className="text-gray ms-auto" onClick={handleCloseWorkUnit}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          :
          ''
      }
    </div>
  )
};
