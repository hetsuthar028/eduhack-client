import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import NavBar from "../../navbar/NavBar";
import Footer from "../../footer/Footer";
import {
    Button,
    TextField,
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
import Formsectionheader from "../FormSectionHeader/FormSectionHeader";
import getIcon from "../../../static/Icons/getIcon";
import axios from "axios";
import { AppContext } from "../../../AppContext";
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
    const [hackathonSubmissionStatus, setHackathonSubmissionStatus] =
        useState(false);
    const [hackathonEndStatus, setHackathonEndStatus] = useState(false);
    const [submissionRemaningTime, setSubmissionRemainingTime] = useState("");
    const [userSubmissionStatus, setUserSubmissionStatus] = useState(null);
    const [userAlreadySubmittedSolutionLink, setUserAlreadySubmittedSolutionLink] = useState(null);
    const [submissionFile, setSubmissionFile] = useState(null);

    const handleAfterFormResponse = () => {
        setTimeout(() => {
            setShowBanner(null);
        }, 3000);
    };

    const getRemainingTime = () => {
        currentDate = new Date();
        return `${hackEnd.getDate() - currentDate.getDate() - 1}:${
            24 - hackEnd.getHours() - currentDate.getHours() - 1
        }:${60 - hackEnd.getMinutes() - currentDate.getMinutes() - 1}:${
            60 - hackEnd.getSeconds() - currentDate.getSeconds() - 1
        }`;
    };

    useEffect(() => {
        console.log("Submission page", props.match.params.id);
        try {
            axios
                .get(`http://localhost:4200/api/user/currentuser`, {
                    headers: {
                        authorization: localStorage.getItem("session"),
                    },
                })
                .then((responses) => {
                    console.log("C User Sub Resp", responses.data.currentUser);
                    setCurrentUser(responses.data.currentUser);
                    if (
                        !responses.data.currentUser ||
                        responses.data.currentUser === undefined ||
                        Object.keys(responses.data.currentUser).length == 0
                    ) {
                        setShowBanner({
                            apiErrorResponse: "You must be Signed In!",
                        });
                        return history.push("/auth/signin");
                    }

                    if (responses.data.currentUser.userType == "organization") {
                        setShowBanner({
                            apiSuccessResponse:
                                "You can't register to a hackathon as an organization user! Kindly Sign In through developer's account.",
                        });
                        return history.push(
                            `/hackathon/view/${props.match.params.id}`
                        );
                    }

                    axios
                        .post(
                            `http://localhost:4400/api/hackathon/get/checkregistration/${props.match.params.id}`,
                            {
                                currentUser: responses.data.currentUser,
                            }
                        )
                        .then((resp) => {
                            if (resp.data.message == "already registered") {
                                axios
                                    .get(
                                        `http://localhost:4400/api/hackathon/get/id/${props.match.params.id}`,
                                        {
                                            headers: {
                                                authorization:
                                                    localStorage.getItem(
                                                        "session"
                                                    ),
                                            },
                                        }
                                    )
                                    .then((responses) => {
                                        setHackathon(
                                            responses.data.get_hackathon_db
                                                .hackathon
                                        );
                                        console.log("Responses = ", responses);

                                        // Check hackathon start status
                                        // Allow submissions only if the hackathon start date is valid

                                        hackStart = new Date(
                                            responses.data.get_hackathon_db.hackathon.hackStart
                                        );
                                        hackEnd = new Date(
                                            responses.data.get_hackathon_db.hackathon.hackEnd
                                        );

                                        if (currentDate >= hackStart) {
                                            setHackathonSubmissionStatus(true);
                                            submissionTimeInterval =
                                                setInterval(() => {
                                                    setSubmissionRemainingTime(
                                                        getRemainingTime()
                                                    );
                                                }, 1000);
                                        } else {
                                            setHackathonSubmissionStatus(false);
                                        }

                                        if (currentDate >= hackEnd) {
                                            setHackathonEndStatus(true);
                                        } else {
                                            setHackathonEndStatus(false);
                                        }

                                        let hr = Math.ceil(
                                            (hackStart - currentDate) /
                                                (1000 * 60 * 60)
                                        );
                                        let mn = Math.floor(
                                            (hackStart - currentDate) /
                                                (1000 * 60 * 60)
                                        );

                                        setProblemStatements(
                                            responses.data
                                                .get_problem_statements_db
                                                .problemStatements
                                        );
                                        setSliders(
                                            responses.data.get_sliders_db
                                                .sliders
                                        );

                                        axios.get(`http://localhost:4400/api/hackathon/get/user/submission`, {
                                            headers: {
                                                authorization: localStorage.getItem('session'),
                                            }
                                        }).then((submissionResp) => {
                                            try{
                                                let userSubmission = submissionResp.data.responses.get_user_submission.userSubmission;
                                                console.log("User Submission", typeof userSubmission);
                                                if(Object.keys(userSubmission).length != 0){
                                                    console.log("User Sub to TRUE")
                                                    setUserSubmissionStatus(true);
                                                    setUserAlreadySubmittedSolutionLink(userSubmission.submissionLink)
                                                } else{
                                                    console.log("User Sub to FALSE")
                                                    setUserSubmissionStatus(false);
                                                }
                                            } catch(err){
                                                console.log("User Sub to IN ERRR", err)
                                                setUserSubmissionStatus(false);
                                            }
                                        }).catch((err) => {

                                        })
                                    })
                                    .catch((err) => {
                                        if (
                                            err.response?.data == "Invalid user"
                                        ) {
                                            setShowBanner({
                                                apiErrorResponse:
                                                    err.response.data,
                                            });
                                            return history.push("/auth/signin");
                                        }
                                        if (
                                            err.response?.data ==
                                            "Hackathon doesn't exists!"
                                        ) {
                                            setShowBanner({
                                                apiErrorResponse:
                                                    err.response.data,
                                            });
                                            return history.push("/dashboard");
                                        }
                                        console.log(
                                            "Error fetching hackathon in Submission page axios"
                                        );
                                    });
                            } else {
                                setShowBanner({
                                    apiErrorResponse:
                                        "Please register to view submission page!",
                                });
                                return history.push(
                                    `/hackathon/view/${props.match.params.id}`
                                );
                            }
                        })
                        .catch((err) => {});
                })
                .catch((err) => {
                    console.log("ERR Current User in Dashboard", err);
                    setShowBanner({
                        apiErrorResponse:
                            "Error fetching data! Please try again.",
                    });
                });
        } catch (err) {
            console.log("Error in Catch", err);
        } finally {
            handleAfterFormResponse();
        }

        return () => {
            clearInterval(submissionTimeInterval);
        };
    }, []);

    const handleSelectChange = (e) => {
        setCurrentProblemStatement(e.target.value);
    };

    const renderIcon = (tech) => {
        return getIcon(tech.toLowerCase());
    };

    const handleSubmissionFileChange = (e) => {
        let submissionFormData = new FormData();
        submissionFormData.append("userImage", e.target.files[0]);

        setSubmissionFile(submissionFormData);
    };

    const getProperSubmissionExt = () => {
        let allExts = "";
        // console.log("Hackathon", hackathon)
        splitString(hackathon.submissionFormats, ",").map((format) => {
            allExts += `.${format.toLowerCase()}, `;
        });
        return allExts;
    };

    const handleSubmissionSubmit = () => {

        setShowBanner({apiSuccessResponse: "Your submission is getting uploaded 🤩⌛! Please wait..."})

        axios
            .post(
                `http://localhost:4400/api/hackathon/tempUpload`,
                submissionFile,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                }
            )
            .then((resp) => {
                console.log("Uploaded File Data", resp.data);
                axios
                    .post(
                        `http://localhost:4400/api/hackathon/upload/submission/storage`,
                        {
                            filePath: resp.data.filePaths[0],
                            userEmail: currentUser.email,
                            hackathonID: hackathon.id,
                            problemStatementID: currentProblemStatement,
                        }
                    )
                    .then((uploadResp) => {
                        console.log("Upload Resp", uploadResp.data);
                        setShowBanner({
                            apiSuccessResponse:
                                "You have successfully submitted your solution! 🤩👨‍💻",
                        });
                        setTimeout(() => {
                            return history.push(`/hackathon/view/${hackathon.id}`)
                        }, 2000);
                        
                    })
                    .catch((err) => {
                        console.log("Error response", err.response);
                        return setShowBanner({
                            apiErrorResponse: err.response.data.errors,
                        });
                    });
            })
            .catch((err) => {
                console.log("Error uploading solution", err);
            })
            .finally(() => {
                handleAfterFormResponse();
            });
    };

    return (
        <Typography fontFamily="Open Sans">
            <div className={classes.parent}>
                <NavBar location="dashboard" style={{ position: "relative" }} />

                <Grid container>
                    {/* Top Carousel */}
                    <Grid item xs={12} sm={12} md={12}>
                        <Carousel defaultSliders={false} sliders={sliders} />
                    </Grid>

                    <Button
                        variant="contained"
                        style={{
                            position: "absolute",
                            top: "80px",
                            marginLeft: "20px",
                        }}
                    >
                        <Typography variant="h6" fontFamily="Open Sans">
                            {hackathonSubmissionStatus
                                ? hackathonEndStatus
                                    ? "Hackathon Ended!"
                                    : submissionRemaningTime
                                : "Starting Soon!"}
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
                    <Grid item xs={12} sm={12} md={12} className={classes.innerGrid}>
                        <Typography
                            variant="h6"
                            fontFamily="Open Sans"
                            style={{color: 'red'}}
                            fontWeight="bold"
                        >
                            **You can Submit your solution ONLY ONCE!
                        </Typography>
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
                                style={{ display: "flex", placeSelf: "center" }}
                            >
                                <Avatar
                                    style={{
                                        backgroundColor: "#F0FFF0",
                                        boxShadow: "5px 5px 5px #ccc",
                                        margin: "0 10px",
                                    }}
                                >
                                    <Icon>
                                        <img
                                            src={renderIcon(tech.trim())}
                                            style={{ width: "100%" }}
                                        />
                                    </Icon>
                                </Avatar>
                                <Typography
                                    variant="h6"
                                    style={{ placeSelf: "center" }}
                                >
                                    {tech}
                                </Typography>
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
                        {hackathonSubmissionStatus ? (
                            hackathonEndStatus ? (
                                <Typography
                                    variant="h6"
                                    fontFamily="Open Sans"
                                    color="primary"
                                >
                                    Hackathon is already ended. You can't submit
                                    your solution now! ❌
                                </Typography>
                            ) : currentProblemStatement ? (
                                userSubmissionStatus ? (
                                    <Typography
                                        variant="h5"
                                        style={{color: 'green'}}
                                        fontWeight="bold"
                                        fontFamily="Open Sans"
                                    >
                                     ✔️ Your Submission: <a target="_blank" href={userAlreadySubmittedSolutionLink}>Click Here</a>
                                    </Typography>
                                ): (
                                    <TextField
                                        type="file"
                                        variant="outlined"
                                        onChange={handleSubmissionFileChange}
                                        inputProps={{
                                            accept: getProperSubmissionExt(),
                                        }}
                                    />
                                )
                                
                            ) : (
                                "Please Select Problem Statement"
                            )
                        ) : (
                            <Typography
                                variant="h6"
                                fontFamily="Open Sans"
                                color="primary"
                            >
                                ⏳ You can submit your solutions only after the
                                Hackathon has started!
                            </Typography>
                        )}
                        <br />
                        <br />
                        <Typography
                            variant="h6"
                            fontFamily="Open Sans"
                            style={{color: 'red'}}
                            fontWeight="bold"
                        >
                            **You can Submit your solution ONLY ONCE!
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.innerGrid}
                    style={{ marginTop: "20px" }}
                >
                    <center>
                        <Button
                            variant="contained"
                            size="large"
                            disabled={
                                !hackathonSubmissionStatus ||
                                currentProblemStatement == 0
                            }
                            onClick={() => {
                                handleSubmissionSubmit();
                            }}
                        >
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
