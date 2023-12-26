import { useQuery } from "@tanstack/react-query";

export const useGetConsulta = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['getConsulta'],
        queryFn: () =>
            fetch('http://localhost:8080/consulta')
                .then(response => response.json())
    })

    return { data, isPending, error };
}
