import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CrearSede from "./CrearSede";
import { Ciudad } from '../../models/Ciudad';

const mockCiudades: Ciudad[] = [
  { idCiudad: 1, nombreCiudad: 'Ciudad1' },
  { idCiudad: 2, nombreCiudad: 'Ciudad2' },
];

test("renders CrearSede", async () => {
  const mockSetCiudadSeleccionada = jest.fn();
  const mockSetAño = jest.fn();
  const mockSetIdTipoJJOO = jest.fn();
  const mockHandleSubmit = jest.fn();

  render(
    <CrearSede
      ciudades={mockCiudades}
      ciudadSeleccionada={null}
      setCiudadSeleccionada={mockSetCiudadSeleccionada}
      año={null}
      setAño={mockSetAño}
      id_tipo_jjoo={null}
      setIdTipoJJOO={mockSetIdTipoJJOO}
      handleSubmit={mockHandleSubmit}
    />
  );

  // Comprobar que se muestran los campos
  const ciudadSelect = screen.getByLabelText('Ciudad');
  const añoInput = screen.getByRole('textbox', { name: 'Año' });
  const tipoJJOOSelect = screen.getByLabelText('Tipo JJOO');
  const submitButton = screen.getByRole('button', { name: 'Crear Sede' });

  expect(ciudadSelect).toBeInTheDocument();
  expect(añoInput).toBeInTheDocument();
  expect(tipoJJOOSelect).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  // Comprobar que se muestran las ciudades en el select
  mockCiudades.forEach(async ciudad => {
    expect(await screen.findByText(ciudad.nombreCiudad)).toBeInTheDocument();
  });
});