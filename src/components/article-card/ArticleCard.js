import React from 'react';
import { Paper, Card, Grid, Container, Typography, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { borderRadius } from '@mui/system';
import theme from '../ui/Theme'

const useStyles = makeStyles((theme)=>({
    mainContainer: {
        marginBottom: "30px"
    },
    articleImage: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "5px",
        
    }, 
    fieldName: {
        border: `0.4px solid ${theme.palette.primary.main}`,
        borderRadius: "5px",
        boxShadow: "-1px 1px #77aaff, -2px 2px #77aaff, -3px 3px #77aaff, -4px 4px #77aaff,-5px 5px #77aaff",
        backgroundColor: `${theme.palette.common.ternaryColor}`,
        padding: "5px",
    },
    gridItems: {
        marginTop: "0px"
    },
    description: {
        fontSize: "10px"
    }, 
    readMoreButton:{
        fontSize: "4px",
        textTransform: 'lowercase',
        backgroundColor: theme.palette.primary.main
    }
}))

const Articlecard = (props) => {

    const classes = useStyles();

    return (
        <div>
            <Grid container sm={12} xs={12} md={12} spacing={{ xs: 1, md: 1 }} className={classes.mainContainer}>
                <Grid item xs={12} sm={12} md={12}>
                    <img src="https://source.unsplash.com/random" width="100%" height={140} alt="Article" className={classes.articleImage} />
                </Grid>
                
                <Grid item xs={12} sm={12} md={12}>
                    <Typography
                    variant="body2"
                    style={{padding: "0px"}}
                    >
                        {/* <span>JavaScript</span> <span style={{marginRight: "0px"}}>2 min Read</span> */}
                        <div className={classes.fieldName}><b>JavaScript - Data Types & Loops</b></div>
                        
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography
                    variant="body2"
                    style={{padding: "0px"}}
                    >
                        {/* <span>JavaScript</span> <span style={{marginRight: "0px"}}>2 min Read</span> */}
                        <div className={classes.description} style={{textAlign: "justify", textJustify: "inner-word"}}><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labor...</p></div>
                        
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Button variant="contained" size="small" className={classes.readMoreButton}>Read full article</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Articlecard;
