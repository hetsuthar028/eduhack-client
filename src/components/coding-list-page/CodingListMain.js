import React, { useState, useEffect } from 'react';
import NavBar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import Questioncard from './QuestionCard';
import Questionlist from './QuestionList';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "40px 20px"
    },
    
    sectionHeader: {
        padding: "0 10px"
    }
}));

const Codinglistmain = () => {

    const classes = useStyles();

    

    return (        
        <>
            <NavBar />
            <div>
                <Grid container className={classes.container}>

                    {/* Section Title */}
                    <Grid item xs={12} sm={12} md={12} style={{display: "flex"}}>
                        <Typography 
                            fontFamily="Open Sans"
                            style={{textDecoration: "underline"}}
                            className={classes.sectionHeader}
                            variant="h6"
                        >
                            Coding
                        </Typography>

                        <Typography 
                            fontFamily="Open Sans"
                            className={classes.sectionHeader}
                            variant="h6"
                        >
                            >
                        </Typography>

                        <Typography 
                            fontFamily="Open Sans"
                            style={{textDecoration: "underline"}}
                            className={classes.sectionHeader}
                            variant="h6"
                        >
                            Python
                        </Typography>
                    </Grid>

                    {/* Questions List */}
                    <Questionlist />
                </Grid>
            </div>
            <Footer />
        </>
    );
}

export default Codinglistmain;
