import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Sede } from '../models/Sede';
import { useContext } from 'react';
import { ErrorContext } from './ErrorContext';

const tipoJJOOMap: { [key: string]: number } = {
  'INVIERNO': 1,
  'VERANO': 2,
};

export const useUpdateSede = () => {
  const queryClient = useQueryClient();
  const { addError } = useContext(ErrorContext);

  const mutation = useMutation({
    mutationFn: async (updatedSede: Sede) => {
      let idTipoJJOOKey: string;

      switch (updatedSede.description) {
        case 'INVIERNO':
          idTipoJJOOKey = 'INVIERNO';
          break;
        case 'VERANO':
          idTipoJJOOKey = 'VERANO';
          break;
        default:
          addError({ descriptionError: `Invalid description: ${updatedSede.description}` }); 
          return;
      }

      if (!(idTipoJJOOKey in tipoJJOOMap)) {
        addError({ idTipoJJOOError: `Invalid idTipoJJOO: ${updatedSede.idTipoJJOO}` }); 
        return;
      }

      const idTipoJJOO = tipoJJOOMap[idTipoJJOOKey as 'INVIERNO' | 'VERANO'];

      const response = await fetch(`http://localhost:8080/sedejjoo/${updatedSede.año}/${idTipoJJOO}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idCiudad: updatedSede.idCiudad,
        }),
      });

      if (!response.ok) {
        addError({ fetchError: `Error: ${response.statusText}` }); 
        return;
      }

      return response.json();
    },
    onMutate: async (updatedSede: Sede) => {
      await queryClient.cancelQueries({ queryKey: ['getSedes'] })

      const previousSedes = queryClient.getQueryData<Sede[]>(['getSedes']);

      queryClient.setQueryData(['getSedes'], (old: Sede[] | undefined) =>
        old?.map(sede => sede.año === updatedSede.año && sede.idTipoJJOO === updatedSede.idTipoJJOO ? updatedSede : sede)
      );

      return { previousSedes };
    },
    onError: (err, updatedSede, context) => {
      if (context?.previousSedes) {
        queryClient.setQueryData(['getSedes'], context.previousSedes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getSedes'] });
    },
  })

  return {
    ...mutation,
    isLoadingMutation: mutation.isPending,
  };
};