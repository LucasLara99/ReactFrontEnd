import React from 'react';
import { Sede } from '../../models/Sede';
import './SedesTable.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilaSede from '../FilaSede/FilaSede';
import { useSedesTable } from '../../hooks/useSedesTable';
import NotificacionError from '../../NotificacionError/NotificacionError';

const SedesTable = () => {
  const { sedesConNombreCiudad, sedesPending, sedesError, ciudadesPending, ciudadesError } = useSedesTable();

  if (sedesPending || ciudadesPending) return <div>Loading...</div>
  if (sedesError || ciudadesError) return <NotificacionError />

  return (
    <div className='tabla-sedes'>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Año</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Nombre Ciudad</TableCell>
              <TableCell><EditIcon /></TableCell>
              <TableCell><DeleteIcon /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sedesConNombreCiudad.sort((a: Sede, b: Sede) => a.año - b.año).map((sede: Sede) => (
              <FilaSede key={`${sede.año}-${sede.description}-${sede.nombreCiudad}`} sede={sede} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SedesTable;