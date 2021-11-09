import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
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
    FormHelperText,
} from "@mui/material";
import "./OrganizePage.css";
import firstPrize from "../../../static/Icons/firstPrize.svg"; 
import secondPrize from "../../../static/Icons/secondPrize.svg";
import thirdPrize from "../../../static/Icons/thirdPrize.svg";
import Formsectionheader from "../FormSectionHeader/FormSectionHeader";
import Popup from "../Popup/Popup";
import Problemstatementform from "../ProblemStatementForm/ProblemStatementForm";
import useTable from "../../table/useTable";
import Sponsorsform from "../SponsorsForm/SponsorsForm";
import axios from "axios";
import { AppContext } from "../../../AppContext";
import fs from 'fs';
import csv from 'csv-parser';
import Papa from 'papaparse';
import Slidersform from "../SlidersForm/SlidersForm";

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
        border: ".5px solid #d3d3d3"
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

    imageSponsor: {
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
    },
    errorMessage: {
        margin: "0px",
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
    submissionFormats: [],
    submissionGuidelines: "",
    linkedIn: "",
    facebook: "",
    instagram: "",
    twitter: "",
    companyWebsite: "",
    firstPrizeDesc: "",
    secondPrizeDesc: "",
    thirdPrizeDesc: "",
    sliders: [
        // sliderTitle: "",
        // sliderSubtitle: "",
    ],
};

const tabelHeadCells = [
    { id: "title", label: "Title" },
    { id: "description", label: "Description" },
    { id: "solutionType", label: "Solution Type" },
    { id: "technologies", label: "Technologies" },
];

const validateURL = (inputURL) => {
    let url;

    try {
        url = new URL(inputURL);
    } catch (_) {
        return false;
    }

    return url.protocol === "https:";
};

const Organizepage = () => {
    const classes = useStyles();
    const { setShowBanner } = useContext(AppContext);
    const history = useHistory();

    const [values, setValues] = useState(initialValues);
    const [openPopup, setOpenPopup] = useState(false);
    const [sponsorOpenPopup, setSponsorOpenPopup] = useState(false);
    const [sliderOpenPopup, setSliderOpenPopup] = useState(false)

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const [probStatementCSV, setProbStatementCSV] = useState(null);
    const [csvResult, setCsvResult] = useState([]);

    const { TblContainer, TblHead, TblPagination } = useTable(
        values.problemStatements,
        tabelHeadCells
    );

    const handleCSVUpload = (event) => {
        console.log("D", event.target.files[0]);
        setProbStatementCSV(event.target.files[0]);
    }

    const results = [];
    useEffect(() => {
        if(probStatementCSV !=null){
            // fs.createReadStream(probStatementCSV)
            //     .pipe(csv({}))
            //     .on('data', (data) => { results.push(data) })
            //     .on('end', () => {
            //         console.log("File results", results);
            //     })
            // getCsvData();
            console.log("CSV", probStatementCSV);
        }
    }, [probStatementCSV])

    const validateForm = (name, fieldValue) => {
        const fieldErrors = [];
        const hErrors = { ...errors };

        if (name == "hackTitle" && fieldValue.length < 8) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    MinLength should be 8
                </p>
            );
        }

        if (name == "hackCompanyName" && fieldValue.length < 5) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    MinLength should be 8
                </p>
            );
        }

        if (name == "regStart" && fieldValue) {
            let currentDate = new Date();
            let fieldDate = new Date(fieldValue);

            if (currentDate > fieldDate) {
                fieldErrors.push(
                    <p className={classes.errorMessage} name={name}>
                        Starting date should start from tomorrow!
                    </p>
                );
            }
        }

        if (name == "regEnd" && fieldValue) {
            let currentDate = new Date();
            let fieldDate = new Date(fieldValue);
            let startDate = new Date(values.regStart);

            if (fieldDate < currentDate || fieldDate <= startDate) {
                fieldErrors.push(
                    <p className={classes.errorMessage} name={name}>
                        Invalid Ending Date
                    </p>
                );
            }
        }

        if (name == "hackStart" && fieldValue) {
            let fieldDate = new Date(fieldValue);
            let regEndDate = new Date(values.regEnd);

            if (fieldDate < regEndDate) {
                fieldErrors.push(
                    <p className={classes.errorMessage} name={name}>
                        Hackathon must start after registration date ends!
                    </p>
                );
            }
        }

        if (name == "hackEnd" && fieldValue) {
            let fieldDate = new Date(fieldValue);
            let hackStartDate = new Date(values.hackStart);

            if (fieldDate < hackStartDate) {
                fieldErrors.push(
                    <p className={classes.errorMessage} name={name}>
                        Invalid Ending date
                    </p>
                );
            }
        }

        if (name == "totalApplications" && parseInt(fieldValue) <= 0) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    Invalid total number of applications.
                </p>
            );
        }

        if (name == "hackDescription" && fieldValue.length < 50) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    MinLength should be 50 characters.
                </p>
            );
        }

        if (name == "submissionGuidelines" && fieldValue.length < 10) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    MinLength should be 10
                </p>
            );
        }

        if (
            (name == "companyWebsite" ||
                name == "facebook" ||
                name == "linkedIn" ||
                name == "instagram" ||
                name == "twitter") &&
            !validateURL(fieldValue)
        ) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    Invalid Website Link
                </p>
            );
        }

        if (
            (name == "firstPrizeDesc" ||
                name == "secondPrizeDesc" ||
                name == "thirdPrizeDesc") &&
            fieldValue.length < 10
        ) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    MinLength should be 10
                </p>
            );
        }

        return {
            ...hErrors,
            [name]: fieldErrors,
        };
    };

    const checkFormValidation = (formErrors) => {
        let valid = 1;

        for (const [key, value] of Object.entries(formErrors)) {
            if (value.length) {
                valid = 0;
                break;
            }
        }

        return valid;
    };

    const getHelperText = (name) => {
        if (errors[name] && errors[name].length) {
            return errors[name];
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const inputErrors = {
            ...errors,
            ...validateForm(name, value),
        };

        setValues({
            ...values,
            [name]: value,
        });

        setErrors({
            ...inputErrors,
        });

        setIsFormValid(checkFormValidation(inputErrors));
    };

    const handleProblemStatementSubmit = (probDetails) => {
        setValues({
            ...values,
            problemStatements: [...values.problemStatements, probDetails],
        });
        setOpenPopup(false);
        console.log("After adding prob", values);
    };

    const handleSponsorSubmit = (sponsorDetails) => {
        setValues({
            ...values,
            sponsors: [...values.sponsors, sponsorDetails],
        });
        setSponsorOpenPopup(false);
    };

    const handleSliderSubmit = (sliderDetails) => {
        setValues({
            ...values,
            sliders: [...values.sliders, sliderDetails],
        });

        setSliderOpenPopup(false);
    }

    const handleSelectChange = (e) => {
        setValues({
            ...values,
            ["submissionFormats"]: e.target.value,
        });
        // console.log("Format", values.submissionFormat)
    };

    const handleAfterFormResponse = () => {
        setTimeout(() => {
            setShowBanner(null);
        }, 5000);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        try {
            values["submissionFormat"] = values["submissionFormats"].join(", ");
            let temp = values["hackStart"].split("-");
            let temp2 = values["hackEnd"].split("-");
            let temp3 = values["regStart"].split("-");
            let temp4 = values["regEnd"].split("-");
            values["hackStart"] = temp[2] + "-" + temp[1] + "-" + temp[0];
            values["hackEnd"] = temp2[2] + "-" + temp2[1] + "-" + temp2[0];
            values["regStart"] = temp3[2] + "-" + temp3[1] + "-" + temp3[0];
            values["regEnd"] = temp4[2] + "-" + temp4[1] + "-" + temp4[0];
            
            let {sliders, sponsors} = values;
            let slidersFormData = new FormData();
            let sponsorsFormData = new FormData();

            sliders.map((slide) => {
                console.log("Inv Image", slide.sliderImage)
                slidersFormData.append("userImage", slide.sliderImage)
            });

            sponsors.map((sponsor) => {
                console.log("Inv Sponsor Image", sponsor.sponsorImageLink)
                sponsorsFormData.append("userImage", sponsor.sponsorImageLink)
            })

                    axios.post('http://localhost:4400/api/hackathon/tempUpload', slidersFormData, {
                        headers: {
                            'Content-type': 'multipart/form-data',
                        }
                    }).then((resp) => {
                        
                        values["localUploadedSlidersFilesPath"] = resp.data.filePaths;
                        console.log("Updated - All values", values);

                        axios.post('http://localhost:4400/api/hackathon/tempUpload', sponsorsFormData, {
                            headers: {
                                'Content-type': 'multipart/form-data'
                            }
                        }).then((response) => {
                            values["localUploadedSponsorsFilesPath"] = response.data.filePaths;
                            console.log("Updated - All values 2", values);
                            axios.post(
                                    "http://localhost:4400/api/hackathon/create",
                                    {
                                        ...values,
                                    },
                                    {
                                        headers: {
                                            authorization: localStorage.getItem("session"),
                                        },
                                    }
                                )
                            .then((response) => {
                                setShowBanner({
                                    apiSuccessResponse:
                                        "Hackathon Created Successfully! 👨‍🎓",
                                });
    
                                console.log("Got Response, Hackathon Created!!");
                                console.log(
                                    response.data.add_hackathon_db.uniqueHackathonID
                                );
                                history.push(
                                    `/hackathon/view/${response.data.add_hackathon_db.uniqueHackathonID}`
                                );
                            })
                            .catch((err) => {
                                setShowBanner({
                                    apiErrorResponse:
                                        "Problem occured while creating a hackathon! 😦",
                                });
                                console.log("Error in axios while creating Hackathon", err);
                            });
                                console.log("Resp after uploading")
                                setShowBanner({apiSuccessResponse: "Your hackathon is being created! ⏳🤩 \nYou'll be automatically redirected to your hackathon page once it is created!"})
                                // setTimeout(() => {
                                //     setShowBanner(null);
                                // }, 2000);
                        })


                    }).catch((err) => {
                        console.log("ERR1", err);
                    })
            
        } catch (err) {
        } finally {
            handleAfterFormResponse();
        }
    };

    return (
        <div>
            <NavBar location="dashboard" />
            <form method="POST" onSubmit={handleFormSubmit}>
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
                        <Typography variant="h3" fontFamily="Bebas Neue">
                            Organize A Hackathon
                        </Typography>

                        <Button variant="contained">Save</Button>
                    </Grid>

                    {/* Hackathon Details Title */}
                    <Formsectionheader name="Hackathon" />

                    {/* Hackathon Details */}
                    <Grid item xs={12} sm={12} md={12}>
                        <Paper className={classes.formPaper} elevation={5}>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("hackTitle")}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("hackCompanyName")}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("regStart")}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("regEnd")}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("hackStart")}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("hackEnd")}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("totalApplications")}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("hackDescription")}
                                    </FormHelperText>
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
                                        CSV Format
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ marginLeft: "auto" }}
                                        onClick={() => {document.getElementById('csvUpload').click()}}
                                    >
                                        Import from CSV
                                    </Button>
                                    <input id="csvUpload" type="file" accept=".csv" style={{visibility: 'hidden' }} onChange={handleCSVUpload}/>
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
                                            {values.problemStatements.map(
                                                (statement) => (
                                                    <TableRow
                                                        key={
                                                            statement.probTitle
                                                        }
                                                    >
                                                        <TableCell>
                                                            {
                                                                statement.probTitle
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                statement.probDescription
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                statement.probSolutionType
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                statement.probAcceptedTechs
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
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
                                            label="submissionFormats"
                                            multiple
                                            value={values.submissionFormats}
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("submissionGuidelines")}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("companyWebsite")}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("facebook")}
                                    </FormHelperText>
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
                                    />
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("instagram")}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("twitter")}
                                    </FormHelperText>
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
                                    />
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("linkedIn")}
                                    </FormHelperText>
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

                    {/* Sponsors Title */}
                    <Formsectionheader name="Sponsors" />

                    {/* Sponsors Form */}
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
                                        onClick={() =>
                                            setSponsorOpenPopup(true)
                                        }
                                    >
                                        Add Sponsor
                                    </Button>
                                </Grid>

                                {/* We'll add reusable component here */}
                                {values.sponsors.map((sponsor) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={2.4}
                                        style={{ marginTop: "20px" }}
                                        key={sponsor.sponsorName}
                                    >
                                        <center>
                                            <div>
                                                <a
                                                    href={
                                                        sponsor.sponsorWebLink
                                                    }
                                                    target="_blank"
                                                >
                                                    <img
                                                        src="https://source.unsplash.com/random"
                                                        style={{
                                                            width: "200px",
                                                            height: "140px",
                                                            borderRadius:
                                                                "10px",
                                                        }}
                                                        className={
                                                            classes.imageSponsor
                                                        }
                                                    />
                                                </a>
                                            </div>
                                        </center>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Posters Title */}
                    <Formsectionheader name="Hackathon Sliders" />
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
                                        onClick={() =>
                                            setSliderOpenPopup(true)
                                        }
                                    >
                                        Add Slider
                                    </Button>
                                </Grid>

                                {/* We'll add reusable component here */}
                                {values.sliders.map((slider) => (
                                    <p>{slider.sliderTitle}</p>
                                ))}
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("firstPrizeDesc")}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("secondPrizeDesc")}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red",
                                        }}
                                    >
                                        {getHelperText("thirdPrizeDesc")}
                                    </FormHelperText>
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
                                disabled={!isFormValid}
                            >
                                Publish Hackathon
                            </Button>
                        </center>
                    </Grid>

                    {/* Problem Statement Dialog */}
                    <Popup
                        openPopup={openPopup}
                        title="Add Problem Statement"
                        setOpenPopup={setOpenPopup}
                    >
                        <Problemstatementform
                            setOpenPopup={setOpenPopup}
                            handleSubmit={handleProblemStatementSubmit}
                        />
                    </Popup>

                    {/* Sponsors Dialog */}
                    <Popup
                        openPopup={sponsorOpenPopup}
                        title="Add Sponsor"
                        setOpenPopup={setSponsorOpenPopup}
                    >
                        <Sponsorsform
                            setOpenPopup={setSponsorOpenPopup}
                            handleSubmit={handleSponsorSubmit}
                        />
                    </Popup>

                    {/* Slider Dialog */}
                    <Popup
                        openPopup={sliderOpenPopup}
                        title="Add Slider"
                        setOpenPopup={setSliderOpenPopup}
                    >
                        <Slidersform
                            setOpenPopup={setSliderOpenPopup}
                            handleSubmit={handleSliderSubmit}
                        />
                    </Popup>

                </Grid>
            </form>
            <Footer />
        </div>
    );
};

export default Organizepage;
