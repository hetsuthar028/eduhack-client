import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import theme from "../ui/Theme";
import { IconButton, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
import TwitterIcon from "@mui/icons-material/Twitter";

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
        gridContainer: {
            // padding: "0",
        },
        gridFirst: {
            width: "40%",
            wordWrap: "breakWord",
            overflowWrap: "breakWord",
            flexGrow: "1",
        },
        gridSecond: {
            width: "30%",
        },
        gridThird: {
            width: "30%",
        },
        gridItemFooter: {
            margin: "0 50px",
        },
        description: {},
        spaceBetween: {
            padding: "0 15px",
        },
    }));

    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Grid
                container
                className={classes.gridContainer}
                xs={12}
                sm={12}
                md={12}
                spacing={{ xs: 2, md: 3 }}
            >
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className={classes.spaceBetween}
                >
                    <center>
                        <Typography
                            variant="button"
                            style={{
                                color: `${theme.palette.common.orangeColor}`,
                                marginBottom: "15px"
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{
                                    color: `${theme.palette.common.orangeColor}`,
                                }}
                            >
                                <b>Commited to Quality</b>
                            </Typography>
                        </Typography>
                        <Typography
                            style={{
                                color: `${theme.palette.common.ternaryColor}`,
                                marginTop: "20px"
                            }}
                            fontFamily="Open Sans"
                        >
                            We believe in providing the best quality in any of
                            our service. We as a platform understands our users
                            very well and dedicate whole bunch of opporunities
                            to learn and grow.
                        </Typography>
                    </center>
                </Grid>
                
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className={classes.spaceBetween}
                >
                    <center>
                        <Typography
                            variant="button"
                            style={{
                                color: `${theme.palette.common.orangeColor}`,
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{
                                    color: `${theme.palette.common.orangeColor}`,
                                }}
                            >
                                <b>Stay Connected</b>
                            </Typography>
                        </Typography>

                        <IconButton style={{marginTop: "20px"}}>
                            <FacebookIcon color="primary" />
                        </IconButton>

                        <IconButton style={{marginTop: "20px"}}>
                            <InstagramIcon color="primary" />
                        </IconButton>

                        <IconButton style={{marginTop: "20px"}}>
                            <MailIcon color="primary" />
                        </IconButton>

                        <IconButton style={{marginTop: "20px"}}>
                            <TwitterIcon color="primary" />
                        </IconButton>
                    </center>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    className={classes.spaceBetween}
                >
                    <center>
                        <Typography
                            variant="button"
                            style={{
                                color: `${theme.palette.common.orangeColor}`,
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{
                                    color: `${theme.palette.common.orangeColor}`,
                                }}
                            >
                                <b>Contact US</b>
                            </Typography>
                        </Typography>
                        <Typography
                            style={{
                                color: `${theme.palette.common.ternaryColor}`,
                                marginTop: "20px"
                            }}
                            fontFamily="Open Sans"
                        >
                            A B Developers, Suite 316, IT Road, Ahmedabad -
                            179236,
                        </Typography>
                        <Typography
                            style={{
                                color: `${theme.palette.common.ternaryColor}`,
                            }}
                            fontFamily="Open Sans"
                        >
                            (Main) +918923419231,
                        </Typography>
                        <Typography
                            style={{
                                color: `${theme.palette.common.ternaryColor}`,
                            }}
                            fontFamily="Open Sans"
                        >
                            (Support) +912734762835
                        </Typography>
                    </center>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <Typography
                        variant="subtitle1"
                        style={{
                            color: `${theme.palette.primary.main}`,
                            marginTop: "20px",
                            placeSelf: "center"
                        }}
                        fontFamily="Open Sans"
                    >
                        <center><strong>Copyright Reserved © 2021 | <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" height="15" style={{placeSelf: "center"}}/> <a href="https://github.com/hetsuthar028" target="_blank" style={{color: 'inherit', textDecoration: 'none'}}>Het Suthar</a></strong></center>
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
