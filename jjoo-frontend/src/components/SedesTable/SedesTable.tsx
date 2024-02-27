import React from 'react';
import { Sede } from '../../models/Sede';
import './SedesTable.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilaSede from '../FilaSede/FilaSede';
import { useSedesTable } from '../../hooks/useSedesTable';
import NotificacionError from '../../NotificacionError/NotificacionError';
import { FixedSizeList as List } from 'react-window';

const SedesTable = ({ setCurrentComponent }: { setCurrentComponent: (component: string) => void }) => {
  const { sedesConNombreCiudad, sedesPending, sedesError, ciudadesPending, ciudadesError } = useSedesTable();

  if (sedesPending || ciudadesPending) return <div>Loading...</div>
  if (sedesError || ciudadesError) return <NotificacionError />

  const sortedSedes = sedesConNombreCiudad.sort((a: Sede, b: Sede) => a.año - b.año);

  return (
    <div className='lista-sedes-container'>
      <div className='lista-sedes-header '>
        <span className='span1'>Año</span>
        <span className='span2'>Temporada</span>
        <span className='span3'>Ciudad</span>
        <span className='span4'>Editar</span>
        <span className='span5'>Borrar</span>
      </div>
      <div className='lista-sedes'>
        <List
          height={500} // Altura de la ventana de visualización
          itemCount={sortedSedes.length} // Número total de elementos en la lista
          itemSize={60} // Altura de cada elemento de la lista
          width={1450}
        >
          {({ index, style }: { index: number; style: React.CSSProperties }) => {
            const sede = sortedSedes[index];
            return (
              <FilaSede key={`${sede.año}-${sede.description}-${sede.nombreCiudad}`} sede={sede} setCurrentComponent={setCurrentComponent} style={style} />
            );
          }}
        </List>
      </div>
    </div>
  );
};

export default SedesTable;