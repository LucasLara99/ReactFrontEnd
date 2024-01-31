import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FilaSede from "./FilaSede";
import { Sede } from '../../models/Sede';
import { Ciudad } from '../../models/Ciudad';
import { useGetCiudades } from '../../hooks/useGetCiudades';
import { useUpdateSede } from '../../hooks/useUpdateSede';
import { useDeleteSede } from '../../hooks/useDeleteSede';
import { Table, TableBody } from '@mui/material';

// Mock the hooks
jest.mock('../../hooks/useGetCiudades');
jest.mock('../../hooks/useUpdateSede');
jest.mock('../../hooks/useDeleteSede');

describe("FilaSede component", () => {
    const mockSede: Sede = {
        año: 2020,
        description: 'Test Description',
        idCiudad: 1,
        idTipoJJOO: '1',
        nombreCiudad: 'Test City',
    };

    const mockCiudades: Ciudad[] = [
        { idCiudad: 1, nombreCiudad: 'Test City' },
        { idCiudad: 2, nombreCiudad: 'Ciudad2' },
    ];

    beforeEach(() => {
        // Setup the hooks
        (useGetCiudades as jest.Mock).mockReturnValue({
            data: mockCiudades,
            isPending: false,
            error: null,
        });
        (useUpdateSede as jest.Mock).mockReturnValue({
            mutate: jest.fn(),
            isLoadingMutation: false,
        });
        (useDeleteSede as jest.Mock).mockReturnValue({
            mutate: jest.fn(),
            isLoagingMutation: false,
        });

        render(
            <Table>
                <TableBody>
                    <FilaSede sede={mockSede} />
                </TableBody>
            </Table>
        );
    });

    //Se renderiza el componente FilaSede pero no se simula ninguna interacción
    test("renders FilaSede", () => {
        const añoCell = screen.getByText(mockSede.año);
        const descriptionCell = screen.getByText(mockSede.description);
        const ciudadCell = screen.getByText('Test City');

        expect(añoCell).toBeInTheDocument();
        expect(descriptionCell).toBeInTheDocument();
        expect(ciudadCell).toBeInTheDocument();
    });

    // Comprobar comportamiento de los botones de edición y borrado
    test("edit and delete buttons", () => {
        const editButton = screen.getByRole('button', { name: /editar/i });
        const deleteButton = screen.getByRole('button', { name: /borrar/i });

        fireEvent.click(editButton);
        const updateButton = screen.getByRole('button', { name: /actualizar/i });
        expect(updateButton).toBeInTheDocument();

        fireEvent.click(deleteButton);
        // Aquí puedes agregar expectativas para verificar el comportamiento después de hacer clic en el botón de borrar
    });
});