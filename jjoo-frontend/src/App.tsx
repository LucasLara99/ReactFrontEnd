import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CrudTab from './components/CrudTab/CrudTab';
import Consulta from './components/Consulta/Consulta';
import './App.css';

function App() {
  const [value, setValue] = React.useState(0);

  return (
    <div>
      <Tabs className='main-tab' value={value} onChange={(_, newValue) => setValue(newValue)}>
        <Tab className='single-tab' label="Consulta" />
        <Tab className='single-tab' label="CRUD de SedeJJOO" />
      </Tabs>
      {value === 0 ? <Consulta /> : <CrudTab />}
    </div>
  );
}

export default App;