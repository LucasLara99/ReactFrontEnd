import React, { useContext } from 'react';
import { ErrorContext } from '../../hooks/ErrorContext';

const NotificacionError = () => {
  const { errors, removeError } = useContext(ErrorContext);

  return (
    <div>
      {Object.entries(errors).map(([key, error]) => (
        <div key={key}>
          <p>{error}</p>
          <button onClick={() => removeError(key)}>Close</button>
        </div>
      ))}
    </div>
  );
};

export default NotificacionError;