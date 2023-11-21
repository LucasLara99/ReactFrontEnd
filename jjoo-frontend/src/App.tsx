import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CrudTab from './components/CrudTab';
import Consulta from './components/Consulta';

function App() {
  const [value, setValue] = React.useState(0);

  return (
    <div>
      <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
        <Tab label="Consulta" />
        <Tab label="CRUD de SedeJJOO" />
      </Tabs>
      {value === 0 ? <Consulta /> : <CrudTab />}
    </div>
  );
}

export default App;