
import React, { useState } from 'react';
import { PayrollProvider } from './contexts/PayrollContext';
import PayrollRun from './PayrollRun';

export default (props) => {
  return (
    <PayrollProvider>
      <PayrollRun props={{...props}}></PayrollRun>
    </PayrollProvider>
  )
}
