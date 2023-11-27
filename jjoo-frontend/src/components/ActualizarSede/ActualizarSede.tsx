import { Button, Grid, Select } from '@mui/material';
import React from 'react';

const ActualizarSede = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <Select>
                    
                </Select>
            </Grid>
            <Grid item xs={3}>
                <Button fullWidth>Actualizar Sede</Button>
            </Grid>
        </Grid>
    );
};

export default ActualizarSede;