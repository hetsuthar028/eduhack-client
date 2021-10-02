import React, { useEffect, useState } from "react";
import {
    Container,
    Box,
    Grid,
    Paper,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Divider,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import Tabs from "../tabs/Tabs";
import Codeeditor from "../code-editor/CodeEditor";

const useStyles = makeStyles((theme) => ({
    dashboardContainer: {
        width: "100%",
        height: "100vh",
        // backgroundColor: "#444"
    },
    carousel: {
        height: "400px",
        width: "100vw",
        backgroundColor: "#444",
    },
    upcomingHackathonsContainer: {
        margin: "auto",
        padding: "20px",
    },
    card: {
        padding: "auto",
    },
    cardContainer: {
        // marginLeft: "auto",
        // display: "flex",
        // justifyContent: "space-between"
    },
    openHackathon: {
        border: "2px solid lightgreen",
        borderRadius: "5px",
        padding: "6px",
        color: theme.palette.secondary.main,
    },
    practiceCodingContainer: {
        // marginTop: "100px",
        margin: "auto",
        padding: "20px",
        backgroundColor: theme.palette.common.ternaryColor,
    },
    readArticlesGrid: {
        margin: "auto",
        padding: "20px",
    },
    codeEditorGrid: {
        margin: "auto",
        padding: "20px",
        backgroundColor: theme.palette.common.ternaryColor,
    },
}));

// For Testing Purpose
let upcomingHackathons = [1, 2, 3, 4];

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState(null);

    const classes = useStyles();

    // For Code Editor
    const [html, setHTML] = useState('');
    const [python, setPython] = useState('');

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
                console.log("Error in Dashboard - While fetching current user");
            });
    }, []);

    return (
        <div className={classes.dashboardContainer}>
            <NavBar
                currentUser={currentUser}
                location="dashboard"
                userType="developer"
            />
            <Grid container xs={12} sm={12} md={12}>
                <Grid item xs={12} sm={12} md={12} className={classes.carousel}>
                    <div></div>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.upcomingHackathonsContainer}
                >
                    <h1>Upcoming Hackathons</h1>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        xs={12}
                        sm={12}
                        md={12}
                        classes={classes.cardContainer}
                    >
                        {upcomingHackathons.map((hackathon) => (
                            <Grid item xs={12} sm={4} md={3} key={hackathon}>
                                <Card classes={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="160"
                                            image="https://source.unsplash.com/random"
                                            alt="Hackathon Image"
                                        />

                                        <CardContent>
                                            <Grid
                                                container
                                                xs={12}
                                                sm={12}
                                                md={12}
                                            >
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        gutterBottom
                                                    >
                                                        CodeState 2021 OPEN
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                        gutterBottom
                                                    >
                                                        <strong>
                                                            Registration Ends:
                                                            10/10/2021
                                                        </strong>
                                                    </Typography>
                                                </Grid>
                                                <Grid>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        gutterBottom
                                                    >
                                                        World's first Student
                                                        driven hackathon. This
                                                        hackathon contains
                                                        various technologies.
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.practiceCodingContainer}
                >
                    <h1>Practice Coding!</h1>
                    <Grid
                        container
                        sm={12}
                        md={12}
                        xs={12}
                        spacing={{ xs: 2, md: 3 }}
                    >
                        <Grid item xs={12} sm={6} md={6}>
                            <Card classes={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image="https://media.istockphoto.com/photos/man-working-on-laptop-at-cafe-picture-id1317787665?b=1&k=20&m=1317787665&s=170667a&w=0&h=BTy4IYYOiJFyX2c8eChRT2FpWCVRNSIH5HrVrQacWbE="
                                        alt="Hackathon Image"
                                    />

                                    <CardContent>
                                        <Grid container xs={12} sm={12} md={12}>
                                            <Grid item xs={12} sm={12} md={12}>
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                >
                                                    Why Coding is Important?
                                                </Typography>
                                            </Grid>
                                            <Grid>
                                                <Typography
                                                    variant="subtitle2"
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    <strong>
                                                        Lorem ipsum dolor sit
                                                        amet, consectetur
                                                        adipiscing elit, sed do
                                                        eiusmod tempor
                                                        incididunt ut labore et
                                                        dolore magna aliqua. Ut
                                                        enim ad minim veniam,
                                                        quis nostrud
                                                        exercitation ullamco
                                                        laboris nisi ut aliquip
                                                        ex ea commodo consequat.
                                                    </strong>
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    <strong>
                                                        Lorem ipsum dolor sit
                                                        amet, consectetur
                                                        adipiscing elit, sed do
                                                        eiusmod tempor
                                                        incididunt ut labore et
                                                        dolore magna aliqua. Ut
                                                        enim ad minim veniam,
                                                        quis nostrud
                                                        exercitation ullamco
                                                        laboris nisi ut aliquip
                                                        ex ea commodo consequat.
                                                    </strong>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        {/* <Grid item xs={12} sm={6} md={1}>
                        <Divider orientation="vertical" />
                        </Grid> */}
                        <Grid item xs={12} sm={6} md={6}>
                            <Grid container xs={12} sm={12} md={12}>
                                <Grid item xs={4}>
                                    <Card sx={{ display: "flex" }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 100, height: 100 }}
                                            // height="100"
                                            width="100"
                                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/1200px-Python.svg.png"
                                            alt="Live from space album cover"
                                        />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <CardContent
                                                sx={{ flex: "1 0 auto" }}
                                            >
                                                <Typography
                                                    component="div"
                                                    variant="h5"
                                                >
                                                    Python
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ display: "flex" }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 100, height: 100 }}
                                            // height="100"
                                            width="100"
                                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/1200px-Python.svg.png"
                                            alt="Live from space album cover"
                                        />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <CardContent
                                                sx={{ flex: "1 0 auto" }}
                                            >
                                                <Typography
                                                    component="div"
                                                    variant="h5"
                                                >
                                                    Python
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container xs={12} sm={12} md={12}>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ display: "flex" }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 100, height: 100 }}
                                            // height="100"
                                            width="100"
                                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/1200px-Python.svg.png"
                                            alt="Live from space album cover"
                                        />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <CardContent
                                                sx={{ flex: "1 0 auto" }}
                                            >
                                                <Typography
                                                    component="div"
                                                    variant="h5"
                                                >
                                                    Python
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}></Grid>
                            </Grid>
                            <Grid container xs={12} sm={12} md={12}>
                                <Grid item xs={4}>
                                    <Card sx={{ display: "flex" }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 100, height: 100 }}
                                            // height="100"
                                            width="100"
                                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/1200px-Python.svg.png"
                                            alt="Live from space album cover"
                                        />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <CardContent
                                                sx={{ flex: "1 0 auto" }}
                                            >
                                                <Typography
                                                    component="div"
                                                    variant="h5"
                                                >
                                                    Python
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ display: "flex" }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 100, height: 100 }}
                                            // height="100"
                                            width="100"
                                            image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/1200px-Python.svg.png"
                                            alt="Live from space album cover"
                                        />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <CardContent
                                                sx={{ flex: "1 0 auto" }}
                                            >
                                                <Typography
                                                    component="div"
                                                    variant="h5"
                                                >
                                                    Python
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid
                container
                xs={12}
                sm={12}
                md={12}
                className={classes.readArticlesGrid}
            >
                <h1 style={{ marginLeft: "auto" }}>
                    Read, Remember & Register
                </h1>
                <Tabs />
            </Grid>

            <Grid
                container
                xs={12}
                sm={12}
                md={12}
                className={classes.codeEditorGrid}
            >
                <h1>Let's start with Coding...</h1>
                {/* <Grid item xs={12} sm={12} md={12} className={classes.carousel}>
                    <div></div>
                </Grid> */}
                <Grid item xs={12} sm={12} md={12}>
                    {/* <Codeeditor 
                        language="xml" 
                        displayName="HTML" 
                        value={html}
                        onChange={setHTML}
                    /> */}
                    
                    {/* <Codeeditor 
                        language="python"
                        displayName="Python"
                        value={python}
                        onChange={setPython}
                    /> */}
                    <Codeeditor />

                </Grid>
            </Grid>

            <Footer />
        </div>
    );
};

export default Dashboard;
