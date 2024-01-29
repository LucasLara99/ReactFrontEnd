import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ErrorContext } from "./ErrorContext";

export const useGetConsulta = (onError: (error: Error) => void) => {
    const { addError } = useContext(ErrorContext);

    const { data, isPending, error } = useQuery({
        queryKey: ['getConsulta'],
        queryFn: () =>
            fetch('http://localhost:8080/consulta')
                .then(response => {
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