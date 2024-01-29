import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConsultaContext } from './ConsultaContext';
import { ErrorContext } from '../../hooks/ErrorContext';

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement, value: any, errorValue: any = { errors: {}, addError: () => {}, removeError: () => {}, setErrors: () => {} }) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ConsultaContext.Provider value={value}>
        <ErrorContext.Provider value={errorValue}>
          {ui}
        </ErrorContext.Provider>
      </ConsultaContext.Provider>
    </QueryClientProvider>
  );
};

export default renderWithProviders;