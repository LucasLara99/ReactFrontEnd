import { renderHook, act } from '@testing-library/react';
import { ErrorContext } from './ErrorContext';
import { useCrudTab } from './useCrudTab';
import { ReactNode } from 'react';
import { FormEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('useCrudTab', () => {
    it('should handle submit correctly', async () => {
        const addError = jest.fn();
        const queryClient = new QueryClient();

        const wrapper = ({ children }: { children?: ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                <ErrorContext.Provider value={{ errors: {}, addError, setErrors: () => { }, removeError: () => { } }}>
                    {children}
                </ErrorContext.Provider>
            </QueryClientProvider>
        );

        const { result } = renderHook(() => useCrudTab(), { wrapper });

        const mockEvent = {
            preventDefault: jest.fn(),
            currentTarget: { checkValidity: () => true },
        } as unknown as FormEvent<HTMLFormElement>;

        await act(async () => {
            result.current.handleSubmit(mockEvent);
        });

        expect(addError).toHaveBeenCalledWith({ crudTabError: 'Todos los campos son requeridos' });
    });
});