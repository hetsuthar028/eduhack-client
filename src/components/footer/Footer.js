import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import theme from "../ui/Theme";
import { IconButton, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
import TwitterIcon from "@mui/icons-material/Twitter";
import getIcon from "../../static/Icons/getIcon";

const Footer = () => {
    const useStyles = makeStyles((theme) => ({
        footer: {
            backgroundColor: theme.palette.secondary.main,
            marginTop: "50px",
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
                            variant="h5"
                            style={{
                                color: `${theme.palette.common.orangeColor}`,
                                marginBottom: "15px",
                            }}
                        >
                            {/* <Typography
                                variant="h5"
                                style={{
                                    color: `${theme.palette.common.orangeColor}`,
                                }}
                            > */}
                            <b>COMMITED TO QUALITY</b>
                            {/* </Typography> */}
                        </Typography>
                        <Typography
                            style={{
                                color: `${theme.palette.common.ternaryColor}`,
                                marginTop: "20px",
                                marginBottom: "20px",
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
                            variant="h5"
                            style={{
                                color: `${theme.palette.common.orangeColor}`,
                            }}
                        >
                            <b>STAY CONNECTED</b>
                        </Typography>

                        <IconButton
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                            <img src={getIcon('facebook')} style={{height: "40px"}} alt="Facebook" />
                        </IconButton>

                        <IconButton
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                            <img src={getIcon('instagram')} style={{height: "40px"}} alt="Instagram" />
                        </IconButton>

                        <IconButton
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                            <img src={getIcon('mail')} style={{height: "40px"}} alt="EMail" />
                        </IconButton>

                        <IconButton
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                            <img src={getIcon('twitter')} style={{height: "40px"}} alt="Twitter" />
                        </IconButton>
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
                            variant="h5"
                            style={{
                                color: `${theme.palette.common.orangeColor}`,
                            }}
                        >
                            <b>CONTACT US</b>
                        </Typography>
                        <Typography
                            style={{
                                color: `${theme.palette.common.ternaryColor}`,
                                marginTop: "20px",
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

                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={12}
                    style={{
                        color: `${theme.palette.primary.main}`,
                        marginTop: "20px",
                        placeSelf: "center",
                    }}
                >
                    <Typography variant="subtitle1" fontFamily="Open Sans" style={{placeSelf: "center"}}>
                        <center>
                            <strong>
                                Copyright Reserved © 2021 |
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                                    height="20"
                                    
                                    alt="GitHub"
                                />{" "}
                                <a
                                    href="https://github.com/hetsuthar028"
                                    target="_blank"
                                    style={{
                                        color: "inherit",
                                        textDecoration: "none",
                                    }}
                                    rel="noreferrer"
                                >
                                    Het Suthar
                                </a>
                            </strong>
                        </center>
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
