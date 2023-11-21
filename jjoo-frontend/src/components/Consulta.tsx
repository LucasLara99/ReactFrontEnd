import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Item {
  id_pais: number;
  nombre_pais: string;
  id_ciudad: number;
  nombre_ciudad: string;
  valor: number;
  descripcion_tipo_jjoo: string | null;
  numero_veces_sede: number;
}

const Consulta = () => {
  const [datos, setDatos] = useState<Item[]>([]);

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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID País</TableCell>
            <TableCell>Nombre País</TableCell>
            <TableCell>ID Ciudad</TableCell>
            <TableCell>Nombre Ciudad</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Número Veces Sede</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((item: Item, index: number) => (
            <TableRow key={index}>
              <TableCell>{item.id_pais}</TableCell>
              <TableCell>{item.nombre_pais}</TableCell>
              <TableCell>{item.id_ciudad}</TableCell>
              <TableCell>{item.nombre_ciudad}</TableCell>
              <TableCell>{item.valor}</TableCell>
              <TableCell>{item.descripcion_tipo_jjoo}</TableCell>
              <TableCell>{item.numero_veces_sede}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Consulta;