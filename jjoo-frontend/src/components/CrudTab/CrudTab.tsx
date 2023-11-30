import React, { useState, useEffect } from 'react';
import SedesTable from '../SedesTable/SedesTable';
import CrearSede from '../CrearSede/CrearSede';
import './CrudTab.css';
import { Accordion, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Ciudad {
  idCiudad: number;
  nombreCiudad: string;
}

const CrudTab = () => {
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<number | null>(null);
  const [año, setAño] = useState<number | null>(null);
  const [id_tipo_jjoo, setIdTipoJJOO] = useState<number | null>(null);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const [expanded, setExpanded] = React.useState<string | false>(false);

  useEffect(() => {
    fetch('http://localhost:8080/ciudades')
      .then(response => response.json())
      .then(data => setCiudades(data))
      .catch(error => console.error('Error al obtener datos:', error));
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (año == null || ciudadSeleccionada == null || id_tipo_jjoo == null) {
      console.error('Todos los campos son requeridos');
      return;
    }

    const sede = {
      año,
      idCiudad: ciudadSeleccionada,
      id_tipo_jjoo
    };

    fetch('http://localhost:8080/sedejjoo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sede),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

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
            ciudades={ciudades}
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