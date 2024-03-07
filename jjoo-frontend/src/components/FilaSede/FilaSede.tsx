import React, { useContext, useState } from 'react';
import { Sede } from '../../models/Sede';
import { Ciudad } from '../../models/Ciudad';
import { Button, Select, MenuItem } from '@mui/material';
import { useGetCiudades } from '../../hooks/useGetCiudades';
import { useUpdateSede } from '../../hooks/useUpdateSede';
import { useDeleteSede } from '../../hooks/useDeleteSede';
import { ErrorContext } from '../../hooks/ErrorContext';
import './FilaSede.css';

export const FilaSede = ({ sede, style, onEdit }: { sede: Sede, style: React.CSSProperties, onEdit: (isEditing: boolean) => void }) => {
  const [idCiudad, setIdCiudad] = useState(sede.idCiudad);
  const [isEditing, setIsEditing] = useState(false);
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
    onEdit(false)
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (isSedeDeleting) return;
    deleteSede(sede);
  };

  return (
    <div className='fila-sede' style={style}>
      <div className='fila-sede-item'>{sede.año}</div>
      <div className='fila-sede-item'>{sede.description}</div>
      <div className='fila-sede-item'>
        {isEditing ? (
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
      </div>
      <div className='fila-sede-item'>
        {isEditing ? (
          <Button disabled={isSedeUpdating} onClick={handleUpdate}>Actualizar</Button>
        ) : (
          <Button onClick={() => {
            setIsEditing(true);
            onEdit(true)
          }}>Editar</Button>
        )}
      </div>
      <div className='fila-sede-item'>
        <Button onClick={handleDelete}>Borrar</Button>
      </div>
    </div>
  );
};

export default FilaSede;