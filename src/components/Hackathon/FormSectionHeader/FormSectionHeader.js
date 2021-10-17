import React from "react";
import { Grid, Typography, Divider } from '@mui/material';
import theme from '../../ui/Theme';

const Formsectionheader = (props) => {
    return (
        <Grid item xs={12} sm={12} md={12} margin="20px 0">
            <center>
                <Typography variant="h4" fontFamily="Bebas Neue" color={theme.palette.common.orangeColor}>
                    {props.name}
                </Typography>
                <Divider style={{border: "0.1px solid", borderColor: theme.palette.secondary.main}}/>
            </center>
        </Grid>
    );
};

export default Formsectionheader;
