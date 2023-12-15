import { useQuery } from "@tanstack/react-query";

export const useGetSedes = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['getSedes'],
        queryFn: () =>
            fetch('http://localhost:8080/sedejjoo').then(
                (res) => res.json(),
            ),
    })

    return { data, isPending, error };
}