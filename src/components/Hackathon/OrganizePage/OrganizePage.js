import React, { useState, useEffect } from "react";
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
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import "./OrganizePage.css";
import firstPrize from "../../../firstPrize.svg";
import secondPrize from "../../../secondPrize.svg";
import thirdPrize from "../../../thirdPrize.svg";
import Formsectionheader from "../FormSectionHeader/FormSectionHeader";
import Popup from "../Popup/Popup";
import Problemstatementform from '../ProblemStatementForm/ProblemStatementForm';
import useTable from "../../table/useTable";

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

// Initial Form Values
const initialValues = {
    hackTitle: "",
    hackCompanyName: "",
    hackDescription: "",
    regStart: "",
    regEnd: "",
    hackStart: "",
    hackEnd: "",
    totalApplications: "",
    problemStatements: [
        // {
        //     probTitle: "",
        //     probDescription: "",
        //     probTechnologies: "",
        //     probSolutionType: "",
        //     probRefLinks: "",
        // },
    ],
    sponsors: [
        // {
        //     sponsorName: "",
        //     sponsorImageLink: "",
        //     sponsorWebLink: "",
        // },
    ],
    submissionFormat: [],
    submissionGuidelines: "",
    linkedIn: "",
    facebook: "",
    instagram: "",
    twitter: "",
    companyWebsite: "",
    firstPrizeDesc: "",
    secondPrizeDesc: "",
    thirdPrizeDesc: "",
};

const tabelHeadCells = [
    {id: 'title', label: "Title"},
    {id: 'description', label: "Description"},
    {id: 'solutionType', label: "Solution Type"},
    {id: 'technologies', label: "Technologies"},
]

const Organizepage = () => {
    const classes = useStyles();

    

    const [values, setValues] = useState(initialValues);
    const [openPopup, setOpenPopup] = useState(false);

    const {TblContainer, TblHead, TblPagination} = useTable(values.problemStatements, tabelHeadCells);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleProblemStatementSubmit = (probDetails) => {
        setValues({
            ...values,
            problemStatements: [...values.problemStatements, probDetails]
        })
        setOpenPopup(false)
        console.log("After adding prob", values)
    }

    const handleSelectChange = (e) => {
        setValues({
            ...values,
            ["submissionFormat"]: e.target.value,
        });
        // console.log("Format", values.submissionFormat)
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("All values", values);
    };

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
                <form method="POST" onSubmit={handleFormSubmit}>
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
                                        onChange={handleInputChange}
                                        value={values.hackTitle}
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
                                        name="hackCompanyName"
                                        variant="outlined"
                                        type="text"
                                        required
                                        placeholder="Enter Company Name"
                                        size="small"
                                        fullWidth
                                        value={values.hackCompanyName}
                                        onChange={handleInputChange}
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
                                        value={values.regStart}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={handleInputChange}
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
                                        value={values.regEnd}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={handleInputChange}
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
                                        value={values.hackStart}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={handleInputChange}
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
                                        value={values.hackEnd}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={handleInputChange}
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
                                        value={values.totalApplications}
                                        onChange={handleInputChange}
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
                                        value={values.hackDescription}
                                        onChange={handleInputChange}
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
                                        onClick={() => setOpenPopup(true)}
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

                                <Grid item xs={12} sm={12} md={12}>
                                    <TblContainer>
                                        <TblHead />
                                            
                                        <TableBody>
                                            {
                                                values.problemStatements.map(statement => (
                                                    <TableRow key={statement.probTitle}>
                                                        <TableCell>{statement.probTitle}</TableCell>
                                                        <TableCell>{statement.probDescription}</TableCell>
                                                        <TableCell>{statement.probRefLinks}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </TblContainer>
                                    <TblPagination />

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
                                            value={values.submissionFormat}
                                            onChange={handleSelectChange}
                                        >
                                            <MenuItem
                                                value="ZIP"
                                                name="ZIP"
                                                key="ZIP"
                                            >
                                                ZIP
                                            </MenuItem>
                                            <MenuItem
                                                value="RAR"
                                                name="RAR"
                                                key="RAR"
                                            >
                                                RAR
                                            </MenuItem>
                                            <MenuItem
                                                value="TZ"
                                                name="TZ"
                                                key="TZ"
                                            >
                                                TZ
                                            </MenuItem>
                                            <MenuItem
                                                value="7Z"
                                                name="7Z"
                                                key="7Z"
                                            >
                                                7Z
                                            </MenuItem>
                                            <MenuItem
                                                value="Single Program File"
                                                name="Single Program File"
                                                key="Single Program File"
                                            >
                                                Single Program File
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
                                        label="Submission Guidelines"
                                        name="submissionGuidelines"
                                        size="small"
                                        type="text"
                                        fullWidth
                                        value={values.submissionGuidelines}
                                        onChange={handleInputChange}
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
                                        name="companyWebsite"
                                        placeholder="Website"
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        fullWidth
                                        value={values.companyWebsite}
                                        onChange={handleInputChange}
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
                                        value={values.facebook}
                                        onChange={handleInputChange}
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
                                        value={values.instagram}
                                        onChange={handleInputChange}
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
                                        value={values.twitter}
                                        onChange={handleInputChange}
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
                                        value={values.linkedIn}
                                        onChange={handleInputChange}
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
                                        name="firstPrizeDesc"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        size="small"
                                        value={values.firstPrizeDesc}
                                        onChange={handleInputChange}
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
                                        name="secondPrizeDesc"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        size="small"
                                        value={values.secondPrizeDesc}
                                        onChange={handleInputChange}
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
                                        name="thirdPrizeDesc"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        size="small"
                                        value={values.thirdPrizeDesc}
                                        onChange={handleInputChange}
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
                            <Button
                                variant="contained"
                                size="large"
                                type="Submit"
                            >
                                Publish
                            </Button>
                        </center>
                    </Grid>


                    {/* Problem Statement Dialog */}
                    <Popup
                        openPopup = {openPopup}
                        title="Add Problem Statement"
                        setOpenPopup = {setOpenPopup}
                    >
                        <Problemstatementform setOpenPopup={setOpenPopup} handleSubmit={handleProblemStatementSubmit} />
                    </Popup>
                </form>
            </Grid>

            <Footer />
        </div>
    );
};

export default Organizepage;
