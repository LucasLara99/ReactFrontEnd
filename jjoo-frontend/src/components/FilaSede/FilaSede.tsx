import React from 'react';
import { Sede } from '../../models/Sede';
import { TableRow, TableCell } from '@mui/material';

interface SedeRowProps {
  sede: Sede;
}

const SedeRow: React.FC<SedeRowProps> = ({ sede }) => {
  return (
    <TableRow key={sede.año}>
      <TableCell>{sede.año}</TableCell>
      <TableCell>{sede.description}</TableCell>
      <TableCell>{sede.nombreCiudad}</TableCell>
    </TableRow>
  );
};

export default SedeRow;