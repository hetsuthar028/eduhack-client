import React from "react";
import NavBar from "../../navbar/NavBar";
import Footer from "../../footer/Footer";
import theme from "../../ui/Theme";
import { makeStyles } from "@material-ui/core";
import {
    Box,
    Grid,
    Paper,
    Container,
    Typography,
    Button,
    Divider,
    TextField,
    Select,
    Icon,
    FormControl,
    InputLabel,
    MenuItem,
} from "@mui/material";
import "./OrganizePage.css";
import firstPrize from "../../../firstPrize.svg";
import secondPrize from "../../../secondPrize.svg";
import thirdPrize from "../../../thirdPrize.svg";
import Formsectionheader from "../FormSectionHeader/FormSectionHeader";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "50px 30px",
        marginTop: "20px",
    },
    headerGrid: {
        display: "flex",
        justifyContent: "space-between",
    },
    formPaper: {
        padding: "15px",
    },
    innerGrid: {
        padding: "10px",
    },
    imageIcon: {
        height: "100%",
    },
    iconRoot: {
        textAlign: "center",
    },
}));

const Organizepage = () => {
    const classes = useStyles();

    return (
        <div>
            <NavBar location="dashboard" />

            <Grid
                container
                sm={12}
                xs={12}
                md={12}
                spacing={{ xs: 1, md: 2 }}
                className={classes.container}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.headerGrid}
                >
                    <Typography variant="h4" fontFamily="Bebas Neue">
                        Organize A Hackathon
                    </Typography>

                    <Button variant="contained">Save</Button>
                </Grid>

                {/* Hackathon Details Title */}
                <Formsectionheader name="Hackathon" />

                <Grid item xs={12} sm={12} md={12}>
                    <Paper className={classes.formPaper}>
                        <Grid container xs={12} md={12} sm={12}>
                            {/* 1st Row */}
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Title"
                                    name="hackTitle"
                                    variant="outlined"
                                    type="text"
                                    required
                                    placeholder="Enter Hackathon Title"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Company Name"
                                    name="companyName"
                                    variant="outlined"
                                    type="text"
                                    required
                                    placeholder="Enter Company Name"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>

                            {/* 2nd Row */}
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Registration starts at"
                                    name="regStart"
                                    variant="outlined"
                                    type="date"
                                    required
                                    size="small"
                                    fullWidth
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Registration ends at"
                                    name="regEnd"
                                    variant="outlined"
                                    type="date"
                                    required
                                    size="small"
                                    fullWidth
                                />
                            </Grid>

                            {/* 3rd Row */}
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Hackathon starts at"
                                    name="hackStart"
                                    variant="outlined"
                                    type="date"
                                    required
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Hackathon ends at"
                                    name="hackEnd"
                                    variant="outlined"
                                    type="date"
                                    required
                                    size="small"
                                    fullWidth
                                />
                            </Grid>

                            {/* 4th Row */}
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Total Applications"
                                    name="totalApplications"
                                    variant="outlined"
                                    type="number"
                                    required
                                    placeholder="Total Applications"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            ></Grid>

                            {/* 5th Row */}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Description"
                                    name="hackDescription"
                                    variant="outlined"
                                    type="text"
                                    required
                                    placeholder="Hackathon description"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>

                            {/* 6th Row */}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Note"
                                    name="hackNote"
                                    variant="outlined"
                                    type="text"
                                    required
                                    placeholder="Hackathon Note"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Problem Statements Details Title */}
                <Formsectionheader name="Problem Statements" />

                {/* Problem Statements Form */}
                <Grid item xs={12} sm={12} md={12}>
                    <Paper className={classes.formPaper}>
                        <Grid container xs={12} md={12} sm={12}>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                style={{ display: "flex" }}
                            >
                                <Button
                                    variant="contained"
                                    size="small"
                                    style={{ marginLeft: "auto" }}
                                >
                                    Add Problem Statement
                                </Button>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                style={{ marginTop: "20px" }}
                            >
                                <Divider />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Formsectionheader
                    name="Solutions"
                    className={classes.innerGrid}
                />

                {/* Solutions Form  */}
                <Grid item xs={12} sm={12} md={12}>
                    <Paper className={classes.formPaper}>
                        <Grid container xs={12} md={12} sm={12}>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.innerGrid}
                            >
                                <FormControl style={{ width: "300px" }}>
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
                                        <MenuItem
                                            value="text/x-csrc"
                                            name="C"
                                            key="C"
                                        >
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

                            <Grid
                                item
                                sm={12}
                                md={12}
                                sm={12}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Submission Guidlines"
                                    name="subGuidlines"
                                    size="small"
                                    type="text"
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Social media handles Details Title */}
                <Formsectionheader name="Social Media Handles" />

                {/* Social Media Handles Form */}
                <Grid item xs={12} sm={12} md={12}>
                    <Paper className={classes.formPaper}>
                        <Grid container xs={12} md={12} sm={12}>
                            {/* 1st Row */}
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Website"
                                    name="website"
                                    placeholder="Website"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Facebook"
                                    name="facebook"
                                    placeholder="Facebook"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            {/* 2nd Row */}
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Instagram"
                                    name="instagram"
                                    placeholder="Instagram"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="Twitter"
                                    name="twitter"
                                    placeholder="Twitter"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            {/* 3rd Row */}
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="LinkedIn"
                                    name="linkedIn"
                                    placeholder="LinkedIn"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            ></Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Winning prizes Details Title */}
                <Formsectionheader name="Winning Prizes" />

                {/* Winners Form */}
                <Grid item xs={12} sm={12} md={12}>
                    <Paper className={classes.formPaper}>
                        <Grid container xs={12} md={12} sm={12}>
                            {/* 1st Row */}
                            <Grid item xs={3} sm={3} md={3}></Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="1st Prize"
                                    name="firstPrize"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <Icon
                                                classes={{
                                                    root: classes.iconRoot,
                                                }}
                                            >
                                                <img
                                                    className={
                                                        classes.imageIcon
                                                    }
                                                    src={firstPrize}
                                                />
                                            </Icon>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3} sm={3} md={3}></Grid>

                            {/* 2nd Row */}
                            <Grid item xs={3} sm={3} md={3}></Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="2nd Prize"
                                    name="secondPrize"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <Icon
                                                classes={{
                                                    root: classes.iconRoot,
                                                }}
                                            >
                                                <img
                                                    className={
                                                        classes.imageIcon
                                                    }
                                                    src={secondPrize}
                                                />
                                            </Icon>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3} sm={3} md={3}></Grid>

                            {/* 3rd Row */}
                            <Grid item xs={3} sm={3} md={3}></Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className={classes.innerGrid}
                            >
                                <TextField
                                    label="3rd Prize"
                                    name="thirdPrize"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <Icon
                                                classes={{
                                                    root: classes.iconRoot,
                                                }}
                                            >
                                                <img
                                                    className={
                                                        classes.imageIcon
                                                    }
                                                    src={thirdPrize}
                                                />
                                            </Icon>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3} sm={3} md={3}></Grid>
                        </Grid>
                    </Paper>
                </Grid>
            
                <Grid item xs={12} sm={12} md={12}>
                    <center>
                    <Button variant="contained" size="large">Publish</Button>
                    </center>
                </Grid>
            </Grid>

            

            <Footer />
        </div>
    );
};

export default Organizepage;
