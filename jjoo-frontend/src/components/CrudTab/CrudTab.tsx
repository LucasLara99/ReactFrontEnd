import React, { useState } from 'react';
import SedesTable from '../SedesTable/SedesTable';
import CrearSede from '../CrearSede/CrearSede';
import './CrudTab.css';
import { Accordion, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetCiudades } from '../../hooks/useGetCiudades';
import { usePostSede } from '../../hooks/usePostSede';
import { SedePost } from '../../models/SedePost';

const CrudTab = () => {
  const { data: ciudades, isPending: ciudadesPending, error: ciudadesError } = useGetCiudades();
  const { mutate: postSede, isLoadingMutation: isPostingSede } = usePostSede();
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<number | null>(null);
  const [año, setAño] = useState<number | null>(null);
  const [id_tipo_jjoo, setIdTipoJJOO] = useState<number | null>(null);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleSubmit = (event: React.FormEvent) => {
    if (isPostingSede) return;
    event.preventDefault();

    if (año == null || ciudadSeleccionada == null || id_tipo_jjoo == null) {
      console.error('Todos los campos son requeridos');
      return;
    }

    const sede: SedePost = {
      año,
      idCiudad: ciudadSeleccionada,
      id_tipo_jjoo
    };

    postSede(sede, {
      onSuccess: () => {
        setExpanded(false);
        setCiudadSeleccionada(null);
        setAño(null);
        setIdTipoJJOO(null);
      }
    });
  };

  if (ciudadesPending) return <div>Loading...</div>
  if (ciudadesError) return <div>An error has occurred: {ciudadesError?.message}</div>

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