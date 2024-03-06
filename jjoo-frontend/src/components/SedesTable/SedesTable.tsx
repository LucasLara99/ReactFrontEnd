import React from 'react';
import { Sede } from '../../models/Sede';
import './SedesTable.css';
import FilaSede from '../FilaSede/FilaSede';
import { useSedesTable } from '../../hooks/useSedesTable';
import NotificacionError from '../../NotificacionError/NotificacionError';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const SedesTable = ({ setCurrentComponent }: { setCurrentComponent: (component: string) => void }) => {
  const { sedesConNombreCiudad, sedesPending, sedesError, ciudadesPending, ciudadesError } = useSedesTable();

  if (sedesPending || ciudadesPending) return <div>Loading...</div>
  if (sedesError || ciudadesError) return <NotificacionError />

  const sortedSedes = sedesConNombreCiudad.sort((a: Sede, b: Sede) => a.año - b.año);

  return (
    <div className='main-container'>
      <div className='header-container'>
        <div className='header'>
          <span className='span1'>Año</span>
          <span className='span2'>Temporada</span>
          <span className='span3'>Ciudad</span>
          <span className='span4'><EditIcon /></span>
          <span className='span5'><DeleteOutlineIcon /></span>
        </div>
      </div>
      <div className='lista-sedes-container'>
        <AutoSizer style={{ height: '480px', width: '100%' }}>
          {({ height, width }: { height: number, width: number }) => (
            <List
              height={height}
              itemCount={sortedSedes.length}
              itemSize={60}
              width={width}
            >
              {({ index, style }: { index: number, style: React.CSSProperties }) => {
                const sede = sortedSedes[index];
                return (
                  <FilaSede key={`${sede.año}-${sede.description}-${sede.nombreCiudad}`} sede={sede} setCurrentComponent={setCurrentComponent} style={style} />
                );
              }}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default SedesTable;