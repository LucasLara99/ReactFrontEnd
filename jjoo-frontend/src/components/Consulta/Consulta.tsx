import React, { useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useGetConsulta } from '../../hooks/useGetConsulta';
import { ConsultaContext } from './ConsultaContext';
import './Consulta.css';
import { ErrorContext } from '../../hooks/ErrorContext';

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
  const { data, isPending, error } = useGetConsulta();
  const { errors } = useContext(ErrorContext);

  if (isPending) return <div>Loading...</div>
  if (error || errors.consultaError) {
    return <div>An error has occurred: {String(error || errors.consultaError)}</div>
  }

  return (
    <ConsultaContext.Provider value={data}>
      <div className='consulta'>
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
              {data && data.map((item: Item, index: number) => (
                <TableRow key={`${item.id_pais}-${item.id_ciudad}-${index}`}>
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
      </div>
    </ConsultaContext.Provider>
  );
};

export default Consulta;