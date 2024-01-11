import React, { Component } from "react";
import { render, fireEvent, screen, within, prettyDOM } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CrearSede from "./CrearSede";
import { Ciudad } from '../../models/Ciudad';

describe("CrearSede component", () => {
  const mockCiudades: Ciudad[] = [
    { idCiudad: 1, nombreCiudad: 'Ciudad1' },
    { idCiudad: 2, nombreCiudad: 'Ciudad2' },
  ];

  const mockSetCiudadSeleccionada = jest.fn();
  const mockSetAño = jest.fn();
  const mockSetIdTipoJJOO = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
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
  });


  //Se renderiza el componente CrearSede pero no se simula ninguna interacción
  test("renders CrearSede", () => {
    const ciudadSelect = screen.getByLabelText('Ciudad');
    const añoInput = screen.getByRole('textbox', { name: 'Año' });
    const tipoJJOOSelect = screen.getByLabelText('Tipo JJOO');

    expect(ciudadSelect).toBeInTheDocument();
    expect(añoInput).toBeInTheDocument();
    expect(tipoJJOOSelect).toBeInTheDocument();
  });


  // Comprobar comportamiento de handlesubmit si los campos están vacíos
  test("handleSubmit con campos vacios", () => {
    const submitButton = screen.getByRole('button', { name: /crear sede/i });
    fireEvent.click(submitButton);
    //No recibe ninguna llamada ya que el botón está disabled mientras los campos estén vacíos
    expect(mockHandleSubmit).not.toHaveBeenCalled();
  });
});