import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Consulta from './Consulta';
import fetchMock from 'fetch-mock';
import renderWithProviders from './test-utils';

type ErrorType = {
	[key: string]: string;
};

describe('Componente Consulta', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	test('Maneja los errores correctamente', async () => {
		// Simula un error HTTP en la respuesta de la API
		fetchMock.mock('http://localhost:8080/consulta', 500);

		const mockAddError = jest.fn();

		renderWithProviders(<Consulta />, null, { errors: {}, addError: mockAddError, removeError: (errorKey: string) => { console.log(`removeError called with key: ${errorKey}`); }, setErrors: (errors: ErrorType) => { console.log(`setErrors called with errors: ${JSON.stringify(errors)}`); } });

		await waitFor(() => {
			expect(mockAddError).toHaveBeenCalled()
		});
	});

	test('Renderiza la tabla cuando los datos se han cargado', async () => {
		fetchMock.mock('http://localhost:8080/consulta',
			[
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
		);

		// Envuelve el componente en un QueryClientProvider y ConsultaContext.Provider
		renderWithProviders(<Consulta />, null);

		await waitFor(() => {
			expect(screen.getByText('Test Country')).toBeInTheDocument();
			expect(screen.getByText('Test City')).toBeInTheDocument();
			expect(screen.getByText('Test Description')).toBeInTheDocument();
		});

		// Verifica que la API se llamó correctamente
		expect(fetchMock.called('http://localhost:8080/consulta')).toBe(true);
	});
});