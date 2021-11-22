import React, { useState, useEffect } from "react";
import {
    Grid,
    Button,
    Typography,
    Divider,
    Container,
    Step,
    Stepper,
    StepLabel,
    TextField,
} from "@mui/material";
import NavBar from "../../navbar/NavBar";
import Footer from "../../footer/Footer";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import "./OverviewHackathon.css";

const useStyles = makeStyles((theme) => ({
    overviewContainer: {
        padding: "30px",
    },
    mainFont: {
        fontFamily: "Open Sans",
    },
}));

const Overviewhackathon = () => {
    const [currentUser, setCurrentUser] = useState(null);

    const classes = useStyles();

    const steps = [
        "Create an oranization account",
        "Go through Overview of the platform",
        "Add hackathon details & Problem statements",
        "Add Sponsors & prizes",
        "Publish a Hackathon",
        "Handle Submissions",
        "Announce Winners",
    ];

    useEffect(() => {
        axios
            .get("http://localhost:4200/api/user/currentuser", {
                headers: {
                    authentication: localStorage.getItem("session"),
                },
            })
            .then((response) => {
                if (response.data.currentUser) {
                    setCurrentUser(response.data.currentUser);
                } else {
                    // Push outside of the application
                }
            })
            .catch((err) => {
                console.log(
                    "Error in OverviewHackathon - While fetching current user"
                );
            });
    }, []);

    return (
        <div>
            <NavBar location="dashboard" />
            <Container style={{ marginTop: "20px" }}>
                <Grid
                    container
                    xs={12}
                    sm={12}
                    md={12}
                    spacing={{ xs: 2, md: 4 }}
                    className={classes.overviewContainer}
                >
                    {/* 1st Title Section */}
                    <Grid item direction="column">
                        <img
                            src="https://source.unsplash.com/random"
                            height={150}
                            width={150}
                            style={{ borderRadius: "10px" }}
                        />
                    </Grid>
                    <Grid item direction="column">
                        <Typography
                            fontFamily="Bebas Neue"
                            variant="h4"
                            letterSpacing="1.5px"
                            style={{ verticalAlign: "bottom" }}
                        >
                            Organize Hackathons with EduHack
                        </Typography>
                    </Grid>

                    {/* Divider */}
                    <Grid item xs={12} sm={12} md={12}>
                        <Divider variant="fullWidth" />
                    </Grid>

                    {/* T2nd Introduction Section */}
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography
                            fontFamily="Bebas Neue"
                            variant="h4"
                            letterSpacing="1.5px"
                        >
                            Introduction
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography
                            variant="body1"
                            className={classes.mainFont}
                            fontWeight="1px"
                        >
                            EduHack provides an end-to-end hackathon and coding
                            platform for organizations and student developers.
                            It consists of all features which are needed while
                            organizing and managing a hackahton. It comes with
                            excellent designs and technical support. This
                            platform is a combination of various tools and
                            technologies that helps student developers to get
                            started with coding and solve some useful questions.
                            Organizations like college, universities can also
                            use this platform to arrange internal hackathons and
                            manage them well.
                        </Typography>
                    </Grid>

                    {/* Benefits or Organizing with EduHack Section */}
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography
                            fontFamily="Bebas Neue"
                            variant="h4"
                            letterSpacing="1.5px"
                        >
                            Benefits of Organizing with EduHack
                        </Typography>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7}>
                        <Typography
                            variant="body1"
                            className={classes.mainFont}
                            fontFamily="Open Sans"
                        >
                            <ul>
                                <li> Easy to Use and Manage Hackathons </li>
                                <li> Arrange Hackathons on the go... </li>
                                <li> Less burden of handling records </li>
                                <li> Hacker RSVP Platform </li>
                                <li>
                                    {" "}
                                    Hackathon Summary/Statistics available{" "}
                                </li>
                                <li> Manage sponsors & prizes</li>
                            </ul>
                        </Typography>
                    </Grid>
                    <Grid item xs={5} sm={5} md={5}>
                        <img
                            src="https://source.unsplash.com/random"
                            width="100%"
                            height={200}
                        />
                    </Grid>

                    {/* Success Story */}
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography
                            fontFamily="Bebas Neue"
                            variant="h4"
                            letterSpacing="1.5px"
                        >
                            🤝 Success Story
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                        <img
                            src="https://source.unsplash.com/random"
                            width="40%"
                            height="65%"
                            style={{ borderRadius: "50%" }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={7} md={7}>
                        <Typography
                            variant="body1"
                            className={classes.mainFont}
                            fontFamily="Open Sans"
                        >
                            CodeState'21, one of the biggest hackathon in India
                            was organized using this platform. The hackathon was
                            lasted upto 72 hours. They were able to gather more
                            than 1500 participants within 15 days. The
                            submissions and problem statement process was
                            totally handled by our platform. The submissions
                            were on the mark. Some participants won amazing
                            prizes at the end of the hackathon. This was the
                            biggest example of a BEST HACKATHON that we achieved
                            together. 🤝
                        </Typography>
                    </Grid>

                    {/* Process of creating and managing a hackathon */}
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography
                            fontFamily="Bebas Neue"
                            variant="h4"
                            letterSpacing="1.5px"
                        >
                            Process for creating and managing a hackathon
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        {/* <img src="https://source.unsplash.com/random"  width="100%" height={200} style={{borderRadius: "50px"}}/>  */}

                        <Stepper>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};

                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>
                                            {label}
                                        </StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </Grid>

                    {/* Terms & Conditions */}
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography
                            fontFamily="Bebas Neue"
                            variant="h4"
                            letterSpacing="1.5px"
                        >
                            Terms & Conditions
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        {/* <img src="https://source.unsplash.com/random"  width="100%" height={200} style={{borderRadius: "50px"}}/>  */}
                        <Typography
                            variant="body1"
                            className={classes.mainFont}
                            fontFamily="Open Sans"
                        >
                            <ul>
                                <li>
                                    The data provided by organizers is correct
                                    and they're take assurity for the same.
                                </li>
                                <li>
                                    Hackathon sponsors and prizes are displayed
                                    as it is without any modification from our
                                    side.
                                </li>
                                <li>
                                    Organizers are responsible for announcing
                                    and distributing prizes among participants.
                                </li>
                                <li>
                                    All RSVP and hackathon data will be managed
                                    by the platform and organizers doesn't have
                                    rights to directly modify it.
                                </li>
                                <li>
                                    We respect data privacy and hence we do not
                                    share data with any third parties for any
                                    purpose.
                                </li>
                            </ul>
                        </Typography>
                    </Grid>

                    {/* Organize Hackathon Button */}
                    <Grid item xs={12} sm={12} md={12}>
                        <center>
                            <Button
                                variant="contained"
                                size="large"
                                href="http://localhost:3000/hackathon/organize"
                            >
                                Organize Hackathon
                            </Button>
                        </center>
                    </Grid>

                    {/* Help? Contact Us */}
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography
                            fontFamily="Bebas Neue"
                            variant="h4"
                            letterSpacing="1px"
                        >
                            Need Help? Feel free to reach us!
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        style={{ placeSelf: "center" }}
                    >
                        <Typography
                            variant="body1"
                            className={classes.mainFont}
                            fontFamily="Open Sans"
                        >
                            Email : <TextField />
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={8}
                        style={{ placeSelf: "center" }}
                    >
                        <Typography
                            variant="body1"
                            className={classes.mainFont}
                            fontFamily="Open Sans"
                        >
                            Description : <TextField />
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </div>
    );
};

export default Overviewhackathon;
