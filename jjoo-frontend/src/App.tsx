import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CrudTab from './components/CrudTab/CrudTab';
import Consulta from './components/Consulta/Consulta';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorProvider } from './hooks/ErrorContext';


const queryClient = new QueryClient();

function App() {
  const [value, setValue] = React.useState(0);

  return (
    <ErrorProvider>
      <QueryClientProvider client={queryClient}>
        <div>
          <div className="tabs-container">
            <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
              <Tab label="Consulta" style={{ color: '#ffffff' }}/>
              <Tab label="CRUD de SedeJJOO" style={{ color: '#ffffff' }}/>
            </Tabs>
          </div>
          {value === 0 ? <Consulta /> : <CrudTab />}
        </div>
      </QueryClientProvider>
    </ErrorProvider>
  );
}

export default App;