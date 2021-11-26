import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useHistory } from "react-router";

const NoQuestions = () => {
    const history = useHistory();

    const navigateToCategory = (category) => {
        let toUrl = `/coding/practice/${category}`;
        // <Redirect to='https://www.google.com' />
        history.push(toUrl);
    };

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12}>
                <Typography
                    variant="h5"
                    fontFamily="Open Sans"
                    fontWeight="bold"
                    style={{ padding: "5px 0" }}
                >
                    <center>Sorry!</center>
                </Typography>
                <Typography
                    variant="h5"
                    fontFamily="Open Sans"
                    fontWeight="bold"
                    style={{ padding: "5px 0" }}
                >
                    <center>
                        We do not have any questions related to this category
                        yet!
                    </center>
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} sm={12}>
                <center>
                    <Typography
                        variant="h6"
                        fontFamily="Open Sans"
                        fontWeight="bold"
                        style={{ color: "green", padding: "20px 0" }}
                    >
                        Till then explore and practice questions for these
                        categories:
                    </Typography>
                    <Button
                        variant="contained"
                        style={{ margin: "0 10px" }}
                        onClick={() => {
                            navigateToCategory("data-structures");
                        }}
                    >
                        Data Strucutures
                    </Button>
                    <Button
                        variant="contained"
                        style={{ margin: "0 10px" }}
                        onClick={() => {
                            navigateToCategory("javascript");
                        }}
                    >
                        JavaScript
                    </Button>
                    <Button
                        variant="contained"
                        style={{ margin: "0 10px" }}
                        onClick={() => {
                            navigateToCategory("python");
                        }}
                    >
                        Python
                    </Button>
                    <Button
                        variant="contained"
                        style={{ margin: "0 10px" }}
                        onClick={() => {
                            navigateToCategory("c++");
                        }}
                    >
                        C++
                    </Button>
                    <Button
                        variant="contained"
                        style={{ margin: "0 10px" }}
                        onClick={() => {
                            navigateToCategory("algorithms");
                        }}
                    >
                        Algorithms
                    </Button>
                </center>
            </Grid>
        </Grid>
    );
};

export default NoQuestions;
