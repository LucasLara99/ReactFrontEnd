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
    setErrors: () => { throw new Error("setErrors function must be overridden"); },
    addError: () => { throw new Error("addError function must be overridden"); },
    removeError: () => { throw new Error("removeError function must be overridden"); },
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