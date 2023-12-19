import React, { useState } from 'react';
import { Sede } from '../../models/Sede';
import { Ciudad } from '../../models/Ciudad';
import { TableRow, TableCell, Button, Select, MenuItem } from '@mui/material';
import { useGetCiudades } from '../../hooks/useGetCiudades';
import { useUpdateSede } from '../../hooks/useUpdateSede';


const tipoJJOOMap: { [key: string]: number } = {
  'INVIERNO': 1,
  'VERANO': 2,
};

export const FilaSede = ({ sede }: { sede: Sede }) => {
  const [editing, setEditing] = useState(false);
  const [idCiudad, setIdCiudad] = useState(sede.idCiudad);

  const { data: ciudades, isPending, error } = useGetCiudades();

  const updateSede = useUpdateSede()

  if (isPending) return <div>Loading...</div>
  if (error) return <div>An error has occurred: {error.message}</div>

  const handleUpdate = () => {
    updateSede.mutate({...sede, idCiudad});
    setEditing(false);
  };

  const handleDelete = () => {
    const deletedSede = sede;
    let idTipoJJOOKey: string;

    switch (deletedSede.description) {
      case 'INVIERNO':
        idTipoJJOOKey = 'INVIERNO';
        break;
      case 'VERANO':
        idTipoJJOOKey = 'VERANO';
        break;
      default:
        console.error(`Invalid description: ${deletedSede.description}`);
        return;
    }

    if (!(idTipoJJOOKey in tipoJJOOMap)) {
      console.error(`Invalid idTipoJJOO: ${deletedSede.idTipoJJOO}`);
      return;
    }

    const idTipoJJOO = tipoJJOOMap[idTipoJJOOKey];

    fetch(`http://localhost:8080/sedejjoo/${sede.año}/${idTipoJJOO}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          return response.status;
        } else {
          console.error('Error:', response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
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
          ciudades.find((ciudad: Ciudad) => ciudad.idCiudad === idCiudad)?.nombreCiudad
        )}
      </TableCell>
      <TableCell>
        {editing ? (
          <Button onClick={handleUpdate}>Actualizar</Button>
        ) : (
          <Button onClick={() => setEditing(true)}>Editar</Button>
        )}
      </TableCell>
      <TableCell>
        <Button disabled={!editing} onClick={handleDelete}>Borrar</Button>
      </TableCell>
    </TableRow>
  );
};

export default FilaSede;