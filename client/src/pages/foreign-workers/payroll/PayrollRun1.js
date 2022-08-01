import React from 'react';
import { usePayroll, usePayrollUpdate } from './contexts/PayrollContext';

export default () => {
  const payroll = usePayroll();
  const payrollUpdate = usePayrollUpdate();
  console.log(payroll);
  
  return (
    <>
      <p onClick={() => payrollUpdate(payroll)}>12312421</p>
    </>
  )
}