import React, { useContext } from 'react';
import { ErrorContext } from '../../hooks/ErrorContext';
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

  return (
    <div className='notificacionError'>
      {Object.entries(errors).map(([key, error]) => (
        <div key={key}>
          <p>{error}</p>
          <button aria-label="Close error message" onClick={() => removeError(key)}>Close</button>
        </div>
      ))}
    </div>
  );
};

export default NotificacionError;