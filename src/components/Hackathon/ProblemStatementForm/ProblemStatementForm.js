import React, { useState } from 'react';
import {Container, Grid, Button, TextField, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import Formsectionheader from '../FormSectionHeader/FormSectionHeader';

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

const Problemstatementform = (props) => {

    const classes = useStyles();
    const {setOpenPopup, handleSubmit} = props;

    const [probDetails, setProbDetails] = useState(initialValues);

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setProbDetails({
            ...probDetails,
            [name] : value
        })
    }

    return (
        <div className={classes.parent}>
            <Grid container xs={12} md={12} sm={12}>
                <Grid item sm={12} md={12} sm={12} className={classes.innerGrid}>
                    <TextField
                        label="Problem Statement Title"
                        name="probTitle"
                        size="small"
                        type="text"
                        fullWidth
                        value={probDetails.probTitle}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item sm={12} md={12} sm={12} className={classes.innerGrid}>
                    <TextField
                        label="Problem Statement Description"
                        name="probDescription"
                        size="small"
                        type="text"
                        fullWidth
                        value={probDetails.probDescription}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>

                <Formsectionheader name="Reference Material" className={classes.innerGrid} />

                <Grid item sm={12} md={12} sm={12} className={classes.innerGrid}>
                    <TextField
                        label="Reference Links"
                        name="probRefLinks"
                        size="small"
                        type="text"
                        value={probDetails.probRefLinks}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item sm={12} md={12} sm={12} className={classes.innerGrid}>
                    <center>
                    <Button variant="contained" size="large" style={{margin: "10px"}} onClick={() => handleSubmit(probDetails)}>Add</Button>
                    <Button variant="contained" size="large" style={{margin: "10px"}}
                        onClick={()=>setOpenPopup(false)}    
                    >
                        Cancel
                    </Button>
                    </center>
                </Grid>

            </Grid>
        </div>
    );
}

export default Problemstatementform;
