import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
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

const Codinglistmain = (props) => {

    const classes = useStyles();
    const [category, setCategory] = useState('');
    const history = useHistory();

    useEffect(() => {
        let pathname = props.location.pathname.split("/");
        // "/coding/practice/javascript"
        // "/coding/practice/python"
        // "/coding/practice/data-structures"

        switch(pathname[3]){
            case "javascript": 
                setCategory('javascript');
                break;
            case "python": 
                setCategory('python');
                break;
            case "c++": 
                setCategory('c++');
                break;
            case "data-structures": 
                setCategory('data-structures');
                break;
            case "algorithms": 
                setCategory('algorithms');
                break;
            default :
                history.push('/dashboard');
        }
    })
    

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
                            {`${category.charAt(0).toUpperCase()}${category.slice(1)}`}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                    {/* Questions List */}
                    {
                        category && <Questionlist category={category} />
                    }
                    </Grid>
                    
                </Grid>
            </div>
            <Footer />
        </>
    );
}

export default Codinglistmain;
