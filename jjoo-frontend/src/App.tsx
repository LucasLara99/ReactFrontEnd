import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CrudTab from './components/CrudTab/CrudTab';
import Consulta from './components/Consulta/Consulta';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

function App() {
  const [value, setValue] = React.useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div className="tabs-container">
          <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
            <Tab label="Consulta" />
            <Tab label="CRUD de SedeJJOO" />
          </Tabs>
        </div>
        {value === 0 ? <Consulta /> : <CrudTab />}
      </div>
    </QueryClientProvider>
  );
}

export default App;