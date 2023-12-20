import React from 'react';
import { Sede } from '../../models/Sede';
import { Ciudad } from '../../models/Ciudad';
import './SedesTable.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilaSede from '../FilaSede/FilaSede';
import { useGetSedes } from '../../hooks/useGetSedes';
import { useGetCiudades } from '../../hooks/useGetCiudades';


const SedesTable = () => {
  const { data: sedesData, isPending: sedesPending, error: sedesError } = useGetSedes();
  const { data: ciudades, isPending: ciudadesPending, error: ciudadesError } = useGetCiudades();

  const ciudadMap = React.useMemo(() => {
    if (!ciudades) {
      return {};
    }

    return ciudades.reduce((map: { [key: number]: string }, ciudad: Ciudad) => {
      map[ciudad.idCiudad] = ciudad.nombreCiudad;
      return map;
    }, {});
  }, [ciudades]);

  const sedesConNombreCiudad = React.useMemo(() => {
    if (!sedesData) {
      return [];
    }

    return sedesData.map((sede: Sede, index: number) => ({
      ...sede,
      nombreCiudad: ciudadMap[sede.idCiudad],
      key: `${sede.año}-${sede.description}-${index}`,
    }));
  }, [sedesData, ciudadMap]);

  if (sedesPending || ciudadesPending) return <div>Loading...</div>
  if (sedesError || ciudadesError) return <div>An error has occurred: {sedesError?.message} {ciudadesError?.message}</div>

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
            {sedesConNombreCiudad.sort((a:Sede, b:Sede) => a.año - b.año).map((sede: Sede, index: number) => (
              <FilaSede key={index} sede={sede} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SedesTable;