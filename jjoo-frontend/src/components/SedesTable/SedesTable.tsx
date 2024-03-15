import React from 'react';
import { Sede } from '../../models/Sede';
import FilaSede from '../FilaSede/FilaSede';
import { useSedesTable } from '../../hooks/useSedesTable';
import NotificacionError from '../../NotificacionError/NotificacionError';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface SedesTableProps {
  setCurrentComponent: (component: string) => void;
  onEdit: (isEditing: boolean) => void;
}

const SedesTable = ({ onEdit }: SedesTableProps) => {
  const { sedesConNombreCiudad, sedesPending, sedesError, ciudadesPending, ciudadesError } = useSedesTable();

  if (sedesPending || ciudadesPending) return <div>Loading...</div>
  if (sedesError || ciudadesError) return <NotificacionError />

  const sortedSedes = sedesConNombreCiudad.sort((a: Sede, b: Sede) => a.año - b.año);

  return (
    <div className='w-4/5 mt-4'>
      <div className='rounded-t-lg bg-custom-blue text-white'>
        <div className='flex'>
          <span className='m-2 mt-4 mb-4 flex justify-center items-center flex-1'>AÑO</span>
          <span className='m-2 flex justify-center items-center flex-1'>TEMPORADA</span>
          <span className='m-2 flex justify-center items-center flex-1'>CIUDAD</span>
          <span className='m-2 flex justify-center items-center flex-1'><EditIcon /></span>
          <span className='mt-2 mb-2 mr-7 flex justify-center items-center flex-1'><DeleteOutlineIcon /></span>
        </div>
      </div>
      <div className='shadow-lg'>
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
                  <FilaSede
                    key={`${sede.año}-${sede.description}-${sede.nombreCiudad}`}
                    sede={sede}
                    style={style}
                    onEdit={onEdit} />
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