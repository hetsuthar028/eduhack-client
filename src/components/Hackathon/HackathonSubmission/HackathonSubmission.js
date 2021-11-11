import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
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
import getIcon from "../../../static/Icons/getIcon";
import axios from "axios";
import { AppContext } from '../../../AppContext';
import Carousel from "../../carousel/Carousel";

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
        padding: "5px 20px",
    },
    technologies: {
        padding: "10px 20px",
    },
}));

const splitString = (inputString, by) => {
    // console.log("Data", inputString);
    return inputString.split(`${by}`);
};

let currentDate = new Date();
let hackStart;
let hackEnd;
let submissionTimeInterval;

const Hackathonsubmission = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const { setShowBanner } = useContext(AppContext);

    const [currentUser, setCurrentUser] = useState({});
    const [hackathon, setHackathon] = useState({});
    const [problemStatements, setProblemStatements] = useState([]);
    const [sliders, setSliders] = useState([]);
    const [currentProblemStatement, setCurrentProblemStatement] = useState(0);
    const [hackathonSubmissionStatus, setHackathonSubmissionStatus] = useState(false);
    const [submissionRemaningTime, setSubmissionRemainingTime] = useState("");

    const handleAfterFormResponse = () => {
        setTimeout(() => {
            setShowBanner(null)
        }, 3000);
    }

    const getRemainingTime = () => {
        currentDate = new Date();
        return `${hackEnd.getDate() - currentDate.getDate() - 1}:${24 - hackEnd.getHours() - currentDate.getHours() -1}:${60 - hackEnd.getMinutes() - currentDate.getMinutes() - 1}:${60 - hackEnd.getSeconds() - currentDate.getSeconds() - 1}`;
    }

    useEffect(() => {
        console.log("Submission page", props.match.params.id);
        try{

            axios.get(`http://localhost:4200/api/user/currentuser`, {
                headers: {
                    authorization: localStorage.getItem('session')
                }
            })
            .then(responses => {
                console.log("C User Sub Resp", responses.data.currentUser)
                setCurrentUser(responses.data.currentUser);
                if(!responses.data.currentUser || responses.data.currentUser === undefined || Object.keys(responses.data.currentUser).length == 0){
                    setShowBanner({apiErrorResponse: "You must be Signed In!"});
                    return history.push('/auth/signin');
                }

                if(responses.data.currentUser.userType == "organization"){
                    setShowBanner({apiSuccessResponse: "You can't register to a hackathon as an organization user! Kindly Sign In through developer's account."});
                    return history.push(`/hackathon/view/${props.match.params.id}`)
                }

                axios.post(`http://localhost:4400/api/hackathon/get/checkregistration/${props.match.params.id}`, {
                    currentUser: responses.data.currentUser
                }).then((resp) => {
                    if(resp.data.message == 'already registered'){
                        axios.get(
                            `http://localhost:4400/api/hackathon/get/id/${props.match.params.id}`,
                            {
                                headers: {
                                    authorization: localStorage.getItem("session"),
                                },
                            }
                        )
                        .then((responses) => {
                            setHackathon(responses.data.get_hackathon_db.hackathon);
                            console.log("Responses = ", responses);

                            // Check hackathon start status
                            // Allow submissions only if the hackathon start date is valid
                            
                            hackStart = new Date(responses.data.get_hackathon_db.hackathon.hackStart);
                            hackEnd = new Date(responses.data.get_hackathon_db.hackathon.hackEnd);

                            if(currentDate >=hackStart){
                                setHackathonSubmissionStatus(true);
                                submissionTimeInterval = setInterval(() => {
                                    setSubmissionRemainingTime(getRemainingTime())
                                }, 1000);
                            } else {
                                setHackathonSubmissionStatus(false);
                                
                            }

                            let hr = Math.ceil((hackStart - currentDate)/(1000*60*60))
                            let mn = Math.floor((hackStart - currentDate)/(1000*60*60))
                            // console.log(`Rem Time - ${hr}:${mn*60}`)
                            console.log("Rem Time", (24 - hackStart.getHours() - currentDate.getHours() - 1))
                            console.log("Rem Time", (60 - hackStart.getMinutes() - currentDate.getMinutes() -1))
                            console.log("Rem Time", (60 - hackStart.getSeconds() - currentDate.getSeconds() -1))
                            console.log("Rem Time", (currentDate.getDate() + 1) - (currentDate.getDate()) )
                            
                            setProblemStatements(
                                responses.data.get_problem_statements_db.problemStatements
                            );
                            setSliders(responses.data.get_sliders_db.sliders)
                        })
                        .catch((err) => {
                            if(err.response?.data == "Invalid user"){
                                setShowBanner({apiErrorResponse: err.response.data})
                                return history.push('/auth/signin')
                            }
                            if(err.response?.data == "Hackathon doesn't exists!"){
                                setShowBanner({apiErrorResponse: err.response.data})
                                return history.push('/dashboard')
                            }
                            console.log(
                                "Error fetching hackathon in Submission page axios"
                            );
                        });
                    }else {
                        setShowBanner({apiErrorResponse: "Please register to view submission page!"})
                        return history.push(`/hackathon/view/${props.match.params.id}`)
                    }

                }).catch((err) => {
                    
                })
            }).catch((err) => {
                console.log("ERR Current User in Dashboard", err);
                setShowBanner({apiErrorResponse: "Error fetching data! Please try again."})
            })

            
        } catch(err){
            console.log("Error in Catch", err);
        }finally {
            handleAfterFormResponse();
        }

        return () => {
            clearInterval(submissionTimeInterval);
        }
    }, []);

    const handleSelectChange = (e) => {
        setCurrentProblemStatement(e.target.value);
    };

    const renderIcon = (tech) => {
        return getIcon(tech.toLowerCase());
    };

    return (
        <Typography fontFamily="Open Sans">
            <div className={classes.parent}>
                <NavBar location="dashboard" style={{position: "relative"}}/>

                <Grid container>
                    {/* Top Carousel */}
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                    >
                        {/* <Grid container>
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
                                        Organized by{" "}
                                        {hackathon.organizedBy &&
                                            hackathon.organizedBy}
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
                        </Grid> */}
                        <Carousel defaultSliders={false} sliders={sliders} />
                    </Grid>

                    <Button variant="contained" style={{position: "absolute", top: "80px", marginLeft: "20px"}}>
                        <Typography variant="h6" fontFamily="Open Sans">
                            {hackathonSubmissionStatus ? (submissionRemaningTime): ("Starting Soon!")}
                        </Typography>
                    </Button>

                    {/* Problem Statement Title */}
                    <Grid
                        item
                        xs={12}
                        md={3}
                        sm={4}
                        className={classes.innerGrid}
                    >
                        <Formsectionheader name="Problem Statements" />
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
                                Problem Statements
                            </InputLabel>
                            <Select
                                id="demo-simple-select"
                                label="submissionFormat"
                                value={currentProblemStatement}
                                onChange={handleSelectChange}
                            >
                                {problemStatements.map((probState) => (
                                    <MenuItem
                                        value={probState.id}
                                        name={probState.id}
                                        key={probState.id}
                                    >
                                        {probState.title}
                                    </MenuItem>
                                ))}
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
                            {hackathon.submissionGuidelines &&
                                splitString(
                                    hackathon.submissionGuidelines,
                                    ". "
                                ).map((guideline) => <li>{guideline}</li>)}
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
                    {currentProblemStatement ? (
                        splitString(
                            problemStatements.filter(
                                (statement) =>
                                    statement.id == currentProblemStatement
                            )[0].technologies,
                            ","
                        ).map((tech) => (
                            <Grid
                                item
                                xs={6}
                                sm={4}
                                md={2}
                                className={classes.technologies}
                                style={{ display: "flex", placeSelf: "center"}}
                            >
                                <Avatar style={{backgroundColor: "#F0FFF0", boxShadow: "5px 5px 5px #ccc", margin: "0 10px"}}>
                                    <Icon>
                                        <img src={renderIcon(tech.trim())} style={{width: "100%"}}/>
                                    </Icon>
                                </Avatar>
                                <Typography variant="h6" style={{placeSelf: "center"}}>{tech}</Typography>
                            </Grid>
                        ))
                    ) : (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            className={classes.innerGrid}
                        >
                            Please Select Problem Statement
                        </Grid>
                    )}

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
                    {currentProblemStatement ? (
                        splitString(
                            problemStatements.filter(
                                (statement) =>
                                    statement.id == currentProblemStatement
                            )[0].refMaterial,
                            ", "
                        ).map((refLink) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.innerGrid}
                            >
                                <Link href={refLink}>{refLink}</Link>
                            </Grid>
                        ))
                    ) : (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            className={classes.innerGrid}
                        >
                            Please Select Problem Statement
                        </Grid>
                    )}

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
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.innerGrid}
                    >
                        {
                            hackathonSubmissionStatus ? (
                                <TextField
                                type="file" variant="outlined" />
                            ): (
                                <Typography variant="h6" fontFamily="Open Sans" color="primary">⏳ You can submit your solutions only after the Hackathon has started!</Typography>
                            )
                        }
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.innerGrid}
                    style={{marginTop: "20px"}}
                >
                    <center>
                        <Button variant="contained" size="large" disabled={!hackathonSubmissionStatus}>
                            Submit Solution
                        </Button>
                    </center>
                </Grid>

                <Footer />
            </div>
        </Typography>
    );
};

export default Hackathonsubmission;
