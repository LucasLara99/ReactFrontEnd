import React, { useState, ReactNode } from "react";

type ErrorType = {
    [key: string]: string;
};

type ErrorContextType = {
    errors: ErrorType;
    setErrors: (errors: ErrorType) => void;
    addError: (error: ErrorType) => void;
    removeError: (errorKey: string) => void;
};

export const ErrorContext = React.createContext<ErrorContextType>({
    errors: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setErrors: () => { },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    addError: () => { },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    removeError: () => { },
});

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [errors, setErrors] = useState<ErrorType>({});

    const addError = (error: ErrorType) => {
        setErrors((prevErrors) => {
            if (!Object.prototype.hasOwnProperty.call(prevErrors, Object.keys(error)[0])) {
                return { ...prevErrors, ...error };
            }
            return prevErrors;
        });
    };

    const removeError = (errorKey: string) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[errorKey];
            return newErrors;
        });
    };

    return (
        <ErrorContext.Provider value={{ errors, setErrors, addError, removeError }}>
            {children}
        </ErrorContext.Provider>
    );
};