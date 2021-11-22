import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import { Grid, Typography, Avatar, Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Codeeditor from "../code-editor/CodeEditor";
import axios from "axios";
import { AppContext } from "../../AppContext";

const useStyles = makeStyles(() => ({
    container: {
        padding: "30px 20px",
    },
    innerGrid: {
        padding: "10px",
    },
    compactGrid: {
        padding: "5px 10px",
    },
    blankSpaceGrid: {
        padding: "5px",
    },
    sectionHeader: {
        padding: "0 5px",
    },
    paper: {
        padding: "10px",
    },
    smallVertPadding: {
        padding: "3px 0",
    },
}));

const Codingmain = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { setShowBanner } = useContext(AppContext);

    const [question, setQuestion] = useState({});
    const [defaultCode, setDefaultCode] = useState("");

    const formatExamples = (example) => {
        let temp = JSON.stringify(example).slice(1, -1);
        return temp;
    };

    const handleAfterFormResponse = () => {
        setTimeout(() => {
            setShowBanner(null);
        }, 3000);
    };

    useEffect(() => {
        console.log("UseEffect in Coding Main");

        axios
            .get(`http://localhost:4200/api/user/currentuser`, {
                headers: {
                    authorization: localStorage.getItem("session"),
                },
            })
            .then((responses) => {
                console.log("C User Dash Resp", responses.data.currentUser);

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
            })
            .catch((err) => {
                console.log("ERR Current User in Dashboard", err);
                setShowBanner({
                    apiErrorResponse: "Error fetching data! Please try again.",
                });
            });

        axios
            .get(
                `http://localhost:9200/api/coding/get/question?id=${props.match.params.id}`
            )
            .then((response) => {
                if (response) {
                    try {
                        console.log("Got question", response);
                        response.data.questionData[0].inputExample =
                            formatExamples(
                                response.data.questionData[0].inputExample
                            );
                        // response.data.questionData[0].outputExample =
                        setQuestion(response.data.questionData[0]);
                    } catch (err) {
                        setShowBanner({ apiErrorResponse: "Invalid question" });
                        return history.goBack();
                    } finally {
                        handleAfterFormResponse();
                    }
                } else {
                    setShowBanner({ apiErrorResponse: "Invalid question" });
                    handleAfterFormResponse();
                    // return history.goBack();
                }
            })
            .catch((err) => {
                console.log("Error fetching question @CodingMain", err);
            });

        axios
            .get(`http://localhost:9200/api/coding/get/defaultFile/javascript`)
            .then((response) => {
                console.log("Default code", response.data.content);
                setDefaultCode(response.data.content);
            })
            .catch((err) => {
                console.log("Error fetching default file @CodingMain");
            });
    }, []);

    return (
        <>
            <NavBar />
            <div>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={5.5}
                        style={{
                            height: "100vh",
                            overflow: "auto",
                            clear: "both",
                        }}
                    >
                        <Grid container className={classes.container}>
                            {/* Section Title */}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                style={{ display: "flex" }}
                            >
                                <Avatar
                                    style={{
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: "green",
                                        placeSelf: "center",
                                        margin: "0 10px",
                                    }}
                                >
                                    {" "}
                                </Avatar>
                                <Typography
                                    fontFamily="Open Sans"
                                    style={{ textDecoration: "underline" }}
                                    className={classes.sectionHeader}
                                    variant="body2"
                                    fontWeight="bold"
                                >
                                    Coding
                                </Typography>

                                <Typography
                                    fontFamily="Open Sans"
                                    className={classes.sectionHeader}
                                    variant="body2"
                                    fontWeight="bold"
                                >
                                    >
                                </Typography>

                                <Typography
                                    fontFamily="Open Sans"
                                    style={{ textDecoration: "underline" }}
                                    className={classes.sectionHeader}
                                    variant="body2"
                                    fontWeight="bold"
                                >
                                    {question.category &&
                                        `${question.category
                                            .charAt(0)
                                            .toUpperCase()}${question.category.slice(
                                            1
                                        )}`}
                                </Typography>

                                <Typography
                                    fontFamily="Open Sans"
                                    className={classes.sectionHeader}
                                    variant="body2"
                                    fontWeight="bold"
                                >
                                    >
                                </Typography>

                                <Typography
                                    fontFamily="Open Sans"
                                    style={{ textDecoration: "underline" }}
                                    className={classes.sectionHeader}
                                    variant="body2"
                                    fontWeight="bold"
                                >
                                    {question._id}
                                </Typography>
                            </Grid>

                            {/* Question description section STARTS here */}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.innerGrid}
                                style={{ padding: "30px 10px" }}
                            >
                                <Typography
                                    fontFamily="Open Sans"
                                    variant="h4"
                                    style={{ color: "green" }}
                                    fontWeight="bold"
                                >
                                    {question.title}
                                </Typography>
                            </Grid>

                            {/* Question description */}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.innerGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                >
                                    {question.description}
                                </Typography>
                            </Grid>

                            {/* Space Grid */}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.blankSpaceGrid}
                            />

                            {/* Question - Input Section */}
                            <Grid
                                item
                                xs={2}
                                sm={2}
                                md={2}
                                className={classes.compactGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                    fontWeight="bold"
                                    style={{ color: "red" }}
                                >
                                    Input:
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={10}
                                sm={10}
                                md={10}
                                className={classes.compactGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                >
                                    {question.inputDescription}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                sm={2}
                                md={2}
                                className={classes.compactGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                    fontWeight="bold"
                                    style={{ color: "red" }}
                                >
                                    Eg:
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={10}
                                sm={10}
                                md={10}
                                className={classes.compactGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                >
                                    {question.inputExample}
                                </Typography>
                            </Grid>

                            {/* Space Grid */}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.blankSpaceGrid}
                            />

                            {/* Question - Output Section */}
                            <Grid
                                item
                                xs={2}
                                sm={2}
                                md={2}
                                className={classes.compactGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                    fontWeight="bold"
                                    style={{ color: "red" }}
                                >
                                    Output:
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={10}
                                sm={10}
                                md={10}
                                className={classes.compactGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                >
                                    {question.outputDescription}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                sm={2}
                                md={2}
                                className={classes.compactGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                    fontWeight="bold"
                                    style={{ color: "red" }}
                                >
                                    Eg:
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={10}
                                sm={10}
                                md={10}
                                className={classes.compactGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                >
                                    {JSON.stringify(question.outputExample)}
                                </Typography>
                            </Grid>

                            {/* Space Grid */}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.blankSpaceGrid}
                            />
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.blankSpaceGrid}
                            />
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.blankSpaceGrid}
                            />

                            {/* Sample Input Header Section */}
                            <Grid
                                item
                                xs={4}
                                sm={4}
                                md={4}
                                className={classes.compactGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                    fontWeight="bold"
                                    style={{ color: "red" }}
                                >
                                    Function Schema:
                                </Typography>
                            </Grid>

                            {/* Sample Output Header Section */}
                            <Grid
                                item
                                xs={8}
                                sm={8}
                                md={8}
                                className={classes.compactGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                >
                                    {question.functionName &&
                                        `${
                                            question.functionName
                                        }(${question.parameters.map((para) => {
                                            return para;
                                        })})`}
                                </Typography>
                            </Grid>

                            <Grid
                                item
                                xs={4}
                                sm={4}
                                md={4}
                                className={classes.innerGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                    fontWeight="bold"
                                    style={{ color: "red" }}
                                >
                                    Max Execution Time:
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={8}
                                sm={8}
                                md={8}
                                className={classes.innerGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                >
                                    {`${question.maxExecutionInSec} seconds`}
                                </Typography>
                            </Grid>

                            {/* Test cases title */}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.innerGrid}
                            >
                                <Typography
                                    variant="body1"
                                    fontFamily="Open Sans"
                                    fontWeight="bold"
                                    style={{ color: "green" }}
                                >
                                    Test Cases:
                                </Typography>
                            </Grid>

                            {/* Test Cases List */}
                            {question.testCases &&
                                question.testCases.map((testcase, idx) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        className={classes.innerGrid}
                                    >
                                        <Paper
                                            elevation={2}
                                            className={classes.paper}
                                        >
                                            <Grid container>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={12}
                                                    className={
                                                        classes.smallVertPadding
                                                    }
                                                >
                                                    <Typography
                                                        fontFamily="Open Sans"
                                                        variant="body1"
                                                        fontWeight="bold"
                                                    >
                                                        {`Test Case - ${
                                                            idx + 1
                                                        }`}
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    sm={6}
                                                    md={6}
                                                    className={
                                                        classes.smallVertPadding
                                                    }
                                                >
                                                    <Typography
                                                        fontFamily="Open Sans"
                                                        variant="body2"
                                                    >
                                                        Inputs:
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    sm={6}
                                                    md={6}
                                                    className={
                                                        classes.smallVertPadding
                                                    }
                                                >
                                                    <Typography
                                                        fontFamily="Open Sans"
                                                        variant="body2"
                                                    >
                                                        {formatExamples(
                                                            testcase.parameters
                                                        )}
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    sm={6}
                                                    md={6}
                                                    className={
                                                        classes.smallVertPadding
                                                    }
                                                >
                                                    <Typography
                                                        fontFamily="Open Sans"
                                                        variant="body2"
                                                    >
                                                        Output:
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    sm={6}
                                                    md={6}
                                                    className={
                                                        classes.smallVertPadding
                                                    }
                                                >
                                                    <Typography
                                                        fontFamily="Open Sans"
                                                        variant="body2"
                                                    >
                                                        {JSON.stringify(
                                                            testcase.output
                                                        )}
                                                    </Typography>
                                                </Grid>
                                                {/* </Typography> */}
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                ))}

                            {/* Space Grid */}
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.blankSpaceGrid}
                            />
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                className={classes.blankSpaceGrid}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6.5}
                        style={{ padding: "30px 10px" }}
                    >
                        {Object.keys(question).length != 0 ? (
                            <Codeeditor
                                defaultCode={defaultCode}
                                question={question}
                            />
                        ) : (
                            <></>
                        )}
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </>
    );
};

export default Codingmain;
