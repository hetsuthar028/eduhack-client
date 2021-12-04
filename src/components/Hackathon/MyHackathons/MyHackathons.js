import React, { useState, useEffect, useContext } from "react";
import {
    Grid,
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Button
} from "@mui/material";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core";
import NavBar from "../../navbar/NavBar";
import Footer from "../../footer/Footer";
import Formsectionheader from "../../Hackathon/FormSectionHeader/FormSectionHeader";
import axios from "axios";
import { AppContext } from "../../../AppContext";
import './MyHackathons.css';

const useStyles = makeStyles((theme) => ({
    parent: {
        padding: "20px",
    },
    cardMedia: {},
    cardContent: {
        flexGrow: 1,
    },
}));

const Myhackathons = () => {
    const classes = useStyles();
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState({});
    const [myHackathons, setMyHackathons] = useState([]);
    const { setShowBanner } = useContext(AppContext);

    useEffect(() => {
        try{

            axios
                .get(`http://localhost:4200/api/user/currentuser`, {
                    headers: {
                        authorization: localStorage.getItem("session"),
                    },
                })
                .then((responses) => {
                    setCurrentUser(responses.data.currentUser);
                    if(responses.data.currentUser.userType == "developer"){
                        setShowBanner({apiErrorResponse: "You must be an organization user to view this page!"})
                        return history.push('/dashboard')
                    }
                    axios
                        .get(
                            `http://localhost:4400/api/hackathon/get/myhackathons`,
                            {
                                headers: {
                                    authorization: localStorage.getItem("session"),
                                },
                            }
                        )
                        .then((responses) => {
                            console.log(
                                "My Hackathons",
                                responses.data.get_my_hackathons.myHackathons
                            );
                            try {
                                setMyHackathons(
                                    responses.data.get_my_hackathons.myHackathons
                                );
                            } catch (err) {
                                setShowBanner({
                                    apiErrorResponse:
                                        "Error setting Hackathons data",
                                });
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                            return setShowBanner({
                                apiErrorResponse:
                                    "Unable to fetch your hackathons! Please try again.",
                            });
                        });
                })
                .catch((err) => {
                    return setShowBanner({
                        apiErrorResponse: "Unable to fetch user! Please try again",
                    });
                });
        } catch(err){

        } finally{
            handleAfterResponse();
        }

    }, []);

    useEffect(() => {
        if (!currentUser) {
            setShowBanner({ apiErrorResponse: "You must be signed in!" });
            handleAfterResponse();
            return history.push("/auth/signin");
        }
    }, [currentUser]);

    const handleCardClick = (hackId) => {
        history.push(`/hackathon/view/${hackId}`)
    }

    const handleAfterResponse = () => {
        setTimeout(() => {
            setShowBanner(null)
        }, 3000);
    }

    return (
        <div>
            <NavBar location="dashboard" />

            <Grid container className={classes.parent}>
                <Grid item xs={12} md={3} sm={4}>
                    <Formsectionheader name="My Hackathons" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} />
                {myHackathons.map((hackathon) => (
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        md={3}
                        key={hackathon.id}
                        style={{ paddingRight: "15px", paddingTop: "15px" }}
                    >
                        <Card sx={{ maxWidth: 7000, height: "330px" }}>
                            <CardActionArea onClick={() => {
                                handleCardClick(hackathon.id)
                            }} >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://source.unsplash.com/random"
                                    alt="Hackathon Image"
                                    className={classes.cardMedia}
                                />

                                <CardContent className={classes.cardContent} sx={{ maxWidth: 7000, height: "330px" }}>
                                    <Typography
                                        variant="h6"
                                        fontFamily="Open Sans"
                                        gutterBottom
                                    >
                                        {hackathon.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        fontFamily="Open Sans"
                                        color="text.secondary"
                                        gutterBottom
                                        style={{
                                            textAlign: "justify",
                                            justifyContent: "center",
                                        }}
                                        className="line-clamp module"
                                    >
                                        {hackathon.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
                {myHackathons.length == 0 && (
                <Typography variant="h6" fontFamily="Open Sans">
                    You've not organized any hackathon yet! Please Navigation to &nbsp;
                    <Button variant="contained" href="/hackathon/organize/overview">Organize Page</Button>
                </Typography>)}
            </Grid>

            <Footer />
        </div>
    );
};

export default Myhackathons;
