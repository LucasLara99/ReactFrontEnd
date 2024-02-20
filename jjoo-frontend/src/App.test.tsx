import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders Consulta and CRUD de SedeJJOO tabs', () => {
  render(<App />);

  const consultaTab = screen.getByRole('tab', { name: /Consulta/i });
  const crudTab = screen.getByRole('tab', { name: /CRUD de SedeJJOO/i });
  expect(consultaTab).toBeInTheDocument();
  expect(crudTab).toBeInTheDocument();
});