import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Consulta from './Consulta';
import { useGetConsulta } from '../../hooks/useGetConsulta';


jest.mock('../../hooks/useGetConsulta');

test('Renderiza la tabla cuando los datos se han cargado', async () => {
    (useGetConsulta as jest.Mock).mockReturnValue({
        data: [
            {
                id_pais: 1,
                nombre_pais: 'Test Country',
                id_ciudad: 1,
                nombre_ciudad: 'Test City',
                valor: 100,
                descripcion_tipo_jjoo: 'Test Description',
                numero_veces_sede: 1,
            },
        ],
        isPending: false,
        error: null,
    });

    render(<Consulta />);

    await waitFor(() => {
        expect(screen.getByText('Test Country')).toBeInTheDocument();
        expect(screen.getByText('Test City')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
});