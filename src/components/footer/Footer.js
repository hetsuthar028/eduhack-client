import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import theme from "../ui/Theme";

const Footer = () => {
    const useStyles = makeStyles((theme) => ({
        footer: {
            backgroundColor: theme.palette.secondary.main,
            marginTop: "50px",
            padding: "0",
            width: "100%",
            padding: "2rem",
            zIndex: "1302",
        },
        gridContainer:{
            padding: "0",
            
        },
        gridFirst: {
            width: "40%",
            // whiteSpace: "initial",
            // display: "block",
            // overflow: "hidden",
            wordWrap: "breakWord",
            overflowWrap: "breakWord",
            flexGrow: "1"
        },
        gridSecond: {
            width: "30%"
        },
        gridThird: {
            width: "30%"
        },
        gridItemFooter: {
            margin: "0 50px",
            
        }, 
        description: {
            
        }
    }));

    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Grid container direction="row" className={classes.gridContainer}>
                <Grid item className={classes.gridItemFooter, classes.gridFirst}>
                    <Grid container direction="column">
                        <Grid item>
                            <h2>STAY CONNECTED</h2>
                            <p className={classes.description}>ajkhsgdkajshgdkajsdhgaksjdhgaksjdghaksjdhgaksjdghaksdhgaksdghaskdjhgasdkhgaskdhg</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.gridItemFooter, classes.gridSecond}>
                    <Grid container direction="column">
                        <Grid item><h2>SOMETHING ELSE</h2></Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.gridItemFooter, classes.gridThird}>
                    <Grid container direction="column">
                        <Grid item><h2>NAVIGATE</h2></Grid>
                    </Grid>
                </Grid>

            </Grid>
        </footer>
    );
};

export default Footer;
