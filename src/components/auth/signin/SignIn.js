import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import {
    TextField,
    Button,
    Box,
    FormGroup,
    Grid,
    Paper,
    Typography,
    Link,
    Avatar,
} from "@mui/material";
import theme from "../../ui/Theme";
import { color } from "@mui/system";
import { LockOutlined } from "@mui/icons-material";

const useStyles = makeStyles({
    root: {
        "& .MuiFormControl-root": {
            width: "100%",
            // margin: theme.spacing(1),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        "& .MuiButton-root": {
            width: "40%",
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            // margin: theme.spacing(1),
        },
    },
    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(3),
        width: "35%",
        // height: "100vw",
        margin: "auto",

        // display: "block",
        // verticalAlign: "middle",
    },
    formLink: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    mainContainer: {
        // height: "100%",
        // width: "100%",
        // margin: "10% auto",
        // Testing
        display: "grid",
        minHeight: "100vh",
        alignContent: "center",
        gridTemplateColumns: "auto",
        backgroundColor: theme.palette.common.lightMainGreenColor,
    },
    formButton: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        // color: theme.palette.primary.main
    },
});

const initialValues = {
    email: "",
    password: "",
};

const preventDefault = (event) => event.preventDefault();

const SignIn = () => {
    const classes = useStyles();

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        let temp = {};

        temp.email = re.test(values.email.toLowerCase()) ? "" : "Invalid";
        temp.password =
            values.password.length > 7
                ? ""
                : "Password length should be greater than 10.";
        console.log("Temp", temp);
        setErrors(
            {
                something: "true",
            },
            () => {
                return Object.values(temp).every((x) => x == "");
            }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:4200/api/user/signin", {
                email: values.email,
                password: values.password,
            })
            .then((response) => {
                if (response) {
                    // console.log("Logged In", response);
                    localStorage.setItem(
                        "session",
                        response.data.data.accessToken
                    );
                    return <Redirect to="http://localhost:3000/" />
                }
            })
            .catch((err) => {
                console.log("Some problem occured. Please try again!");
            });

        // if(!validate())
        //     console.log("Errors", errors);

        // if(validate()){
        //     window.alert("Valid");
        // }

        // axios
        //     .post("http://localhost:4200/api/user/signin", {
        //         email: "hetmewada0028@gmail.com",
        //         password: "kjha@s189023",
        //     })
        //     .then((response) => {
        //         console.log("Sign In", response.data);
        //         localStorage.setItem("session", response.data.data.accessToken);
        //     })
        //     .catch((err) => {
        //         console.log("Error occured while signing in...");
        //     });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid className={classes.mainContainer} xs={12} md={12} sm={12}>
                {/* <center> */}
                <Paper className={classes.pageContent}>
                    <center>
                        <Avatar
                            style={{
                                backgroundColor: `${theme.palette.primary.main}`,
                            }}
                        >
                            <LockOutlined />{" "}
                        </Avatar>
                        <h2
                            style={{ color: `${theme.palette.secondary.main}` }}
                        >
                            Sign In
                        </h2>
                    </center>
                    <form
                        className={classes.root}
                        elevation={10}
                        onSubmit={handleSubmit}
                    >
                        <Grid container xs={12} md={12} sm={12}>
                            <Grid item xs={12} md={12} sm={12}>
                                <Box>
                                    <TextField
                                        variant="outlined"
                                        label="Email"
                                        name="email"
                                        // type="email"
                                        type="text"
                                        value={values.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your First Name"
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        variant="outlined"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleInputChange}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        typography: "body1",
                                        "& > :not(style) + :not(style)": {
                                            ml: 2,
                                        },
                                    }}
                                    className={classes.formLink}
                                    //   onClick={preventDefault}
                                >
                                    <Typography
                                        variant="button"
                                        style={{ textDecoration: "underline" }}
                                    >
                                        {/* <p component={Link} to="/">Forgot Password?</p> */}
                                        <Link href="http://localhost:3000/">
                                            <b
                                                style={{
                                                    color: `${theme.palette.common.darkGreen}`,
                                                }}
                                            >
                                                Forgot Password
                                            </b>
                                        </Link>
                                    </Typography>
                                </Box>
                                <center>
                                    <Box
                                        sx={{
                                            width: 500,
                                            maxWidth: "100%",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            style={{
                                                backgroundColor: `${theme.palette.secondary.main}`,
                                                color: `${theme.palette.common.ternaryColor}`,
                                            }}
                                            type="Submit"
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                    <Box className={classes.formLink}>
                                        <Typography variant="body2">
                                            <Link href="http://localhost:3000/auth/signup">
                                                <b
                                                    style={{
                                                        color: `${theme.palette.common.darkGreen}`,
                                                    }}
                                                >
                                                    Don't have an Account?
                                                    Create Here
                                                </b>
                                            </Link>
                                        </Typography>
                                    </Box>
                                </center>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                {/* </center> */}
            </Grid>
        </ThemeProvider>
        // Testing purpose
        // <button onClick={handleSubmit}>Sign In</button>
    );
};

export default SignIn;
