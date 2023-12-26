import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Sede } from '../models/Sede';

const tipoJJOOMap: { [key: string]: number } = {
    'INVIERNO': 1,
    'VERANO': 2,
};

export const useDeleteSede = () => {
    const queryClient = useQueryClient();

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
                    console.error(`Invalid description: ${deletedSede.description}`);
                    return;
            }

            if (!(idTipoJJOOKey in tipoJJOOMap)) {
                console.error(`Invalid idTipoJJOO: ${deletedSede.idTipoJJOO}`);
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
                        console.error('Error:', response.statusText);
                    }
                })
                .catch(error => console.error('Error:', error));
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
            queryClient.invalidateQueries({queryKey: ['getSedes']});
        }
    });
    return {
        ... mutation,
        isLoagingMutation: mutation.isPending
    }
}