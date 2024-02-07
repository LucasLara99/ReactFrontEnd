import React from 'react';
import SedesTable from '../SedesTable/SedesTable';
import CrearSede from '../CrearSede/CrearSede';
import './CrudTab.css';
import { Accordion, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { newtonsCradle } from 'ldrs';
import NotificacionError from '../../NotificacionError/NotificacionError';
import { useCrudTab } from '../../hooks/useCrudTab';

const CrudTab = () => {
  const {
    ciudades,
    ciudadesPending,
    ciudadesError,
    ciudadSeleccionada,
    setCiudadSeleccionada,
    año,
    setAño,
    id_tipo_jjoo,
    setIdTipoJJOO,
    expanded,
    handleChange,
    handleSubmit,
    isPostingSede
  } = useCrudTab();

  newtonsCradle.register()

  if (ciudadesPending || isPostingSede) return (
    <div className='loader'>
      <l-newtons-cradle
        size="100"
        speed="1.4"
        color="#2196f3"
      ></l-newtons-cradle>
    </div>
  )

  if (ciudadesError) return <NotificacionError />

  return (
    <div className='crud-tab-container'>
      <div className='table-container'>
        <SedesTable />
      </div>
      <Accordion className="crud-tab-accordion" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Crear una nueva sede</Typography>
        </AccordionSummary>
        <div className='crear-sede'>
          <CrearSede
            ciudades={ciudades || []}
            ciudadSeleccionada={ciudadSeleccionada}
            setCiudadSeleccionada={setCiudadSeleccionada}
            año={año}
            setAño={setAño}
            id_tipo_jjoo={id_tipo_jjoo}
            setIdTipoJJOO={setIdTipoJJOO}
            handleSubmit={handleSubmit}
          />
        </div>
      </Accordion>
    </div>
  );
};

export default CrudTab;