import React from 'react';
import { Select, MenuItem, TextField, Button, Grid, InputLabel } from '@mui/material';
import { Ciudad } from '../../models/Ciudad';
import './CrearSede.css';

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
    <div className='main-container'>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} direction="row" alignItems="center">
          <Grid item xs={3}>
            <InputLabel id="ciudad-label" className='inputlabel'>Seleccione la ciudad</InputLabel>
            <Select
              value={ciudadSeleccionada || ""}
              onChange={event => setCiudadSeleccionada(Number(event.target.value))}
              fullWidth
              aria-label='Ciudad'
            >
              {ciudades.map((ciudad: Ciudad) => (
                <MenuItem key={ciudad.idCiudad} value={ciudad.idCiudad}>
                  {ciudad.nombreCiudad}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <InputLabel id="año-label" className='inputlabel'>Introduzca un año</InputLabel>
            <TextField value={año || ""} onChange={event => setAño(Number(event.target.value))} label="Año" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <InputLabel id="tipojjoo-label" className='inputlabel'>Seleccione la temporada</InputLabel>
            <Select
              value={id_tipo_jjoo || ""}
              onChange={event => setIdTipoJJOO(Number(event.target.value))}
              fullWidth
              aria-label='Tipo JJOO'
            >
              {tiposJJOO.map((tipo) => (
                <MenuItem key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <Button type="submit" disabled={!ciudadSeleccionada || !año || !id_tipo_jjoo} fullWidth>Crear Sede</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CrearSede;