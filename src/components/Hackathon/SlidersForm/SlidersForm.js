import React, { useState } from "react";
import {
    Grid,
    TextField,
    FormHelperText,
    Button,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";

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
    sliderTitle: "",
    sliderSubtitle: "",
    sliderImage: {},
};

const Slidersform = (props) => {
    const classes = useStyles();

    const { setOpenPopup, handleSubmit } = props;

    const [sliderDetails, setSliderDetails] = useState(initialValues);
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

    const validateForm = (name, fieldValue) => {
        const fieldErrors = [];
        const hErrors = { ...errors };

        if (name === "sliderTitle" && fieldValue.length < 5) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    MinLength should be 5
                </p>
            );
        }

        if (name === "sliderSubtitle" && fieldValue.length < 5) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    MinLength should be 5
                </p>
            );
        }

        if (name === "sliderImage" && !fieldValue) {
            fieldErrors.push(
                <p className={classes.errorMessage} name={name}>
                    Invalid Image
                </p>
            );
        }

        return {
            ...hErrors,
            [name]: fieldErrors,
        };
    };

    const getHelperText = (name) => {
        if (errors[name] && errors[name].length) {
            return errors[name];
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const inputErrors = {
            ...errors,
            ...validateForm(name, value),
        };

        setSliderDetails({
            ...sliderDetails,
            [name]: value,
        });

        setErrors({
            ...inputErrors,
        });

        setIsFormValid(checkFormValidation(inputErrors));
    };

    // const handleSliderSubmit = (e) => {
    //     handleSubmit(sliderDetails);
    // }

    const handleImageInput = (e) => {
        console.log("Uploaded Slider Image", e.target.files[0]);
        setSliderDetails({
            ...sliderDetails,
            ["sliderImage"]: e.target.files[0],
        });
    };

    return (
        <div className={classes.parent}>
            <form onSubmit={() => handleSubmit(sliderDetails)}>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.innerGrid}
                    >
                        <TextField
                            label="Slider Title"
                            name="sliderTitle"
                            size="small"
                            type="text"
                            fullWidth
                            value={sliderDetails.sliderTitle}
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
                            {getHelperText("sliderTitle")}
                        </FormHelperText>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.innerGrid}
                    >
                        <TextField
                            label="Slider Subtitle"
                            name="sliderSubtitle"
                            size="small"
                            type="text"
                            fullWidth
                            value={sliderDetails.sliderSubtitle}
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
                            {getHelperText("sliderSubtitle")}
                        </FormHelperText>
                    </Grid>

                    <Grid item xs={3} sm={3} md={3} />

                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        className={classes.innerGrid}
                    >
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => {
                                document
                                    .getElementById("sliderImageUpload")
                                    .click();
                            }}
                        >
                            Upload Image
                        </Button>
                        <input
                            id="sliderImageUpload"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            style={{ visibility: "hidden" }}
                            onChange={handleImageInput}
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
                            {getHelperText("sliderImage")}
                        </FormHelperText>
                    </Grid>

                    <Grid item xs={3} sm={3} md={3} />

                    <Grid
                        item
                        sm={12}
                        md={12}
                        xs={12}
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

export default Slidersform;
