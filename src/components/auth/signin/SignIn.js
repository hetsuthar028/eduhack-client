import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
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
    FormHelperText,
} from "@mui/material";
import theme from "../../ui/Theme";
import { color } from "@mui/system";
import { LockOutlined } from "@mui/icons-material";
import { AppContext } from "../../../AppContext";
import Banner from '../../banner/banner';

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
    errorMessage: {
        margin: "0px"
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
    const [isFormValid, setIsFormValid] = useState(false);

    const history = useHistory();
    const {setShowBanner, appCurrentUser, updateAppCurrentUser} = useContext(AppContext);


    useEffect(() => {
        
        updateAppCurrentUser();
        console.log("Sign User", updateAppCurrentUser())
        if(appCurrentUser){
            setShowBanner({apiSuccessResponse: 'You\'re already signed in!'})
            return history.push('/dashboard')
        }
    }, []);

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

    const handleAfterFormResponse = () => {
        setTimeout(() => {
            setShowBanner(null);
        }, 3000);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios
            .post("http://localhost:4200/api/user/signin", {
                email: values.email,
                password: values.password,
            })
            .then((response) => {
                if (response) {
                    localStorage.setItem(
                        "session",
                        response.data.data.accessToken
                    );
                    setShowBanner({apiSuccessResponse: 'Signed in successfully!'});
                    updateAppCurrentUser();
                    return history.push('/');
                }
            })
            .catch((err) => {
                console.log("Some problem occured. Please try again!");
                setShowBanner({apiErrorResponse: 'Invalid credentials, Please try again!'})
                console.log(err)
            });
        } catch(err) {

        } finally {
            handleAfterFormResponse();
        }
    };

    const checkFormValidation = (formErrors) => {
        let valid = 1;
        let tempErrors = {};

        for (const [key, value] of Object.entries(formErrors)) {
            if (value.length) {
                valid = 0;
                console.log("Valid Changed to 0")
                break;
            }
        }

        return valid;
    };

    const validateForm = (name, fieldValue) => {
        const fieldErrors = [];
        const hErrors = { ...errors };

        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (name == "email" && !re.test(fieldValue.toLowerCase())) {
            fieldErrors.push(
                <p name={name} className={classes.errorMessage}>
                    Invalid email
                </p>
            );
        }
        if (name == "password" && fieldValue.length < 8) {
            fieldErrors.push(
                <p name={name} className={classes.errorMessage}>
                    Minlength should be 8
                </p>
            );
        }

        return {
            ...hErrors,
            [name]: fieldErrors,
        };
    };

    const getHelperText = (name) => {
        console.log("Errors", errors.name)
        if (errors[name] && errors[name].length) {
            
            return errors[name];
        }
        // return errors[name] || " ";
        // return "Hello World"
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const inputErrors = {
            ...errors,
            ...validateForm(name, value),
        };

        console.log("Input Errors", inputErrors)


        setValues({
            ...values,
            [name]: value,
        });

        setErrors({
            ...inputErrors,
        });

        setIsFormValid(checkFormValidation(inputErrors));
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
                                        key="email"
                                        value={values.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your First Name"
                                        errors={errors["email"]}
                                    />
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red"
                                        }}
                                    >
                                        {getHelperText("email")}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        component="div"
                                        error={errors && errors.length > 0}
                                        style={{
                                            paddingLeft: "8px",
                                            boxSizing: "border-box",
                                            color: "red"
                                        }}
                                    >
                                        {getHelperText("password")}
                                    </FormHelperText>
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
                                            disabled={!isFormValid}
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
