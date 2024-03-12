import React, { useContext, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useGetConsulta } from '../../hooks/useGetConsulta';
import { ConsultaContext } from './ConsultaContext';
import './Consulta.css'; // Si deseas mantener estilos personalizados
import { ErrorContext } from '../../hooks/ErrorContext';
import NotificacionError from '../../NotificacionError/NotificacionError';
import { newtonsCradle } from 'ldrs'
import PortalMessage from '../PortalMessage/PortalMessage';

interface Item {
  id_pais: number;
  nombre_pais: string;
  id_ciudad: number;
  nombre_ciudad: string;
  valor: number;
  descripcion_tipo_jjoo: string | null;
  numero_veces_sede: number;
}

interface ConsultaProps {
  setCurrentComponent: (component: string) => void;
  label: string;
}

const Consulta = ({ setCurrentComponent, label }: ConsultaProps) => {
  const { addError } = useContext(ErrorContext);
  const handleError = (error: Error) => {
    addError({ consultaError: error.toString() });
  };
  const { data, isPending, error } = useGetConsulta(handleError);

  newtonsCradle.register()

  useEffect(() => {
    setCurrentComponent('Consulta');
  }, []);

  if (isPending) return (
    <div className='loader'>
      <l-newtons-cradle
        size="100"
        speed="1.4"
        color="#2196f3"
      ></l-newtons-cradle>
    </div>
  )

  if (error) {
    return <NotificacionError />
  }

  return (
    <div className="px-20 py-10">
      <ConsultaContext.Provider value={data}>
        <div className='consulta'>
          <TableContainer component={Paper} className="shadow-lg rounded-lg">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="px-6 py-3 text-xs font-medium uppercase">ID País</TableCell>
                  <TableCell className="px-6 py-3 text-xs font-medium uppercase">Nombre País</TableCell>
                  <TableCell className="px-6 py-3 text-xs font-medium uppercase">ID Ciudad</TableCell>
                  <TableCell className="px-6 py-3 text-xs font-medium uppercase">Nombre Ciudad</TableCell>
                  <TableCell className="px-6 py-3 text-xs font-medium uppercase">Valor</TableCell>
                  <TableCell className="px-6 py-3 text-xs font-medium uppercase">Descripción</TableCell>
                  <TableCell className="px-6 py-3 text-xs font-medium uppercase">Número Veces Sede</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="bg-white divide-y divide-gray-200">
                {data && data.map((item: Item, index: number) => (
                  <TableRow key={`${item.id_pais}-${item.id_ciudad}-${index}`} className="hover:bg-gray-100">
                    <TableCell className="px-6 py-4 whitespace-nowrap">{item.id_pais}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">{item.nombre_pais}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">{item.id_ciudad}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">{item.nombre_ciudad}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">{item.valor}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">{item.descripcion_tipo_jjoo}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">{item.numero_veces_sede}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ConsultaContext.Provider>
      <PortalMessage label={label} />
    </div>
  );
};

export default Consulta;