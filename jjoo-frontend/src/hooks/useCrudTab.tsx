import { useState, useContext } from 'react';
import { useGetCiudades } from './useGetCiudades';
import { usePostSede } from './usePostSede';
import { ErrorContext } from './ErrorContext';
import { SedePost } from '../models/SedePost';

export function useCrudTab() {
    const { addError } = useContext(ErrorContext);
    const handleError = (error: Error) => {
        addError({ crudTabError: error.toString() });
    };

    const { data: ciudades, isPending: ciudadesPending, error: ciudadesError } = useGetCiudades(handleError);
    const { mutate: postSede, isLoadingMutation: isPostingSede } = usePostSede();
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState<number | null>(null);
    const [año, setAño] = useState<number | null>(null);
    const [id_tipo_jjoo, setIdTipoJJOO] = useState<number | null>(null);
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleSubmit = (event: React.FormEvent) => {
        if (isPostingSede) return;
        event.preventDefault();

        if (año == null || ciudadSeleccionada == null || id_tipo_jjoo == null) {
            addError({ crudTabError: 'Todos los campos son requeridos' })
            return;
        }

        const sede: SedePost = {
            año,
            idCiudad: ciudadSeleccionada,
            id_tipo_jjoo
        };

        postSede(sede, {
            onSuccess: () => {
                setExpanded(false);
                setCiudadSeleccionada(null);
                setAño(null);
                setIdTipoJJOO(null);
            }
        });
    };

    return {
        ciudades,
        ciudadesPending,
        ciudadesError,
        ciudadSeleccionada,
        setCiudadSeleccionada,
        año,
        setAño,
        id_tipo_jjoo,
        setIdTipoJJOO,
        expanded,
        handleChange,
        handleSubmit,
        isPostingSede
    };
}