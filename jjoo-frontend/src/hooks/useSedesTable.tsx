import React, { useContext } from "react";
import { ErrorContext } from "./ErrorContext";
import { useGetSedes } from "./useGetSedes";
import { useGetCiudades } from "./useGetCiudades";
import { Ciudad } from "../models/Ciudad";
import { Sede } from "../models/Sede";

export function useSedesTable() {
    const { addError } = useContext(ErrorContext);
    const handleError = (error: Error) => {
        addError({ sedesTableError: error.toString() });
    };
    const { data: sedesData, isPending: sedesPending, error: sedesError } = useGetSedes(handleError);
    const { data: ciudades, isPending: ciudadesPending, error: ciudadesError } = useGetCiudades(handleError);

    const ciudadMap = React.useMemo(() => {
        if (!ciudades) {
            return {};
        }

        return ciudades.reduce((map: { [key: number]: string }, ciudad: Ciudad) => {
            map[ciudad.idCiudad] = ciudad.nombreCiudad;
            return map;
        }, {});
    }, [ciudades]);

    const sedesConNombreCiudad = React.useMemo(() => {
        if (!sedesData) {
            return [];
        }

        return sedesData.map((sede: Sede, index: number) => ({
            ...sede,
            nombreCiudad: ciudadMap[sede.idCiudad],
            key: `${sede.año}-${sede.description}-${index}`,
        }));
    }, [sedesData, ciudadMap]);

    return {
        sedesConNombreCiudad,
        sedesPending,
        sedesError,
        ciudadesPending,
        ciudadesError,
        handleError,
        addError
    };
}