import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const useSedes = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['getData'],
        queryFn: () =>
            fetch('http://localhost:8080/sedejjoo').then(
                (res) => res.json(),
            ),
    })

    return { data, isPending, error };
}