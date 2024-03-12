import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CrudTab from './components/CrudTab/CrudTab';
import Consulta from './components/Consulta/Consulta';
import Portal from './components/Portal/Portal';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorProvider } from './hooks/ErrorContext';
import useFavTab from './hooks/useFavTab';

const queryClient = new QueryClient();

function App() {
  const [value, setValue] = useFavTab('0', 'favoriteTab');
  const [currentComponent, setCurrentComponent] = useState('');

  const handleChange = (_: unknown, newValue: number) => {
    setValue(String(newValue));
  };

  return (
    <ErrorProvider>
      <QueryClientProvider client={queryClient}>
        <div>
          <div className="tabs-container">
            <div>
              <Portal />
            </div>
            <Tabs value={Number(value)} onChange={handleChange}>
              <Tab label="Consulta" style={{ color: '#ffffff' }} />
              <Tab label="CRUD de SedeJJOO" style={{ color: '#ffffff' }} />
            </Tabs>
          </div>
          {value === '0' ?
            <Consulta setCurrentComponent={setCurrentComponent} label={`Estoy en ${currentComponent}`} />
            :
            <CrudTab setCurrentComponent={setCurrentComponent} />}
        </div>
      </QueryClientProvider>
    </ErrorProvider>
  );
}

export default App;