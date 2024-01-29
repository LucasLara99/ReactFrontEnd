import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Sede } from '../models/Sede';
import { useContext } from 'react';
import { ErrorContext } from './ErrorContext';

const tipoJJOOMap: { [key: string]: number } = {
    'INVIERNO': 1,
    'VERANO': 2,
};

export const useDeleteSede = () => {
    const queryClient = useQueryClient();
    const { addError } = useContext(ErrorContext);

    const mutation = useMutation({
        mutationFn: async (deletedSede: Sede) => {
            let idTipoJJOOKey: string;

            switch (deletedSede.description) {
                case 'INVIERNO':
                    idTipoJJOOKey = 'INVIERNO';
                    break;
                case 'VERANO':
                    idTipoJJOOKey = 'VERANO';
                    break;
                default:
                    addError({ descriptionError: `Invalid description: ${deletedSede.description}` }); // Usar addError
                    return;
            }

            if (!(idTipoJJOOKey in tipoJJOOMap)) {
                addError({ idTipoJJOOError: `Invalid idTipoJJOO: ${deletedSede.idTipoJJOO}` }); // Usar addError
                return;
            }

            const idTipoJJOO = tipoJJOOMap[idTipoJJOOKey];

            return fetch(`http://localhost:8080/sedejjoo/${deletedSede.año}/${idTipoJJOO}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        return response.status;
                    } else {
                        addError({ fetchError: `Error: ${response.statusText}` }); // Usar addError
                    }
                })
                .catch(error => addError({ fetchError: `Error: ${error}` })); // Usar addError
        },
        onMutate: async (deletedSede: Sede) => {
            await queryClient.cancelQueries({ queryKey: ['getSedes'] })

            const previousSedes = queryClient.getQueryData<Sede[]>(['getSedes']);

            queryClient.setQueryData(['getSedes'], (old: Sede[] | undefined) =>
                old?.filter(sede => !(sede.año === deletedSede.año && sede.idTipoJJOO === deletedSede.idTipoJJOO))
            );

            return { previousSedes };
        },
        onError: (err, deletedSede, context) => {
            queryClient.setQueryData(['getSedes'], context?.previousSedes);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['getSedes'] });
        }
    });
    return {
        ...mutation,
        isLoagingMutation: mutation.isPending
    }
}