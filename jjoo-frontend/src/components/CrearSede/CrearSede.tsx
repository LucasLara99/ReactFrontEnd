import React from 'react';
import { Select, MenuItem, TextField, Button, Grid } from '@mui/material';
import './CrearSede.css';

interface Ciudad {
  idCiudad: number;
  nombreCiudad: string;
}

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

const CrearSede: React.FC<CrearSedeProps> = ({ ciudades, ciudadSeleccionada, setCiudadSeleccionada, año, setAño, id_tipo_jjoo, setIdTipoJJOO, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Select
              value={ciudadSeleccionada}
              onChange={event => setCiudadSeleccionada(Number(event.target.value))}
              fullWidth
            >
              {ciudades.map((ciudad: Ciudad) => (
                <MenuItem key={ciudad.idCiudad} value={ciudad.idCiudad}>
                  {ciudad.nombreCiudad}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <TextField value={año} onChange={event => setAño(Number(event.target.value))} label="Año" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField value={id_tipo_jjoo} onChange={event => setIdTipoJJOO(Number(event.target.value))} label="ID Tipo JJOO" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <Button type="submit" fullWidth>Crear Sede</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CrearSede;