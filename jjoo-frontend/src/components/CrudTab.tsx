import React, { useState, useEffect } from 'react';
import { Select, MenuItem, TextField, Button } from '@mui/material';

interface Ciudad {
  idCiudad: number;
  nombreCiudad: string;
}

const CrudTab = () => {
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<number | null>(null);
  const [año, setAño] = useState<number | null>(null);
  const [id_tipo_jjoo, setIdTipoJJOO] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/ciudades')
      .then(response => response.json())
      .then(data => setCiudades(data))
      .catch(error => console.error('Error al obtener datos:', error));
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (año == null || ciudadSeleccionada == null || id_tipo_jjoo == null) {
      console.error('Todos los campos son requeridos');
      return;
    }

    const sede = {
      año,
      idCiudad: ciudadSeleccionada,
      id_tipo_jjoo
    };

    fetch('http://localhost:8080/sedejjoo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sede),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <Select
        value={ciudadSeleccionada}
        onChange={event => setCiudadSeleccionada(Number(event.target.value))}
      >
        {ciudades.map((ciudad: Ciudad) => (
          <MenuItem key={ciudad.idCiudad} value={ciudad.idCiudad}>
            {ciudad.nombreCiudad}
          </MenuItem>
        ))}
      </Select>
      <form onSubmit={handleSubmit}>
        <TextField value={año} onChange={event => setAño(Number(event.target.value))} label="Año" />
        <TextField value={id_tipo_jjoo} onChange={event => setIdTipoJJOO(Number(event.target.value))} label="ID Tipo JJOO" />
        <Button type="submit">Crear Sede</Button>
      </form>
    </div>
  );
};

export default CrudTab;