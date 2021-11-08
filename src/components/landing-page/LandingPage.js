import React, { useEffect, Component, useState } from "react";
import NavBar from "../navbar/NavBar";
import "./LandingPage.scss";
import RCarousel from "../rcarousel/RCarousel";
import PastHackathonLanding from "../past-hackathon-landing/PastHackathonLanding";
import { Grid, makeStyles } from "@material-ui/core";
// import { makeStyles } from "@mui/material";
import theme from '../ui/Theme'
import EduhackDetails from "../eduhack-details-landing/EduhackDetails";
import Footer from "../footer/Footer";
import axios from 'axios';
import Carousel from "../carousel/Carousel";

const LandingPage = () => {

    const [currentUser, setCurrentUser] = useState(null);

    let useStyles = makeStyles({
        pastHackathonGrid: {
            margin: "30px 0 0 0",
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
    
    // let tempCurrentUser = {
    //     name: "Het Suthar",
    //     emai: "hetmewada028@gmail.com",
    //     userType: "developer",
    //     username: "hetsuthar028",
    // };

    let classes = useStyles();

    useEffect(()=>{
        axios.get('http://localhost:4200/api/user/currentuser', {
            headers:{
                authorization: localStorage.getItem('session')
            }
        }).then(response=>{
            if(response.data.currentUser){
                console.log(response.data.currentUser)
                setCurrentUser(response.data.currentUser)
            }
        })
    }, []);

    return (
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <NavBar currentUser={currentUser} location="landingPage"/>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    {/* <RCarousel /> */}
                    <Carousel defaultSliders={true} />
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
        
    );
};

export default LandingPage;
