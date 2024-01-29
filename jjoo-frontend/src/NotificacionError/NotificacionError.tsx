import React, { useContext } from 'react';
import { ErrorContext } from '../hooks/ErrorContext';
import './NotificacionError.css';

const NotificacionError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    return null;
  }

  const { errors, removeError } = context;

  // Si no hay errores, no renderizar nada
  if (Object.keys(errors).length === 0) {
    return null;
  }

  // Obtener el último error
  const lastErrorKey = Object.keys(errors).slice(-1)[0];
  const lastError = errors[lastErrorKey];

  return (
    <div className='notificacionError'>
      <div key={lastErrorKey}>
        <p>{lastError}</p>
        <button aria-label="Close error message" onClick={() => removeError(lastErrorKey)}>Close</button>
      </div>
    </div>
  );
};

export default NotificacionError;