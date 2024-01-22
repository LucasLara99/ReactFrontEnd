import React, { useContext } from 'react';
import { ErrorContext } from '../../hooks/ErrorContext';
import './NotificacionError.css';

const NotificacionError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    return null; // or some fallback UI
  }

  const { errors, removeError } = context;

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