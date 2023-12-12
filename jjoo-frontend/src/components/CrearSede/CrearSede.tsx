import React from 'react';
import { Select, MenuItem, TextField, Button, Grid, Snackbar, IconButton } from '@mui/material';
import { Ciudad } from '../../models/Ciudad';
import CloseIcon from '@mui/icons-material/Close';
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
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className='main-container'>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Select
              value={ciudadSeleccionada || ""}
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
            <TextField value={año || ""} onChange={event => setAño(Number(event.target.value))} label="Año" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <Select
              value={id_tipo_jjoo || ""}
              onChange={event => setIdTipoJJOO(Number(event.target.value))}
              fullWidth
            >
              {tiposJJOO.map((tipo) => (
                <MenuItem key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <Button type="submit" onClick={handleClick} fullWidth>Crear Sede</Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Sede creada"
          action={action}
        />
    </div>
  );
};

export default CrearSede;