import React from "react";
import {
    Box,
    Paper,
    Grid,
    Divider,
    Button,
    TextField,
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Container,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import NavBar from "../../navbar/NavBar";
import Footer from "../../footer/Footer";
import Formsectionheader from "../FormSectionHeader/FormSectionHeader";
import theme from "../../ui/Theme";

const useStyles = makeStyles((theme) => ({
    parent: {
        width: "100%"
    },
    innerGrid: {
        margin: "10px",
        padding: "20px",
    },
    carousel: {
        height: "400px",
        width: "100vw",
        backgroundColor: "#444",
    },
    card: {
        padding: "auto",
        width: "80px",
    },
    nestedGrid: {
        margin: "10px",
    },
    probStatementGridHeader: {

    },
    probStatDesc: {
        padding: "10px",
    },
    probStatementGrid: {
        margin: "10px",
        padding: "10px 20px"
    },
}));

const tempPrizes = [1, 2, 3];
const tempProblemStatements = [1, 2, 3, 4];

const Hackathonmain = () => {
    const classes = useStyles();

    return (
        <div className={classes.parent}>
            <NavBar />

            {/* Parent Container */}
            <Typography fontFamily="Open Sans">
            <Grid container sm={12} xs={12} md={12}>
                {/* Carousel */}
                <Grid item xs={12} sm={12} md={12} className={classes.carousel}>
                    <div></div>
                </Grid>

                {/* Top Grid - Dates */}
                <Grid item xs={12} sm={6} md={4} className={classes.innerGrid}>
                    <Grid container sm={12} xs={12} md={12}>
                        <Grid item xs={12} sm={12} md={12}>
                            <center>
                                <Typography
                                    variant="h5"
                                    fontFamily="Open Sans"
                                    color={theme.palette.common.orangeColor}
                                >
                                    <strong>Registration</strong>
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography
                                    variant="subtitle1"
                                    fontFamily="Open Sans"
                                    color={theme.palette.common.darkGreen}
                                >
                                    Starts at
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography
                                    variant="subtitle1"
                                    fontFamily="Open Sans"
                                    color={theme.palette.common.darkGreen}
                                >
                                    Ends at
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography variant="h5" fontFamily="Open Sans">
                                    <b>15/10/2021</b>
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography variant="h5" fontFamily="Open Sans">
                                    <b>30/10/2021</b>
                                </Typography>
                            </center>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={classes.innerGrid}>
                    <Grid container sm={12} xs={12} md={12}>
                        <Grid item xs={12} sm={12} md={12}>
                            <center>
                                <Typography
                                    variant="h5"
                                    fontFamily="Open Sans"
                                    color={theme.palette.common.orangeColor}
                                >
                                    <strong>Hackathon</strong>
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography
                                    variant="subtitle1"
                                    fontFamily="Open Sans"
                                    color={theme.palette.common.darkGreen}
                                >
                                    Starts at
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography
                                    variant="subtitle1"
                                    fontFamily="Open Sans"
                                    color={theme.palette.common.darkGreen}
                                >
                                    Ends at
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography variant="h5" fontFamily="Open Sans">
                                    <b> 15/11/2021 </b>
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography variant="h5" fontFamily="Open Sans">
                                    <b>17/10/2021</b>
                                </Typography>
                            </center>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4} className={classes.innerGrid}>
                    <center>
                        <div component="div">
                            <Typography variant="h6" fontFamily="Open Sans">
                                Participants Count: 123
                            </Typography>
                        </div>
                        <Button
                            variant="contained"
                            style={{ marginTop: "20px" }}
                            size="large"
                        >
                            Participate Now
                        </Button>
                    </center>
                </Grid>

                {/* Description Title Section */}
                <Grid item xs={12} md={3} sm={4} className={classes.innerGrid}>
                    <Formsectionheader name="Description" />
                </Grid>

                {/* Description Texts */}
                <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                    className={classes.innerGrid}
                >
                    <Typography variant="body1" fontFamily="Open Sans">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </Typography>
                </Grid>

                {/* Winning Prizes Title Section */}
                <Grid item xs={12} md={3} sm={4} className={classes.innerGrid}>
                    <Formsectionheader name="Winning Prizes" />
                </Grid>
                <Grid item xs={12} md={12} sm={12}></Grid>

                {/* Winning Prizes Details */}
                <Container>
                    <Grid container sm={12} xs={12} md={12}>
                        {tempPrizes.map((tempPrize) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                className={classes.innerGrid}
                            >
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
                </Container>

                {/* Problem Statements Title Section */}
                <Grid item xs={12} md={3} sm={4} className={classes.innerGrid}>
                    <Formsectionheader name="Problem Statements" />
                </Grid>

                <Grid
                        item
                        xs={12}
                        md={12}
                        sm={12}
                        className={classes.probStatementGrid}
                    >
                        <Paper elevation={3}>
                            <Grid container sm={12} md={12} xs={12}>
                                <Grid
                                    item
                                    xs={6}
                                    md={0.7}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    <Typography variant="subtitle1" fontFamily="inherit">
                                        <strong>ID</strong>
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={2.5}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    <Typography variant="subtitle1"  fontFamily="inherit">
                                        <strong>Title</strong>
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={4}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    <Typography variant="subtitle1"  fontFamily="inherit">
                                        <strong>Description</strong>
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={1}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    <Typography variant="subtitle1"  fontFamily="inherit">
                                        <strong>Solution Type</strong>
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={2}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    <Typography variant="subtitle1"  fontFamily="inherit">
                                        <strong>Technologies</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                {/* Problem Statements Detaild */}
                {tempProblemStatements.map((problemStatement) => (
                    <Grid
                        item
                        xs={12}
                        md={12}
                        sm={12}
                        className={classes.probStatementGrid}
                    >
                        <Paper elevation={3}>
                            <Grid container sm={12} md={12} xs={12}>
                                <Grid
                                    item
                                    xs={6}
                                    md={0.7}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    A1283H
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={2.5}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    Lorem ipsum dolor sit ips aamet, consectetur
                                    lorem jfhw, ajips sum adipcscing
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={4}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    Lorem ipsum dolor sit ips aamet, consectetur
                                    lorem jfhw, ajips lorem jfhw, ajips lorem
                                    jfhw, ajips lorem jfhw, ajips lorem jfhw,
                                    ajips lorem jfhw, ajips lorem jfhw, ajips
                                    lorem jfhw, lorem ...
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={1}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    Software - Web App
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={2}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    HTML, CSS, Bootstrap, JavaScript, Python 3,
                                    MERN Stack, OAuth, PHP, jQuery, MySQL
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}

                {/* Sponsors Title Section */}
                <Grid item xs={12} md={3} sm={4} className={classes.innerGrid}>
                    <Formsectionheader name="Sponsors" />
                </Grid>
                <Grid item xs={12} md={12} sm={12}></Grid>

                {/* Sponsors Details */}
                <Grid item xs={12} sm={6} md={3} className={classes.innerGrid}>
                    <img
                        src="https://source.unsplash.com/random"
                        height={170}
                        style={{ borderRadius: "2%" }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} className={classes.innerGrid}>
                    <img
                        src="https://source.unsplash.com/random"
                        height={170}
                        style={{ borderRadius: "2%" }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} className={classes.innerGrid}>
                    <img
                        src="https://source.unsplash.com/random"
                        height={170}
                        style={{ borderRadius: "2%" }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} className={classes.innerGrid}>
                    <img
                        src="https://source.unsplash.com/random"
                        height={170}
                        style={{ borderRadius: "2%" }}
                    />
                </Grid>
            </Grid>
            </Typography>

            <Footer />
        </div>
    );
};

export default Hackathonmain;
