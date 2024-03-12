import React from 'react';
import { Select, MenuItem, TextField, Button, Grid, InputLabel } from '@mui/material';
import { Ciudad } from '../../models/Ciudad';

interface CrearSedeProps {
  ciudades: Ciudad[];
  ciudadSeleccionada: number | null;
  setCiudadSeleccionada: (value: number | null) => void;
  año: number | null;
  setAño: (value: number | null) => void;
  id_tipo_jjoo: number | null;
  setIdTipoJJOO: (value: number | null) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const tiposJJOO = [
  { nombre: 'INVIERNO', id: 1 },
  { nombre: 'VERANO', id: 2 },
];

const CrearSede: React.FC<CrearSedeProps> = ({ ciudades, ciudadSeleccionada, setCiudadSeleccionada, año, setAño, id_tipo_jjoo, setIdTipoJJOO, handleSubmit }) => {
  return (
    <div className='p-4'>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 gap-4 items-center">
          <div className='flex flex-col'>
            <div className='mb-4 w-full'>
              <InputLabel id="ciudad-label">Seleccione la ciudad</InputLabel>
            </div>
            <Select
              value={ciudadSeleccionada || ""}
              onChange={event => setCiudadSeleccionada(Number(event.target.value))}
              fullWidth
              aria-label='Ciudad'
              className='border border-gray-300 rounded-md'
            >
              {ciudades.map((ciudad: Ciudad) => (
                <MenuItem key={ciudad.idCiudad} value={ciudad.idCiudad}>
                  {ciudad.nombreCiudad}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className='flex flex-col'>
            <div className='mb-4 w-full'>
              <InputLabel id="año-label">Introduzca un año</InputLabel>
            </div>
            <TextField value={año || ""} onChange={event => setAño(Number(event.target.value))} label="Año" fullWidth className='border border-gray-300 rounded-md' />
          </div>
          <div className='flex flex-col'>
            <div className='mb-4 w-full'>
              <InputLabel id="tipojjoo-label">Seleccione la temporada</InputLabel>
            </div>
            <Select
              value={id_tipo_jjoo || ""}
              onChange={event => setIdTipoJJOO(Number(event.target.value))}
              fullWidth
              aria-label='Tipo JJOO'
              className='border border-gray-300 rounded-md'
            >
              {tiposJJOO.map((tipo) => (
                <MenuItem key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className='flex flex-col items-center'>
            <div className='w-1/2 mt-8'>
              <Button type="submit" disabled={!ciudadSeleccionada || !año || !id_tipo_jjoo} fullWidth size="small" className='bg-blue-500 text-white'>Crear Sede</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CrearSede;