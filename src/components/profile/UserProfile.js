import React, { useState, useEffect, useContext } from "react";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import Formsectionheader from "../Hackathon/FormSectionHeader/FormSectionHeader";
import Hackathoncard from "./HackathonCard";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";

import { AppContext } from "../../AppContext";
import { useHistory } from "react-router";

import axios from "axios";

const useStyles = makeStyles(() => ({
    parentContainer: {
        padding: "20px",
    },
    topLeftGrid: {
        padding: "10px",
        margin: "5px",
    },
    profileImage: {
        borderRadius: "20px",
    },
    solvedQuestionsGrid: {
        margin: "10px",
    },
}));

const Userprofile = () => {
    const classes = useStyles();
    const history = useHistory();
    const { setShowBanner } = useContext(AppContext);

    const [currentUser, setCurrentUser] = useState({});
    const [userData, setUserData] = useState({});
    const [solvedQuestions, setSolvedQuestions] = useState([]);

    useEffect(() => {
        try {
            axios
                .get(`http://localhost:4200/api/user/currentuser`, {
                    headers: {
                        authorization: localStorage.getItem("session"),
                    },
                })
                .then((userResp) => {
                    if (
                        !userResp.data.currentUser ||
                        userResp.data.currentUser === undefined ||
                        Object.keys(userResp.data.currentUser).length == 0
                    ) {
                        setShowBanner({
                            apiErrorResponse: "You must be Signed In!",
                        });
                        return history.push("/auth/signin");
                    }

                    setCurrentUser(userResp.data.currentUser);

                    axios
                        .get(
                            `http://localhost:4200/api/user/get/dev/${userResp.data.currentUser.email}`,
                            {
                                headers: {
                                    authorization:
                                        localStorage.getItem("session"),
                                },
                            }
                        )
                        .then((devUserResp) => {
                            if (
                                !devUserResp.data.devUser ||
                                devUserResp.data.devUser === undefined ||
                                Object.keys(devUserResp.data.devUser).length ==
                                    0
                            ) {
                                setShowBanner({
                                    apiErrorResponse: "Invalid user",
                                });
                            }

                            console.log("Dev User", devUserResp);
                            setUserData(devUserResp);

                            axios.get(`http://localhost:9200/api/coding/get/solvedQuestions`, {
                                headers: {
                                    authorization: localStorage.getItem('session'),
                                }
                            }).then((solvedQuestionResp) => {
                                console.log("Solved Questions! ", solvedQuestionResp.data.responses.get_solved_questions.codeSolutions);
                                setSolvedQuestions(solvedQuestionResp.data.responses.get_solved_questions.codeSolutions)
                            }).catch((err) => {

                            })
                        })
                        .catch((err) => {
                            console.log("Profile Error", err);
                            return setShowBanner({
                                apiErrorResponse: "Invalid user2",
                            });
                        });
                })
                .catch((err) => {
                    setShowBanner({
                        apiErrorResponse:
                            "Error fetching user! Please try again...",
                    });
                });
        } catch (err) {
        } finally {
            handleAfterFormResponse();
        }
    }, []);

    const handleAfterFormResponse = () => {
        setShowBanner(null);
    };

    return (
        <div>
            <NavBar location="dashboard" />

            <Grid container className={classes.parentContainer}>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={5}
                    className={classes.topLeftGrid}
                >
                    <Grid container>
                        <Grid item xs={12} md={4} style={{ minWidth: "150px" }}>
                            <img
                                height="150"
                                width="150"
                                src="https://source.unsplash.com/random"
                                className={classes.profileImage}
                            />
                            <Typography
                                variant="subtitle1"
                                fontFamily="Open Sans"
                                color="text.primary"
                            >
                                @hetsuthar028
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography
                                variant="h4"
                                fontFamily="Bebas Neue"
                                fontWeight="bold"
                                color="text.primary"
                            >
                                Het Suthar
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                fontFamily="Open Sans"
                                color="text.primary"
                            >
                                hetmewada028@gmail.com
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={7}
                    className={classes.topLeftGrid}
                >
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </Grid>

                {/* Solved Questions Title */}
                <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                    className={classes.solvedQuestionsGrid}
                >
                    <Formsectionheader name="Solved Questions" />
                </Grid>

                {/* Solved Questions Table Headers */}
                <Grid item xs={12} sm={12} md={3.5}>
                    <center>
                        <Typography
                            variant="h6"
                            fontFamily="Bebas Neue"
                            fontWeight="bold"
                        >
                            Question Title
                        </Typography>
                    </center>
                    <br />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <center>
                        <Typography
                            variant="h6"
                            fontFamily="Bebas Neue"
                            fontWeight="bold"
                        >
                            Question ID
                        </Typography>
                    </center>
                    <br />
                </Grid>
                <Grid item xs={12} sm={12} md={3.5}>
                    <center>
                        <Typography
                            variant="h6"
                            fontFamily="Bebas Neue"
                            fontWeight="bold"
                        >
                            Timestamp
                        </Typography>
                    </center>
                    <br />
                </Grid>
                <Grid item xs={12} sm={12} md={1}>
                    <center>
                        <Typography
                            variant="h6"
                            fontFamily="Bebas Neue"
                            fontWeight="bold"
                        >
                            Status
                        </Typography>
                    </center>
                    <br />
                </Grid>

                {/* Solved Questions Description */}
                {solvedQuestions && solvedQuestions.map((ar) => (
                    <Grid container style={{marginTop: '10px'}} key={ar.codeSolutionID}>
                        <Grid item xs={12} sm={12} md={3.5}>
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                >
                                    {ar.questionTitle}
                                </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <center>
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                >
                                    {ar.questionID}
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3.5}>
                            <center>
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                >
                                    {ar.timestamp}
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={12} sm={12} md={1}>
                            <center>
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                >
                                    {ar.status}
                                </Typography>                            
                            </center>
                        </Grid>
                    </Grid>
                ))}


                {/* Participate Hackathons */}
                <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                    className={classes.solvedQuestionsGrid}
                >
                    <Formsectionheader name="Participated In Hackathons" />
                </Grid>
                
                <Grid container>
                {
                    [1, 2, 3, 4, 5].map((hack) => (
                        <Grid item xs={12} sm={4} md={3} style={{ paddingRight: "15px", paddingTop: "15px" }}>
                            <Hackathoncard />
                        </Grid>
                    ))
                }
                </Grid>
            </Grid>

            <Footer />
        </div>
    );
};

export default Userprofile;
