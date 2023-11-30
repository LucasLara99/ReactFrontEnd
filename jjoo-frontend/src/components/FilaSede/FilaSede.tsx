import React, { useState } from 'react';
import { Sede } from '../../models/Sede';
import { Ciudad } from '../../models/Ciudad';
import { TableRow, TableCell, Button, Select, MenuItem } from '@mui/material';

interface SedeRowProps {
  sede: Sede;
  onUpdate: (updatedSede: Sede) => void;
  ciudades: Ciudad[];
  ciudadSeleccionada: number | null;
  setCiudadSeleccionada: (value: number | null) => void;
}

const SedeRow: React.FC<SedeRowProps> = ({ sede, onUpdate, ciudades }) => {
  const [editing, setEditing] = useState(false);
  const [idCiudad, setIdCiudad] = useState(sede.idCiudad);

  const handleUpdate = () => {
    onUpdate({ ...sede, idCiudad });
    setEditing(false);
  };

  return (
    <TableRow key={sede.año}>
      <TableCell>{sede.año}</TableCell>
      <TableCell>{sede.description}</TableCell>
      <TableCell>
        {editing ? (
          <Select
            value={idCiudad}
            onChange={event => setIdCiudad(Number(event.target.value))}
          >
            {ciudades.map((ciudad: Ciudad) => (
              <MenuItem key={ciudad.idCiudad} value={ciudad.idCiudad}>
                {ciudad.nombreCiudad}
              </MenuItem>
            ))}
          </Select>
        ) : (
          ciudades.find(ciudad => ciudad.idCiudad === idCiudad)?.nombreCiudad
        )}
      </TableCell>
      <TableCell>
        {editing ? (
          <Button onClick={handleUpdate}>Actualizar</Button>
        ) : (
          <Button onClick={() => setEditing(true)}>Editar</Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default SedeRow;