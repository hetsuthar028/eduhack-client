import React from "react";
import NavBar from "../../navbar/NavBar";
import Footer from "../../footer/Footer";
import {
    Button,
    TextField,
    Container,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Icon,
    Avatar,
    Link,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import {
    BusinessOutlined,
    Facebook,
    Instagram,
    LinkedIn,
    Twitter,
} from "@mui/icons-material";
import Formsectionheader from "../FormSectionHeader/FormSectionHeader";
import JS from "../../../JS.svg";
import NodeJS from "../../../NodeJS.svg";
import Python from "../../../Python.svg";
import ReactSVG from "../../../ReactSVG.svg";
import Django from "../../../Django.svg";

const useStyles = makeStyles((theme) => ({
    parent: {
        width: "100%",
    },
    carousel: {
        backgroundColor: "#D3D3D3",
        width: "100%",
        height: "60vh",
    },
    nestedGrid: {
        padding: "20px",
    },
    innerGrid: {
        padding: "20px",
    },
}));

const Hackathonsubmission = () => {
    const classes = useStyles();

    return (
        <Typography fontFamily="Open Sans">
            <div className={classes.parent}>
                <NavBar location="dashboard" />

                <Grid container sm={12} xs={12} md={12}>

                    {/* Top Carousel */}
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.carousel}
                    >
                        <Grid container xs={12} sm={12} md={12}>
                            <Grid
                                item
                                xs={6}
                                md={6}
                                sm={6}
                                className={classes.nestedGrid}
                            >
                                <Button variant="contained" size="large">
                                    <Typography
                                        fontFamily="Open Sans"
                                        letterSpacing="2px"
                                        variant="h6"
                                    >
                                        <strong>22:47:16</strong>
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                md={6}
                                sm={6}
                                className={classes.nestedGrid}
                                style={{ placeSelf: "center" }}
                            >
                                <Typography
                                    fontFamily="Open Sans"
                                    fontSize="20px"
                                    letterSpacing="2px"
                                >
                                    <strong style={{ float: "right" }}>
                                        <BusinessOutlined
                                            style={{ placeSelf: "center" }}
                                        />
                                        Organized by HackCode World Pvt Ltd.
                                    </strong>
                                </Typography>
                            </Grid>

                            <Grid
                                item
                                xs={3}
                                md={3}
                                sm={3}
                                className={classes.nestedGrid}
                            ></Grid>
                            <Grid
                                item
                                xs={6}
                                md={6}
                                sm={6}
                                className={classes.nestedGrid}
                            >
                                <Typography
                                    fontFamily="Open Sans"
                                    letterSpacing="2px"
                                    variant="h4"
                                    style={{ textAlign: "center" }}
                                >
                                    <strong>CodeState'21 Version 2.0</strong>
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={3}
                                md={3}
                                sm={3}
                                className={classes.nestedGrid}
                                style={{ display: "flex", placeSelf: "center" }}
                            >
                                <Facebook style={{ margin: "5px" }} />
                                <Instagram style={{ margin: "5px" }} />
                                <Twitter style={{ margin: "5px" }} />
                                <LinkedIn style={{ margin: "5px" }} />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Problem Statement Title */}
                    <Grid
                        item
                        xs={12}
                        md={3}
                        sm={4}
                        className={classes.innerGrid}
                    >
                        <Formsectionheader name="Problem Statement" />
                    </Grid>

                    {/* Problem Statement Details */}
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.innerGrid}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Submission Format
                            </InputLabel>
                            <Select
                                id="demo-simple-select"
                                label="submissionFormat"
                                multiple
                                value={[]}
                            >
                                <MenuItem
                                    value="JavaScript"
                                    name="JavaScript"
                                    key="JavaScript"
                                >
                                    JavaScript
                                </MenuItem>
                                <MenuItem
                                    value="Python"
                                    name="Python"
                                    key="Python"
                                >
                                    Python
                                </MenuItem>
                                <MenuItem value="text/x-csrc" name="C" key="C">
                                    C
                                </MenuItem>
                                <MenuItem
                                    value="text/x-c++src"
                                    name="C++"
                                    key="C++"
                                >
                                    C++
                                </MenuItem>
                                <MenuItem
                                    value="text/x-java"
                                    name="Java"
                                    key="Java"
                                >
                                    Java
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Submission Guidlines Title */}
                    <Grid
                        item
                        xs={12}
                        md={3}
                        sm={4}
                        className={classes.innerGrid}
                    >
                        <Formsectionheader name="Submission Guidlines" />
                    </Grid>

                    {/* Submission Guidlines Details */}
                    <Grid item xs={12} sm={12} md={12}>
                        <ul>
                            <li>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit
                            </li>
                        </ul>
                    </Grid>

                    {/* Accepted Technologies Title */}
                    <Grid
                        item
                        xs={12}
                        md={3}
                        sm={4}
                        className={classes.innerGrid}
                    >
                        <Formsectionheader name="Accepted Technologies" />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} />

                    {/* Accepted Technologies Details */}
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2.4}
                        className={classes.innerGrid}
                        style={{ display: "flex", placeSelf: "center" }}
                    >
                        <Avatar>
                            <Icon>
                                <img src={JS} />
                            </Icon>
                        </Avatar>
                        <Typography variant="h6">JavaScript</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2.4}
                        className={classes.innerGrid}
                        style={{ display: "flex", placeSelf: "center" }}
                    >
                        <Avatar>
                            <Icon>
                                <img src={NodeJS} />
                            </Icon>
                        </Avatar>
                        <Typography variant="h6">Node JS</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2.4}
                        className={classes.innerGrid}
                        style={{ display: "flex", placeSelf: "center" }}
                    >
                        <Avatar>
                            <Icon>
                                <img src={ReactSVG} />
                            </Icon>
                        </Avatar>
                        <Typography variant="h6">React JS</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2.4}
                        className={classes.innerGrid}
                        style={{ display: "flex", placeSelf: "center" }}
                    >
                        <Avatar>
                            <Icon>
                                <img src={Python} />
                            </Icon>
                        </Avatar>
                        <Typography variant="h6">Python</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2.4}
                        className={classes.innerGrid}
                        style={{ display: "flex", placeSelf: "center" }}
                    >
                        <Avatar>
                            <Icon>
                                <img src={Django} />
                            </Icon>
                        </Avatar>
                        <Typography variant="h6">Django</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2.4}
                        className={classes.innerGrid}
                        style={{ display: "flex", placeSelf: "center" }}
                    >
                        <Avatar>
                            <Icon>
                                <img src={Django} />
                            </Icon>
                        </Avatar>
                        <Typography variant="h6">Django</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2.4}
                        className={classes.innerGrid}
                        style={{ display: "flex", placeSelf: "center" }}
                    >
                        <Avatar>
                            <Icon>
                                <img src={Django} />
                            </Icon>
                        </Avatar>
                        <Typography variant="h6">Django</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2.4}
                        className={classes.innerGrid}
                        style={{ display: "flex", placeSelf: "center" }}
                    >
                        <Avatar>
                            <Icon>
                                <img src={Django} />
                            </Icon>
                        </Avatar>
                        <Typography variant="h6">Django</Typography>
                    </Grid>

                    {/* Reference Material Title */}
                    <Grid item xs={12} md={12} sm={12} />
                    <Grid
                        item
                        xs={12}
                        md={3}
                        sm={4}
                        className={classes.innerGrid}
                    >
                        <Formsectionheader name="Reference Material" />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} />

                    {/* Reference Material Details */}
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.innerGrid}
                    >
                        <Link href="#">
                            https://mui.com/getting-started/usage/
                        </Link>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.innerGrid}
                    >
                        <Link href="#">https://nodejs.dev/learn</Link>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.innerGrid}
                    >
                        <Link href="#">
                            https://docs.djangoproject.com/en/3.2/
                        </Link>
                    </Grid>

                    {/* Submission Title */}
                    <Grid item xs={12} md={12} sm={12} />
                    <Grid
                        item
                        xs={12}
                        md={3}
                        sm={4}
                        className={classes.innerGrid}
                    >
                        <Formsectionheader name="Submission" />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} />

                    {/* Submission Details */}
                    <Grid item xs={12} sm={12} md={12} className={classes.innerGrid}>
                        <Button variant="contained" component="label">
                            Upload File
                            <input type="file" hidden />
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} className={classes.innerGrid}>
                    <center>
                    <Button variant="contained" size="large">Submit</Button>
                    </center>
                </Grid>

                <Footer />
            </div>
        </Typography>
    );
};

export default Hackathonsubmission;
