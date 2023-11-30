import React, { useState, useEffect } from 'react';
import { Sede } from '../../models/Sede';
import { Ciudad } from '../../models/Ciudad';
import './SedesTable.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SedeRow from '../FilaSede/FilaSede';

const tipoJJOOMap: { [key: string]: number } = {
  'INVIERNO': 1,
  'VERANO': 2,
};

const SedesTable = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/sedejjoo')
      .then(response => response.json())
      .then(data => setSedes(data))
      .catch(error => console.error('Error:', error));

    fetch('http://localhost:8080/ciudades')
      .then(response => response.json())
      .then(data => setCiudades(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleUpdate = (updatedSede: Sede) => {
    let idTipoJJOOKey: string;

    switch (updatedSede.description) {
      case 'INVIERNO':
        idTipoJJOOKey = 'INVIERNO';
        break;
      case 'VERANO':
        idTipoJJOOKey = 'VERANO';
        break;
      default:
        console.error(`Invalid description: ${updatedSede.description}`);
        return;
    }

    if (!(idTipoJJOOKey in tipoJJOOMap)) {
      console.error(`Invalid idTipoJJOO: ${updatedSede.idTipoJJOO}`);
      return;
    }

    const idTipoJJOO = tipoJJOOMap[idTipoJJOOKey];
    fetch(`http://localhost:8080/sedejjoo/${updatedSede.año}/${idTipoJJOO}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idCiudad: updatedSede.idCiudad,
      }),
    })
      .then(response => {
        if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
          return response.json();
        } else {
          return null;
        }
      })
      .then(data => {
        const updatedSedes = sedes.map(s => {
          if (s.año === updatedSede.año && s.idTipoJJOO && s.idTipoJJOO.toLowerCase() === idTipoJJOOKey) {
            return data;
          } else {
            return s;
          }
        });
        setSedes(updatedSedes);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className='tabla-sedes'>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Año</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Nombre Ciudad</TableCell>
              <TableCell><EditIcon></EditIcon></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sedes.map((sede: Sede) => (
              <SedeRow
                key={`${sede.año} ${sede.description}`}
                sede={sede}
                onUpdate={handleUpdate}
                ciudades={ciudades}
                ciudadSeleccionada={ciudadSeleccionada}
                setCiudadSeleccionada={setCiudadSeleccionada}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SedesTable;