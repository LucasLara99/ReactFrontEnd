import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './SedesTable.css';
import SedeRow from '../FilaSede/FilaSede';

interface Sede {
  año: number;
  description: string;
  idCiudad: number;
  nombreCiudad: string;
}

const SedesTable = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/sedejjoo')
      .then(response => response.json())
      .then(data => setSedes(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className='tabla-sedes'>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Año</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Nombre Ciudad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sedes.map((sede: Sede) => (
              <SedeRow key={sede.año} sede={sede} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SedesTable;