import React, { useEffect } from 'react';
import SedesTable from '../SedesTable/SedesTable';
import CrearSede from '../CrearSede/CrearSede';
import './CrudTab.css';
import { Accordion, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { newtonsCradle } from 'ldrs';
import NotificacionError from '../../NotificacionError/NotificacionError';
import { useCrudTab } from '../../hooks/useCrudTab';
import PortalMessage from '../PortalMessage/PortalMessage';

interface CrudTabProps {
  setCurrentComponent: (component: string) => void;
  label: string;
}

const CrudTab = ({ setCurrentComponent, label }: CrudTabProps) => {
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

  useEffect(() => {
    setCurrentComponent('CrudTab');
  }, []);

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
    <div>
      <div className='crud-tab-container'>
        <SedesTable setCurrentComponent={setCurrentComponent} />
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
      <PortalMessage label={label} />
    </div>
  );
};

export default CrudTab;