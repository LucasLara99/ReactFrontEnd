import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ErrorContext } from "./ErrorContext";

export const useGetConsulta = () => {
    const { addError } = useContext(ErrorContext);

    const { data, isPending, error } = useQuery({
        queryKey: ['getConsulta'],
        queryFn: () =>
            fetch('http://localhost:8080/consulta')
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