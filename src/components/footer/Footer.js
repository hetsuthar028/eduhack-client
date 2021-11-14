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
            // whiteSpace: "initial",
            // display: "block",
            // overflow: "hidden",
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
                                variant="h6"
                                style={{
                                    color: `${theme.palette.common.orangeColor}`,
                                }}
                            >
                                <b>Commited to Quality</b>
                            </Typography>
                        </Typography>
                        <p
                            style={{
                                color: `${theme.palette.common.ternaryColor}`,
                            }}
                        >
                            We believe in providing the best quality in any of
                            our service. We as a platform understands our users
                            very well and dedicate whole bunch of opporunities
                            to learn and grow.
                        </p>
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
                                variant="h6"
                                style={{
                                    color: `${theme.palette.common.orangeColor}`,
                                }}
                            >
                                <b>Stay Connected</b>
                            </Typography>
                        </Typography>
                        <IconButton>
                            <FacebookIcon color="primary" />
                        </IconButton>
                        <IconButton>
                            {" "}
                            <InstagramIcon color="primary" />
                        </IconButton>

                        <IconButton>
                            {" "}
                            <MailIcon color="primary" />{" "}
                        </IconButton>

                        <IconButton>
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
                                variant="h6"
                                style={{
                                    color: `${theme.palette.common.orangeColor}`,
                                }}
                            >
                                <b>Contact US</b>
                            </Typography>
                        </Typography>
                        <p
                            style={{
                                color: `${theme.palette.common.ternaryColor}`,
                            }}
                        >
                            A B Developers, Suite 316, IT Road, Ahmedabad -
                            179236,
                        </p>
                        <p
                            style={{
                                color: `${theme.palette.common.ternaryColor}`,
                            }}
                        >
                            (Main) +918923419231,
                        </p>
                        <p
                            style={{
                                color: `${theme.palette.common.ternaryColor}`,
                            }}
                        >
                            (Support) +912734762835
                        </p>
                    </center>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    {/* <Typography
                        variant="subtitle1"
                        style={{ color: `${theme.palette.primary.main}` }}
                    >
                        <center>
                            A B Developers, Suite 316, IT Road, Ahmedabad -
                            179236, (Main) +918923419231, (Support)
                            +912734762835
                        </center>
                    </Typography> */}
                    <Typography
                        variant="subtitle1"
                        style={{
                            color: `${theme.palette.primary.main}`,
                            margin: "auto",
                            placeSelf: "center"
                        }}
                    >
                        <center><strong>Copyright Reserved © 2021 | <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" height="15" style={{placeSelf: "center"}}/> <a href="https://github.com/hetsuthar028" target="_blank" style={{color: 'inherit', textDecoration: 'none'}}>Het Suthar</a></strong></center>
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
