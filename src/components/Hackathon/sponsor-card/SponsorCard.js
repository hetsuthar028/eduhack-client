import React, { useState } from 'react';
import {Container, Grid, Button, TextField, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    parent: {
        margin: "20px"
    }, 
    innerGrid: {
        padding: "10px"
    }
}));

const initialValues = {
    probTitle: "",
    probDescription: "",
    probRefLinks: ""
}

const Sponsorcard = (props) => {



    const classes = useStyles();

    return (
        
    );
}

export default Sponsorcard;
