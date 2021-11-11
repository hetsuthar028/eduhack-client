import {
    Grid,
    Typography,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Box,
    Paper,
    TextField, 
    Icon,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import Footer from "../../footer/Footer";
import NavBar from "../../navbar/NavBar";
import Formsectionheader from "../FormSectionHeader/FormSectionHeader";
import {
    BusinessOutlined,
    Facebook,
    Instagram,
    LinkedIn,
    Twitter,
} from "@mui/icons-material";
import { makeStyles } from "@material-ui/core";
import firstPrize from "../../../static/Icons/firstPrize.svg";
import secondPrize from "../../../static/Icons/secondPrize.svg";
import thirdPrize from "../../../static/Icons/thirdPrize.svg";
import ReactVirtualizedTable from "../../table-demo/TableDemo";
import axios from 'axios';
import { AppContext } from "../../../AppContext";

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
        padding: "10px 20px",
    },
}));

const Hackathonsummary = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState({});
    const [hackathon, setHackathon] = useState({});
    const [problemStatements, setProblemStatements] = useState([]);
    const [sliders, setSliders] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [currentProblemStatement, setCurrentProblemStatement] = useState("");

    const [selectedProblemStatementSubmissions, setSelectedProblemStatementSubmissions] = useState([]);

    const { setShowBanner } = useContext(AppContext);

    const handleAfterFormResponse = () => {
        setTimeout(() => {
            setShowBanner(null);
        }, 4000);
    }

    const handleSelectChange = (e) => {
        setCurrentProblemStatement(e.target.value);
        setSelectedProblemStatementSubmissions(submissions.filter((sub) => sub.problemStatID == currentProblemStatement));
    }

    useEffect(() => {
        try{
            axios.get(`http://localhost:4200/api/user/currentuser`, {
                headers: {
                    authorization: localStorage.getItem('session'),
                }
            }).then((responses) => {
                setCurrentUser(responses.data.currentUser);
                if(!responses.data.currentUser || responses.data.currentUser === undefined || Object.keys(responses.data.currentUser).length == 0){
                    setShowBanner({apiErrorResponse: "You must be signed in!"});
                    return history.push('/auth/signin');
                }
    
                if(responses.data.currentUser.userType == "developer"){
                    setShowBanner({apiSuccessResponse: "You're not authorized!"})
                    return history.push(`/hackathon/view/${props.match.params.id}`);
                }
    
                axios.get(`http://localhost:4400/api/hackathon/get/id/${props.match.params.id}`, {
                    body: {
    
                    },
                    headers: {
                        authorization: localStorage.getItem('session'),
                    }
                }).then((hackResp) => {
                    setHackathon(hackResp.data.get_hackathon_db.hackathon);
                    setProblemStatements(hackResp.data.get_problem_statements_db.problemStatements);
                    setSliders(hackResp.data.get_sliders_db.sliders);
    
                    setShowBanner({apiSuccessResponse: 'Loading Hackathon...'});

                    axios.get(`http://localhost:4400/api/hackathon/get/submissions/${props.match.params.id}`, {
                        headers: {
                            authorization: localStorage.getItem('session'),
                        }
                    }).then((subResp) => {
                        console.log("Got submissions", subResp);
                    }).catch((err) => {
                        return console.log("Error getting submissions", err.response.data);
                    })
                }).catch((err) => {
                    console.log("Summary Catch", err);
                    if(err.response?.data == "Hackathon doesn't exists!"){
                        setShowBanner({apiErrorResponse: err.response?.data});
                        return history.push('/dashboard');
                    }

                    if(err.response?.data == "Invalid user"){
                        return history.push('/auth/login')
                    } else {
                        console.log("Error connecting to Server!");
                    }
                })
            })
        } catch(err){

        } finally{
            handleAfterFormResponse();
        }
        
    }, []);

    return (
        <div>
            <Typography fontFamily="Open Sans">
                <NavBar location="dashboard" />

                {/* Body Container Grid */}
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

                    {/* Submission Status Title */}
                    <Grid item xs={12} md={12} sm={12} />
                    <Grid
                        item
                        xs={12}
                        md={3}
                        sm={4}
                        className={classes.innerGrid}
                    >
                        <Formsectionheader name="Submissions Status" />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} />

                    {/* Submission Status Details */}
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.innerGrid}
                    >
                        {/* Total Submissions */}
                        <Box component="div" style={{ margin: "20px 0" }}>
                            <Typography variant="h6">
                                <strong>Total Submissions: {submissions && submissions.length}/{hackathon.maxParticipants}</strong>
                            </Typography>
                        </Box>
                        {/* Problem Statement DropDown */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Problem Statements
                            </InputLabel>
                            <Select
                                id="demo-simple-select"
                                label="probStateSummary"
                                value={currentProblemStatement}
                                onChange={handleSelectChange}
                            >
                                {problemStatements.map((probState) => (
                                    <MenuItem
                                        value={probState.id}
                                        key={probState.id}
                                        name={probState.id}
                                    >
                                        {probState.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Problem Statement Specific Submission */}
                        <Box component="div" style={{ margin: "20px" }}>
                            <Typography variant="subtitle1">
                                <strong>
                                    Problem Statement Submissions: {selectedProblemStatementSubmissions.length}
                                </strong>
                            </Typography>
                        </Box>

                        {/* Submission Table */}
                        <ReactVirtualizedTable />
                    </Grid>

                    {/* Add Winners Title */}
                    <Grid item xs={12} md={12} sm={12} />
                    <Grid
                        item
                        xs={12}
                        md={3}
                        sm={4}
                        className={classes.innerGrid}
                    >
                        <Formsectionheader name="Add Winners" />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} />

                    <Grid item xs={12} sm={12} md={12} className={classes.innerGrid}>
                    <Paper className={classes.formPaper} style={{padding: "20px 0"}}>
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
                                    label="1st Prize - Username"
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
                                    label="2nd Prize - Username"
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
                                    label="3rd Prize - Username"
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

                            <Grid item xs={12} md={12} sm={12} className={classes.innerGrid}>
                                <center>
                                <Button variant="outlined">Announce</Button>
                                </center>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                </Grid>

                

                <Footer />
            </Typography>
        </div>
    );
};

export default Hackathonsummary;
