import React, { Component } from "react";
import NavBar from "../navbar/NavBar";
import "./LandingPage.scss";
import RCarousel from "../rcarousel/RCarousel";
import PastHackathonLanding from "../past-hackathon-landing/PastHackathonLanding";
import { Grid, makeStyles } from "@material-ui/core";
// import { makeStyles } from "@mui/material";
import theme from '../ui/Theme'
import EduhackDetails from "../eduhack-details-landing/EduhackDetails";
import Footer from "../footer/Footer";

const LandingPage = () => {
    let useStyles = makeStyles({
        pastHackathonGrid: {
            margin: "100px 0 0 0",
            padding: "0",
            backgroundColor: theme.palette.common.lightMainGreenColor,
            width: "100%"
        },
        eduHackDetailsGrid: {
            margin: "50px 0 0 0",
            padding: "0 20px",
            width: "100%"
        }
    })
    
    let tempCurrentUser = {
        name: "Het Suthar",
        emai: "hetmewada028@gmail.com",
        userType: "developer",
        username: "hetsuthar028",
    };

    let classes = useStyles();

    return (
        <>
            {/* <NavBar currentUser={this.tempCurrentUser}/> */}
            <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <RCarousel />
                </Grid>
                <Grid item xs={12} sm={12} md={12} className={classes.pastHackathonGrid}>
                    <PastHackathonLanding />
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12} className={classes.eduHackDetailsGrid}>
                   <EduhackDetails />
                </Grid> */}
                <Grid item xs={12} sm={12} md={12}>
                   <Footer />
                </Grid>

                {/* <RCarousel />
            <PastHackathonLanding /> */}
            </Grid>
        </>
    );
};

export default LandingPage;
