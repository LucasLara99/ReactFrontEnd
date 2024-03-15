import React, { useEffect, useState } from 'react';
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
}

const CrudTab = ({ setCurrentComponent }: CrudTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
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

  const handleEdit = (isEditing: boolean) => {
    setIsEditing(isEditing);
  };

  newtonsCradle.register();

  useEffect(() => {
    setCurrentComponent(isEditing ? 'Editando' : 'CrudTab');
  }, [isEditing]);

  if (ciudadesPending || isPostingSede) {
    return (
      <div className='loader'>
        <l-newtons-cradle
          size="100"
          speed="1.4"
          color="#2196f3"
        ></l-newtons-cradle>
      </div>
    );
  }

  if (ciudadesError) {
    return <NotificacionError />;
  }

  return (
    <div>
      <div className='crud-tab-container'>
        <SedesTable setCurrentComponent={setCurrentComponent} onEdit={handleEdit} />
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
      {isEditing ? <PortalMessage label={'Estoy editando'} /> : <PortalMessage label={'Estoy en CrudTab'} />}
    </div>
  );
};

export default CrudTab;
