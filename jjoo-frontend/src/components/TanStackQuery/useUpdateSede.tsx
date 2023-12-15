import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Sede } from '../../models/Sede';

const tipoJJOOMap: { [key: string]: number } = {
  'INVIERNO': 1,
  'VERANO': 2,
};

export const useUpdateSede = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedSede: Sede) => {
      let idTipoJJOOKey: string;

      switch (updatedSede.description) {
        case 'INVIERNO':
          idTipoJJOOKey = 'INVIERNO';
          break;
        case 'VERANO':
          idTipoJJOOKey = 'VERANO';
          break;
        default:
          throw new Error(`Invalid description: ${updatedSede.description}`);
      }

      if (!(idTipoJJOOKey in tipoJJOOMap)) {
        throw new Error(`Invalid idTipoJJOO: ${updatedSede.idTipoJJOO}`);
      }

      const idTipoJJOO = tipoJJOOMap[idTipoJJOOKey as 'INVIERNO' | 'VERANO'];

      return fetch(`http://localhost:8080/sedejjoo/${updatedSede.año}/${idTipoJJOO}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idCiudad: updatedSede.idCiudad,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sedes'] });
    },
  });
};