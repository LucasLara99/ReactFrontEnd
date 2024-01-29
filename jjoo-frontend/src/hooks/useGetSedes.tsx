import { useQuery } from "@tanstack/react-query";
import { ErrorContext } from "./ErrorContext";
import { useContext } from "react";

export const useGetSedes = (onError: (error: Error) => void) => {
    const { addError } = useContext(ErrorContext)

    const { data, isPending, error } = useQuery({
        queryKey: ['getSedes'],
        queryFn: () =>
            fetch('http://localhost:8080/sedejjoo').then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text);
                    });
                }
                return response.json();
            })
                .catch(error => {
                    addError({ consultaError: error.toString() });
                    if (onError) {
                        onError(error);
                    }
                    throw error;
                })
    })

    return { data, isPending, error };
}