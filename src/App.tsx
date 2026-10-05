import { useState, useEffect } from 'react';
import { getSheetData } from './helper/getSheetData';

const SHEET_ID ='1oSCUXEqqMAtAPYxDP-WLAjnG9h2wk1wDlrGjBFFYGJI';
const SHEET_NAME = 'Sheet2';

function App() {
  


useEffect(() => {

  getSheetData(SHEET_ID, SHEET_NAME).then(result => {
    // console.log('result', result);
  });

}, []);



  return (
    <>
      <h1>hello</h1>
    </>
  )
}

export default App
