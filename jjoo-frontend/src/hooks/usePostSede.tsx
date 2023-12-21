import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Sede } from '../models/Sede';
import { SedePost } from '../models/SedePost';

export const usePostSede = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newSede: SedePost) => {
      const response = await fetch('http://localhost:8080/sedejjoo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSede),
      });

      if (!response.ok) {
        throw new Error('Error: ' + response.statusText);
      }

      return response.json();
    },
    onMutate: async (newSede: SedePost) => {
      await queryClient.cancelQueries({queryKey: ['getSedes']})

      const previousSedes = queryClient.getQueryData<Sede[]>(['getSedes']);

      queryClient.setQueryData(['getSedes'], (old: Sede[] | undefined) =>
        old ? [...old, newSede] : [newSede]
      );

      return { previousSedes };
    },
    onError: (err, newSede, context) => {
      if (context?.previousSedes) {
        queryClient.setQueryData(['getSedes'], context.previousSedes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['getSedes']});
    },
  });

  return {
    ...mutation,
    isLoadingMutation: mutation.isPending,
  };
};