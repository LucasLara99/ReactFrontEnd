import { useQuery } from "@tanstack/react-query";

export const useGetCiudades = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['getCiudades'],
        queryFn: () =>
            fetch('http://localhost:8080/ciudades').then(
                (res) => res.json(),
            ),
    })

    return { data, isPending, error };
}