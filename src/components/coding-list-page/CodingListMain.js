import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Questionlist from "./QuestionList";
import axios from "axios";
import { AppContext } from "../../AppContext";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "40px 20px",
    },

    sectionHeader: {
        padding: "0 10px",
    },
}));

const Codinglistmain = (props) => {
    const classes = useStyles();
    const [category, setCategory] = useState("");
    const history = useHistory();

    const { setShowBanner } = useContext(AppContext);

    useEffect(() => {
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

        let pathname = props.location.pathname.split("/");
        // "/coding/practice/javascript"
        // "/coding/practice/python"
        // "/coding/practice/data-structures"

        switch (pathname[3]) {
            case "javascript":
                setCategory("javascript");
                break;
            case "python":
                setCategory("python");
                break;
            case "c++":
                setCategory("c++");
                break;
            case "data-structures":
                setCategory("data-structures");
                break;
            case "algorithms":
                setCategory("algorithms");
                break;
            default:
                history.push("/dashboard");
        }
    }, []);

    return (
        <>
            <NavBar />
            <div>
                <Grid container className={classes.container}>
                    {/* Section Title */}
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        style={{ display: "flex" }}
                    >
                        <Typography
                            fontFamily="Open Sans"
                            style={{ textDecoration: "underline" }}
                            className={classes.sectionHeader}
                            variant="h6"
                        >
                            Coding
                        </Typography>

                        <Typography
                            fontFamily="Open Sans"
                            className={classes.sectionHeader}
                            variant="h6"
                        >
                            >
                        </Typography>

                        <Typography
                            fontFamily="Open Sans"
                            style={{ textDecoration: "underline" }}
                            className={classes.sectionHeader}
                            variant="h6"
                        >
                            {`${category
                                .charAt(0)
                                .toUpperCase()}${category.slice(1)}`}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        {/* Questions List */}
                        {category && <Questionlist category={category} />}
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </>
    );
};

export default Codinglistmain;
