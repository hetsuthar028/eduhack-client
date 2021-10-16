import React, { useState } from "react";
import {
    Container,
    Grid,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import Formsectionheader from "../FormSectionHeader/FormSectionHeader";

const useStyles = makeStyles((theme) => ({
    parent: {
        margin: "20px",
    },
    innerGrid: {
        padding: "10px",
    },
    errorMessage: {
        margin: "0px",
    },
}));

const initialValues = {
    probTitle: "",
    probDescription: "",
    probRefLinks: "",
    probAcceptedTechs: "",
    probSolutionType: "",
};

const Problemstatementform = (props) => {
    const classes = useStyles();
    const { setOpenPopup, handleSubmit } = props;

    const [probDetails, setProbDetails] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

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

    const validateForm = (name, fieldValue) => {
        const fieldErrors = [];
        const hErrors = { ...errors };

        if (name == "probTitle" && fieldValue.length < 10) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    MinLength should be 10
                </p>
            );
        }

        if (
            name == "probDescription" &&
            (fieldValue.length < 10 || fieldValue.length > 100)
        ) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    Description length should be between 10 to 100 characters
                </p>
            );
        }

        if (name == "probRefLinks" && fieldValue.length < 5) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    Invalid Input
                </p>
            );
        }

        if (name == "probAcceptedTechs" && fieldValue.length < 5) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    Invalid Input
                </p>
            );
        }

        return {
            ...hErrors,
            [name]: fieldErrors,
        };
    };

    const handleInputChange = (e) => {
        
        const { name, value } = e.target;
        
        const inputErrors = {
            ...errors,
            ...validateForm(name, value),
        };

        setProbDetails({
            ...probDetails,
            [name]: value,
        });

        setErrors({
            ...inputErrors,
        });

        setIsFormValid(checkFormValidation(inputErrors));
    };

    const handleSelectChange = (e) => {
        setProbDetails({
            ...probDetails,
            ["probSolutionType"]: e.target.value,
        });
    };

    const handleProbSubmit = (e) => {
        e.preventDefault();

        handleSubmit(probDetails)
    }

    return (
        <div className={classes.parent}>
            <form onSubmit={handleProbSubmit}>
                <Grid container xs={12} md={12} sm={12}>
                    <Grid
                        item
                        sm={12}
                        md={12}
                        sm={12}
                        className={classes.innerGrid}
                    >
                        <TextField
                            label="Problem Statement Title"
                            name="probTitle"
                            size="small"
                            type="text"
                            fullWidth
                            value={probDetails.probTitle}
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
                            {getHelperText("probTitle")}
                        </FormHelperText>
                    </Grid>
                    <Grid
                        item
                        sm={12}
                        md={12}
                        sm={12}
                        className={classes.innerGrid}
                    >
                        <TextField
                            label="Problem Statement Description"
                            name="probDescription"
                            size="small"
                            type="text"
                            fullWidth
                            value={probDetails.probDescription}
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
                            {getHelperText("probDescription")}
                        </FormHelperText>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.innerGrid}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Solution Type
                            </InputLabel>
                            <Select
                                id="demo-simple-select"
                                label="solutionType"
                                value={probDetails.probSolutionType}
                                onChange={handleSelectChange}
                            >
                                <MenuItem
                                    value="Mobile-Android App"
                                    name="Mobile-Android App"
                                    key="Mobile-Android App"
                                >
                                    Mobile-Android App
                                </MenuItem>
                                <MenuItem
                                    value="Web Application"
                                    name="Web Application"
                                    key="Web Application"
                                >
                                    Web Application
                                </MenuItem>
                                <MenuItem
                                    value="Desktop Application"
                                    name="Desktop Application"
                                    key="Desktop Application"
                                >
                                    Desktop Application
                                </MenuItem>
                                <MenuItem
                                    value="Console Application"
                                    name="Console Application"
                                    key="Console Application"
                                >
                                    Console Application
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
                            label="Accepted Technologies"
                            name="probAcceptedTechs"
                            size="small"
                            type="text"
                            fullWidth
                            value={probDetails.probAcceptedTechs}
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
                            {getHelperText("probAcceptedTechs")}
                        </FormHelperText>
                    </Grid>

                    <Formsectionheader
                        name="Reference Material"
                        className={classes.innerGrid}
                    />

                    <Grid
                        item
                        sm={12}
                        md={12}
                        sm={12}
                        className={classes.innerGrid}
                    >
                        <TextField
                            label="Reference Links"
                            name="probRefLinks"
                            size="small"
                            type="text"
                            value={probDetails.probRefLinks}
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
                            {getHelperText("probRefLinks")}
                        </FormHelperText>
                    </Grid>

                    <Grid
                        item
                        sm={12}
                        md={12}
                        sm={12}
                        className={classes.innerGrid}
                    >
                        <center>
                            <Button
                                variant="contained"
                                size="large"
                                style={{ margin: "10px" }}
                                type="submit"
                                disabled={!isFormValid}
                            >
                                Add
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                style={{ margin: "10px" }}
                                onClick={() => setOpenPopup(false)}
                            >
                                Cancel
                            </Button>
                        </center>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Problemstatementform;
