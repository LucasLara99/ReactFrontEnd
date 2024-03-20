// FilaSede.tsx
import React, { useContext, useState } from 'react';
import { Sede } from '../../models/Sede';
import { Ciudad } from '../../models/Ciudad';
import { Button, Select, MenuItem } from '@mui/material';
import { useGetCiudades } from '../../hooks/useGetCiudades';
import { useUpdateSede } from '../../hooks/useUpdateSede';
import { useDeleteSede } from '../../hooks/useDeleteSede';
import { ErrorContext } from '../../hooks/ErrorContext';

interface FilaSedeProps {
  sede: Sede;
  style: React.CSSProperties;
  onEdit: (isEditing: boolean) => void; // Actualización de la firma de la función de callback
}

const FilaSede = ({ sede, style, onEdit }: FilaSedeProps) => {
  const [idCiudad, setIdCiudad] = useState(sede.idCiudad);
  const [isEditing, setIsEditing] = useState(false);
  const { addError } = useContext(ErrorContext);

  const handleError = (error: Error) => {
    addError({ filaError: error.toString() });
  };

  const { data: ciudades, isPending: ciudadesPending, error: errorCiudades } = useGetCiudades(handleError);
  const { mutate, isLoadingMutation: isSedeUpdating } = useUpdateSede();
  const { mutate: deleteSede, isLoagingMutation: isSedeDeleting } = useDeleteSede();

  if (ciudadesPending) return <div>Loading...</div>;
  if (errorCiudades) return <div>An error has occurred: {errorCiudades.message}</div>;

  const handleEdit = () => {
    setIsEditing(!isEditing); // Cambiar el estado de isEditing
    onEdit(!isEditing); // Llamar a la función de callback con el nuevo valor de isEditing
  };

  const handleUpdate = () => {
    if (isSedeUpdating) return;
    mutate({ ...sede, idCiudad });
    onEdit(isEditing);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (isSedeDeleting) return;
    deleteSede(sede);
  };

  // Generar el ID de la fila usando los datos de la sede
  const rowId = `${sede.año}-${sede.description}-${sede.nombreCiudad}`;

  return (
    <div className='flex justify-between items-center' style={style}>
      <div className='m-2 flex justify-center items-center flex-1'>{sede.año}</div>
      <div className='m-2 flex justify-center items-center flex-1'>{sede.description}</div>
      <div className='m-2 flex justify-center items-center flex-1'>
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
      <div className='m-2 flex justify-center items-center flex-1'>
        {isEditing ? (
          <Button disabled={isSedeUpdating} onClick={handleUpdate}>Actualizar</Button>
        ) : (
          <Button onClick={handleEdit}>Editar</Button>
        )}
      </div>
      <div className='m-2 flex justify-center items-center flex-1'>
        <Button onClick={handleDelete}>Borrar</Button>
      </div>
    </div>
  );
};

export default FilaSede;
