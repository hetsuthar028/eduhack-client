import React, { useState, useEffect, useContext } from "react";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import Formsectionheader from "../Hackathon/FormSectionHeader/FormSectionHeader";
import Hackathoncard from "./HackathonCard";
import { Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";

import { AppContext } from "../../AppContext";
import { useHistory } from "react-router";
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';

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
    const [myHackathons, setMyHackathons] = useState([]);

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
                        Object.keys(userResp.data.currentUser).length === 0
                    ) {
                        setShowBanner({
                            apiErrorResponse: "You must be Signed In!",
                        });
                        return history.push("/auth/signin");
                    }

                    console.log("CURRT USER", userResp.data.currentUser)
                    setCurrentUser(userResp.data.currentUser);

                    let queryLocation = "";
                    if (userResp.data.currentUser.userType === "organization") {
                        queryLocation = "org";
                    } else {
                        queryLocation = "dev";
                    }
                    axios
                        .get(
                            `http://localhost:4200/api/user/get/${queryLocation}/${userResp.data.currentUser.email}`,
                            {
                                headers: {
                                    authorization:
                                        localStorage.getItem("session"),
                                },
                            }
                        )
                        .then((devUserResp) => {
                            if (
                                !devUserResp.data.userProfile ||
                                devUserResp.data.userProfile === undefined ||
                                Object.keys(devUserResp.data.userProfile)
                                    .length === 0
                            ) {
                                setShowBanner({
                                    apiErrorResponse: "Invalid user",
                                });
                            }

                            console.log("Dev User", devUserResp);
                            setUserData(devUserResp.data.userProfile);

                            axios
                                .get(
                                    `http://localhost:9200/api/coding/get/solvedQuestions`,
                                    {
                                        headers: {
                                            authorization:
                                                localStorage.getItem("session"),
                                        },
                                    }
                                )
                                .then((solvedQuestionResp) => {
                                    console.log(
                                        "Solved Questions! ",
                                        solvedQuestionResp.data.responses
                                            .get_solved_questions.codeSolutions
                                    );
                                    setSolvedQuestions(
                                        solvedQuestionResp.data.responses
                                            .get_solved_questions.codeSolutions
                                    );
                                })
                                .catch((err) => {
                                    console.log(
                                        "ERROR IN SOLVED Questions",
                                        err
                                    );
                                });

                            axios
                                .get(
                                    `http://localhost:4400/api/hackathon/get/myhackathons`,
                                    {
                                        headers: {
                                            authorization:
                                                localStorage.getItem("session"),
                                        },
                                    }
                                )
                                .then((myHackResp) => {
                                    console.log(
                                        "My Hackathons Resp",
                                        myHackResp
                                    );
                                    setMyHackathons(
                                        myHackResp.data.get_my_hackathons
                                            .myHackathons
                                    );
                                })
                                .catch((err) => {
                                    console.log("Error getting my hackathons");
                                });
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
            console.log("Global Error");
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
                    sm={12}
                    md={12}
                    className={classes.topLeftGrid}
                >
                    <Grid container>
                        <Grid item xs={12} md={1.7} sm={3} style={{ minWidth: "150px" }}>
                            <img
                                height="150"
                                width="150"
                                src="https://source.unsplash.com/random"
                                className={classes.profileImage}
                                alt="Profile"
                            />
                            <Typography
                                variant="subtitle1"
                                fontFamily="Open Sans"
                                color="text.primary"
                            >
                                @{currentUser.username}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={9.3} sm={9}>
                            <Typography
                                variant="h4"
                                fontFamily="Bebas Neue"
                                fontWeight="bold"
                                color="text.primary"
                            >
                                {currentUser.fullName}
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                fontFamily="Open Sans"
                                color="text.primary"
                            >
                                {currentUser.email}
                            </Typography>
                            {currentUser.userType === "developer" ? (
                                <>
                                    <div style={{display: "flex", marginTop: "10px"}}>
                                        <SchoolIcon height="30"/>
                                        <Typography
                                            variant="subtitle1"
                                            fontFamily="Open Sans"
                                            color="text.primary"
                                            style={{marginLeft: "10px"}}
                                        >
                                            {userData.college}
                                        </Typography>
                                    </div>
                                    <div style={{display: "flex", marginTop: "10px"}}>
                                        <CalendarTodayIcon height="30"/>
                                        <Typography
                                            variant="subtitle1"
                                            fontFamily="Open Sans"
                                            color="text.primary"
                                            style={{marginLeft: "10px"}}
                                        >
                                            {userData.graduationYear}
                                        </Typography>
                                    </div>
                                </>
                            ) : (<>
                                <div style={{display: "flex", marginTop: "10px"}}>
                                        <PhoneIcon height="30"/>
                                        <Typography
                                            variant="subtitle1"
                                            fontFamily="Open Sans"
                                            color="text.primary"
                                            style={{marginLeft: "10px"}}
                                        >
                                            {userData.contact}
                                        </Typography>
                                    </div>
                                    <div style={{display: "flex", marginTop: "10px"}}>
                                        <BusinessIcon height="30"/>
                                        <Typography
                                            variant="subtitle1"
                                            fontFamily="Open Sans"
                                            color="text.primary"
                                            style={{marginLeft: "10px"}}
                                        >
                                            {userData.address}
                                        </Typography>
                                    </div>
                                </>
                                )
                            }
                            
                           
                        </Grid>
                    </Grid>
                </Grid>

                
                {currentUser.userType === "developer" && (
                    <>
                        <Grid
                            item
                            xs={12}
                            md={12}
                            sm={12}
                            className={classes.solvedQuestionsGrid}
                        >
                            <Formsectionheader name="Solved Questions" />
                        </Grid>

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
                        {solvedQuestions &&
                            solvedQuestions.map((ar) => (
                                <Grid
                                    container
                                    style={{ marginTop: "10px" }}
                                    key={ar.codeSolutionID}
                                >
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
                    </>
                )}
                {/* Solved Questions Title */}

                {/* Solved Questions Table Headers */}

                {/* Solved Questions Description */}

                {/* Participate Hackathons */}
                <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                    className={classes.solvedQuestionsGrid}
                >
                    <Formsectionheader
                        name={
                            currentUser.userType === "organization"
                                ? "Hackathons Organized"
                                : "Participated in Hackathons"
                        }
                    />
                </Grid>

                <Grid container>
                    {myHackathons.map((hack) => (
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            style={{ paddingRight: "15px", paddingTop: "15px" }}
                            key={hack.id}
                        >
                            <Hackathoncard title={hack.title} id={hack.id} />
                        </Grid>
                    ))}
                    {myHackathons.length === 0 && (
                        <Typography fontFamily="Open Sans" variant="h6">
                            No hackathons in your bag! 💼 &nbsp;

                            <Button
                                variant="outlined"
                                onClick={() => {
                                    if(currentUser.userType === "developer"){
                                        return history.push("/dashboard");
                                    } else{
                                        return history.push('/hackathon/organize/overview')

                                    }
                                    
                                }}
                            >
                                {currentUser.userType === "developer" ? "View Upcoming Hackathons" : "Organize Hackathons"}
                            </Button>
                        </Typography>
                    )}
                </Grid>
            </Grid>

            <Footer />
        </div>
    );
};

export default Userprofile;
