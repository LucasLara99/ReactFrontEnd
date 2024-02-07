import { renderHook } from '@testing-library/react';
import { useSedesTable } from './useSedesTable';
import { useGetSedes } from './useGetSedes';
import { useGetCiudades } from './useGetCiudades';

jest.mock('./useGetSedes');
jest.mock('./useGetCiudades');

describe('useSedesTable', () => {
    it('should return correct data', () => {
        (useGetSedes as jest.Mock).mockReturnValue({
            data: [{ idCiudad: 1, año: 2022, description: 'Test Sede' }],
            isPending: false,
            error: null,
        });
        (useGetCiudades as jest.Mock).mockReturnValue({
            data: [{ idCiudad: 1, nombreCiudad: 'Test Ciudad' }],
            isPending: false,
            error: null,
        });

        const { result } = renderHook(() => useSedesTable());

        expect(result.current.sedesConNombreCiudad).toEqual([
            { idCiudad: 1, año: 2022, description: 'Test Sede', nombreCiudad: 'Test Ciudad', key: '2022-Test Sede-0' },
        ]);
        expect(result.current.sedesPending).toBe(false);
        expect(result.current.sedesError).toBe(null);
        expect(result.current.ciudadesPending).toBe(false);
        expect(result.current.ciudadesError).toBe(null);
    });
});