import React from "react";
import { Grid, Typography, Divider } from '@mui/material';

const Formsectionheader = (props) => {
    return (
        <Grid item xs={12} sm={12} md={12}>
            <center>
                <Typography variant="h6" fontFamily="Bebas Neue">
                    {props.name}
                </Typography>
                <Divider />
            </center>
        </Grid>
    );
};

export default Formsectionheader;
