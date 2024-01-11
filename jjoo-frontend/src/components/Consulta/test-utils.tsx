import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConsultaContext } from './ConsultaContext';

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement, value: any) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ConsultaContext.Provider value={value}>
        {ui}
      </ConsultaContext.Provider>
    </QueryClientProvider>
  );
};

export default renderWithProviders;