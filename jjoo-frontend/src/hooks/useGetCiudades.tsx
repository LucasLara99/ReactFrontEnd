import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ErrorContext } from "./ErrorContext";

export const useGetCiudades = () => {
    const { addError } = useContext(ErrorContext)

    const { data, isPending, error } = useQuery({
        queryKey: ['getCiudades'],
        queryFn: () =>
            fetch('http://localhost:8080/ciudades')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error del servidor');
                    }
                    return response.json();
                })
                .catch(error => {
                    addError({ consultaError: error.toString() });
                    throw error;
                })
    })

    return { data, isPending, error };
}