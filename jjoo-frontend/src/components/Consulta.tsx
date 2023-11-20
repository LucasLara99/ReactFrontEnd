// Consulta.tsx
import React, { useState, useEffect } from 'react';
import ConsultaItem from './ConsultaItem';

const Consulta = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/consulta')
      .then(response => response.json())
      .then(data => {
        setDatos(data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  return (
    <div>
      {datos.map((item, index) => (
        <ConsultaItem key={index} item={item} />
      ))}
    </div>
  );
};

export default Consulta;