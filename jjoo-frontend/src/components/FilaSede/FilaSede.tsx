import React, { useContext, useState } from 'react';
import { Sede } from '../../models/Sede';
import { Ciudad } from '../../models/Ciudad';
import { TableRow, TableCell, Button, Select, MenuItem } from '@mui/material';
import { useGetCiudades } from '../../hooks/useGetCiudades';
import { useUpdateSede } from '../../hooks/useUpdateSede';
import { useDeleteSede } from '../../hooks/useDeleteSede';
import { ErrorContext } from '../../hooks/ErrorContext';

export const FilaSede = ({ sede }: { sede: Sede }) => {
  const [editing, setEditing] = useState(false);
  const [idCiudad, setIdCiudad] = useState(sede.idCiudad);
  const { addError } = useContext(ErrorContext);
  const handleError = (error: Error) => {
    addError({ filaError: error.toString() });
  };

  const { data: ciudades, isPending: ciudadesPending, error: errorCiudades } = useGetCiudades(handleError);
  const { mutate, isLoadingMutation: isSedeUpdating } = useUpdateSede()
  const { mutate: deleteSede, isLoagingMutation: isSedeDeleting } = useDeleteSede()

  if (ciudadesPending) return <div>Loading...</div>
  if (errorCiudades) return <div>An error has occurred: {errorCiudades.message}</div>

  const handleUpdate = () => {
    if (isSedeUpdating) return;
    mutate({ ...sede, idCiudad });
    setEditing(false);
  };

  const handleDelete = () => {
    if (isSedeDeleting) return;
    deleteSede(sede);
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
          <Button disabled={isSedeUpdating} onClick={handleUpdate}>Actualizar</Button>
        ) : (
          <Button onClick={() => setEditing(true)}>Editar</Button>
        )}
      </TableCell>
      <TableCell>
        <Button onClick={handleDelete}>Borrar</Button>
      </TableCell>
    </TableRow>
  );
};

export default FilaSede;