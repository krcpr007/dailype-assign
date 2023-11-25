import Header from './components/Header';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import data from './Data.json'
import { useState } from 'react';
import Filter from './components/Filter';
import Table from './components/Table';
function App() {
  const [rowData, setRowData] = useState(data.response);
  return (
    <>
      <Header />
      <Filter setRowData={setRowData} />
      <Table rowData={rowData} />
    </>
  );
}

export default App;
