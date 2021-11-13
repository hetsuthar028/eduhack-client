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
    Divider,
    TableBody,
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
import axios from "axios";
import { AppContext } from "../../../AppContext";
import theme from "../../ui/Theme";
import useTable from "../../table/useTable";

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
    tableHeader: {
        padding: "0 20px",
    },
    tableHeaderCell: {
        padding: "10px",
    },
    tableCellInner: {
        padding: "10px",
        overflow: "auto",
    },
}));

const tableHeadCells = [
    { id: "userEmail", label: "Email" },
    { id: "fullName", label: "Full Name" },
    { id: "userName", label: "Username" },
    { id: "submissionLink", label: "Submission Link" },
    { id: "timeStamp", label: "Timestamp" },
];

const defaultWinners = {
    firstPrize: "",
    secondPrize: "",
    thirdPrize: "",
};

const Hackathonsummary = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState({});
    const [hackathon, setHackathon] = useState({});
    const [problemStatements, setProblemStatements] = useState([]);
    const [sliders, setSliders] = useState([]);
    const [submissions, setSubmissions] = useState(null);
    const [currentProblemStatement, setCurrentProblemStatement] = useState("");
    const [submittedUsers, setSubmittedUsers] = useState(null);
    const [filteredSubmissions, setFilteredSubmissions] = useState(null);
    const [winnersInput, setWinnersInput] = useState(defaultWinners);
    const [hasWinners, setHasWinners] = useState(null);
    

    const { TblContainer, TblHead, TblPagination } = useTable(
        submissions,
        tableHeadCells
    );

    const [
        selectedProblemStatementSubmissions,
        setSelectedProblemStatementSubmissions,
    ] = useState([]);

    const { setShowBanner } = useContext(AppContext);

    const handleAfterFormResponse = () => {
        setTimeout(() => {
            setShowBanner(null);
        }, 4000);
    };

    const handleSelectChange = (e) => {
        setCurrentProblemStatement(e.target.value);
        setSelectedProblemStatementSubmissions(
            submissions.filter((sub) => sub.problemStatID == e.target.value)
        );
        filterSubmissionsOnChange(e.target.value);
    };

    const getUserFromLocal = (email) => {
        return submittedUsers.filter((user) => email == user.email);
    };

    const filterSubmissionsOnChange = (probID) => {
        return filteredSubmissions.filter((sub) => sub.problemStatID == probID);
    };

    const handleWinnersChange = (e) => {
        let { name, value } = e.target;
        if(hasWinners){
            setShowBanner({apiErrorResponse: "Can't change winners once announced!"})
            setTimeout(() => {
                setShowBanner(null);
            }, 3000);
        } else{
            setWinnersInput({
                ...winnersInput,
                [name]: value,
            });
        }
        
    };

    const changeDefaultWinners = (winners) => {
        winners.map((winner) => {
            defaultWinners[winner.prize] = winner.userName;
        })
    }

    const announceWinnersHandler = (e) => {
        e.preventDefault();
        try {
            let { firstPrize, secondPrize, thirdPrize } = winnersInput;
            console.log("Winners", winnersInput);
            axios
                .post(`http://localhost:4400/api/hackathon/announce/winners`, {
                    winnersInput,
                    hackathonID: hackathon.id,
                })
                .then((resp) => {
                    console.log("Winners Resp", resp);
                    if (resp.data.success == true) {
                        return setShowBanner({
                            apiSuccessResponse:
                                "Winners added Successfully! 🤩👨‍🎓",
                        });
                    }
                })
                .catch((err) => {
                    console.log("Errors WInner upload", err.response?.data);
                });
        } catch (err) {
        } finally {
            handleAfterFormResponse();
        }
    };

    useEffect(() => {
        try {
            axios
                .get(`http://localhost:4200/api/user/currentuser`, {
                    headers: {
                        authorization: localStorage.getItem("session"),
                    },
                })
                .then((responses) => {
                    setCurrentUser(responses.data.currentUser);
                    if (
                        !responses.data.currentUser ||
                        responses.data.currentUser === undefined ||
                        Object.keys(responses.data.currentUser).length == 0
                    ) {
                        setShowBanner({
                            apiErrorResponse: "You must be signed in!",
                        });
                        return history.push("/auth/signin");
                    }

                    if (responses.data.currentUser.userType == "developer") {
                        setShowBanner({
                            apiSuccessResponse: "You're not authorized!",
                        });
                        return history.push(
                            `/hackathon/view/${props.match.params.id}`
                        );
                    }

                    axios
                        .get(
                            `http://localhost:4400/api/hackathon/get/id/${props.match.params.id}`,
                            {
                                body: {},
                                headers: {
                                    authorization:
                                        localStorage.getItem("session"),
                                },
                            }
                        )
                        .then((hackResp) => {
                            setHackathon(
                                hackResp.data.get_hackathon_db.hackathon
                            );
                            setProblemStatements(
                                hackResp.data.get_problem_statements_db
                                    .problemStatements
                            );
                            setSliders(hackResp.data.get_sliders_db.sliders);

                            setShowBanner({
                                apiSuccessResponse: "Loading Hackathon...",
                            });

                            axios
                                .get(
                                    `http://localhost:4400/api/hackathon/get/submissions/${props.match.params.id}`,
                                    {
                                        headers: {
                                            authorization:
                                                localStorage.getItem("session"),
                                        },
                                    }
                                )
                                .then((subResp) => {
                                    console.log("Got submissions", subResp);
                                    setSubmissions(subResp.data.submissions);
                                    setSubmittedUsers(subResp.data.users);
                                    setFilteredSubmissions(
                                        subResp.data.submissions
                                    );

                                    axios.get(`http://localhost:4400/api/hackathon/get/winners/${props.match.params.id}`)
                                        .then((winnerResp) => {
                                            console.log("Got Winners", winnerResp);
                                            if(winnerResp.data.data.length !=0){
                                                setHasWinners(true);
                                                changeDefaultWinners(winnerResp.data.data);
                                            } else {
                                                setHasWinners(false);
                                            }
                                        }).catch((err) => {
                                            console.log("Error getting winners", err.response?.data);
                                            setShowBanner({apiErrorResponse: "Can't fetch winners!"});
                                        })
                                    
                                })
                                .catch((err) => {
                                    return console.log(
                                        "Error getting submissions",
                                        err
                                    );
                                });
                        })
                        .catch((err) => {
                            console.log("Summary Catch", err);
                            if (
                                err.response?.data ==
                                "Hackathon doesn't exists!"
                            ) {
                                setShowBanner({
                                    apiErrorResponse: err.response?.data,
                                });
                                return history.push("/dashboard");
                            }

                            if (err.response?.data == "Invalid user") {
                                return history.push("/auth/login");
                            } else {
                                console.log("Error connecting to Server!");
                            }
                        });
                });
        } catch (err) {
        } finally {
            handleAfterFormResponse();
        }
    }, []);

    return (
        submittedUsers &&
        submissions &&
        filteredSubmissions &&
        hasWinners !=null && (
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
                                        <strong>
                                            CodeState'21 Version 2.0
                                        </strong>
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    md={3}
                                    sm={3}
                                    className={classes.nestedGrid}
                                    style={{
                                        display: "flex",
                                        placeSelf: "center",
                                    }}
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
                            <Typography variant="h6">
                                <strong>
                                    Total Submissions:{" "}
                                    {submissions && submissions.length}/
                                    {hackathon.maxParticipants}
                                </strong>
                            </Typography>
                        </Grid>

                        {/* Problem Statement DropDown */}
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
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            className={classes.innerGrid}
                        >
                            {/* Problem Statement Specific Submission */}

                            <Typography variant="subtitle1">
                                <strong>
                                    {currentProblemStatement ? (
                                        <>
                                            Problem Statement Submissions:{" "}
                                            {
                                                selectedProblemStatementSubmissions.length
                                            }
                                        </>
                                    ) : (
                                        "Please select Problem Statement"
                                    )}
                                </strong>
                            </Typography>
                        </Grid>

                        {/* Submission Table */}
                        <Box
                            component="div"
                            style={{ maxHeight: "80vh", overflow: "auto" }}
                        >
                            {/* Validating if User has selected any current problem statement */}
                            {currentProblemStatement ? (
                                <>
                                    {/* Table Header */}
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        className={classes.innerGrid}
                                    >
                                        <Paper
                                            elevation={10}
                                            style={{
                                                backgroundColor:
                                                    theme.palette.common
                                                        .orangeColor,
                                                border: "2px solid",
                                                borderColor:
                                                    theme.palette.secondary
                                                        .main,
                                                padding: "5px 10px",
                                            }}
                                        >
                                            <Grid
                                                container
                                                sm={12}
                                                md={12}
                                                xs={12}
                                            >
                                                <Grid
                                                    item
                                                    xs={6}
                                                    md={2}
                                                    sm={6}
                                                    className={
                                                        classes.tableCellInner
                                                    }
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontFamily="inherit"
                                                        color="white"
                                                    >
                                                        <strong>Email</strong>
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    md={0.3}
                                                    className={
                                                        classes.tableCellInner
                                                    }
                                                >
                                                    <Divider orientation="vertical" />
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    md={1}
                                                    sm={6}
                                                    className={
                                                        classes.tableCellInner
                                                    }
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontFamily="inherit"
                                                        color="white"
                                                    >
                                                        <strong>
                                                            Full Name
                                                        </strong>
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    md={0.3}
                                                    className={
                                                        classes.tableCellInner
                                                    }
                                                >
                                                    <Divider orientation="vertical" />
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    md={1}
                                                    sm={6}
                                                    className={
                                                        classes.tableCellInner
                                                    }
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontFamily="inherit"
                                                        color="white"
                                                    >
                                                        <strong>
                                                            Username
                                                        </strong>
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    md={0.3}
                                                    className={
                                                        classes.tableCellInner
                                                    }
                                                >
                                                    <Divider orientation="vertical" />
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    md={4}
                                                    sm={6}
                                                    className={
                                                        classes.tableCellInner
                                                    }
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontFamily="inherit"
                                                        color="white"
                                                    >
                                                        <strong>
                                                            Submission Link
                                                        </strong>
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    md={0.3}
                                                    className={
                                                        classes.tableCellInner
                                                    }
                                                >
                                                    <Divider orientation="vertical" />
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    md={2}
                                                    sm={6}
                                                    className={
                                                        classes.tableCellInner
                                                    }
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        fontFamily="inherit"
                                                        color="white"
                                                    >
                                                        <strong>
                                                            Timestamp
                                                        </strong>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                    {/* Table Body */}
                                    {filteredSubmissions.map((submission) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            className={classes.innerGrid}
                                            key={submission.id}
                                        >
                                            <Paper
                                                elevation={10}
                                                style={{
                                                    border: "1px solid",
                                                    borderColor:
                                                        theme.palette.primary
                                                            .main,
                                                    padding: "5px 10px",
                                                }}
                                            >
                                                <Grid
                                                    container
                                                    sm={12}
                                                    md={12}
                                                    xs={12}
                                                >
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        md={2}
                                                        sm={6}
                                                        className={
                                                            classes.tableCellInner
                                                        }
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            fontFamily="inherit"
                                                        >
                                                            {
                                                                submission.userEmail
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={0.3}
                                                        className={
                                                            classes.tableCellInner
                                                        }
                                                    >
                                                        <Divider orientation="vertical" />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        md={1}
                                                        sm={6}
                                                        className={
                                                            classes.tableCellInner
                                                        }
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            fontFamily="inherit"
                                                        >
                                                            {
                                                                getUserFromLocal(
                                                                    submission.userEmail
                                                                )[0].fullName
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={0.3}
                                                        className={
                                                            classes.tableCellInner
                                                        }
                                                    >
                                                        <Divider orientation="vertical" />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        md={1}
                                                        sm={6}
                                                        className={
                                                            classes.tableCellInner
                                                        }
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            fontFamily="inherit"
                                                        >
                                                            {
                                                                getUserFromLocal(
                                                                    submission.userEmail
                                                                )[0].username
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={0.3}
                                                        className={
                                                            classes.tableCellInner
                                                        }
                                                    >
                                                        <Divider orientation="vertical" />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        md={4}
                                                        sm={6}
                                                        className={
                                                            classes.tableCellInner
                                                        }
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            fontFamily="inherit"
                                                        >
                                                            <a
                                                                href={
                                                                    submission.submissionLink
                                                                }
                                                            >
                                                                {
                                                                    submission.submissionLink
                                                                }
                                                            </a>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        md={0.3}
                                                        className={
                                                            classes.tableCellInner
                                                        }
                                                    >
                                                        <Divider orientation="vertical" />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        md={2}
                                                        sm={6}
                                                        className={
                                                            classes.tableCellInner
                                                        }
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            fontFamily="inherit"
                                                        >
                                                            {
                                                                submission.timestamp
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </>
                            ) : (
                                <></>
                            )}
                        </Box>

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

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            className={classes.innerGrid}
                        >
                            <Paper
                                className={classes.formPaper}
                                style={{ padding: "20px 0" }}
                            >
                                <form onSubmit={announceWinnersHandler}>
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
                                                onChange={handleWinnersChange}
                                                value={winnersInput.firstPrize}
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
                                                                src={
                                                                    secondPrize
                                                                }
                                                            />
                                                        </Icon>
                                                    ),
                                                }}
                                                onChange={handleWinnersChange}
                                                value={winnersInput.secondPrize}
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
                                                onChange={handleWinnersChange}
                                                value={winnersInput.thirdPrize}
                                            />
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3}></Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            md={12}
                                            sm={12}
                                            className={classes.innerGrid}
                                        >
                                            <center>
                                                <Button
                                                    variant="contained"
                                                    type="submit"
                                                    disabled={hasWinners}
                                                >
                                                    {hasWinners ? (
                                                        "Winners Announced"
                                                    ): (
                                                        "Announce"
                                                    )}
                                                </Button>
                                            </center>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Footer />
                </Typography>
            </div>
        )
    );
};

export default Hackathonsummary;
