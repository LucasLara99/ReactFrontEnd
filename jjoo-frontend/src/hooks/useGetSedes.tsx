import { useQuery } from "@tanstack/react-query";
import { ErrorContext } from "./ErrorContext";
import { useContext } from "react";

export const useGetSedes = () => {
    const { addError } = useContext(ErrorContext)

    const { data, isPending, error } = useQuery({
        queryKey: ['getSedes'],
        queryFn: () =>
            fetch('http://localhost:8080/sedejjoo').then(response => {
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