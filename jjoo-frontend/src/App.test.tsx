import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Consulta and CRUD de SedeJJOO tabs', () => {
  render(<App />);
  
  // Comprobar que se muestran las dos pestañas
  const consultaTab = screen.getByText(/Consulta/i);
  const crudTab = screen.getByText(/CRUD de SedeJJOO/i);
  expect(consultaTab).toBeInTheDocument();
  expect(crudTab).toBeInTheDocument();

  // Comprobar que la pestaña Consulta está seleccionada por defecto
  expect(consultaTab).toHaveAttribute('aria-selected', 'true');
  expect(crudTab).toHaveAttribute('aria-selected', 'false');

  // Simular un click en la pestaña CRUD de SedeJJOO y comprobar que se selecciona
  fireEvent.click(crudTab);
  expect(crudTab).toHaveAttribute('aria-selected', 'true');
  expect(consultaTab).toHaveAttribute('aria-selected', 'false');
});