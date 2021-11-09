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
    FormHelperText
} from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    parent: {
        margin: "20px",
    },
    innerGrid: {
        padding: "10px",
    },
}));

const initialValues = {
    sponsorName: "",
    sponsorImageLink: {},
    sponsorWebLink: "",
};

const validateURL = (inputURL) => {
    let url;

    try {
        url = new URL(inputURL);
    } catch(_){
        return false;
    }

    return url.protocol === "https:";
}

const Sponsorsform = (props) => {
    const classes = useStyles();
    const { setOpenPopup, handleSubmit } = props;

    const [sponsorDetails, setSponsorDetails] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const checkFormValidation = (formErrors) => {
        let valid = 1;

        for(const [key, value] of Object.entries(formErrors)){
            if(value.length){
                valid = 0;
                break
            }
        }

        return valid;
    }

    const getHelperText = (name) => {
        if(errors[name] && errors[name].length){
            return errors[name];
        }
    }

    const validateForm = (name, fieldValue) => {
        let fieldErrors = [];
        let hErrors = { ...errors };

        if(name == "sponsorName" && fieldValue.length < 3){
            fieldErrors.push(<p className={classes.errorMessage} name={name}>MinLength should be 3</p>)
        }

        if(name == "sponsorImageLink" && !fieldValue){
            fieldErrors.push(<p className={classes.errorMessage} name={name}>Invalid upload</p>)
        }

        if(name == "sponsorWebLink" && !validateURL(fieldValue)){
            fieldErrors.push(<p className={classes.errorMessage} name={name}>Invalid Website Link</p>)
        }

        return {
            ...hErrors,
            [name]: fieldErrors
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const inputErrors = {
            ...errors,
            ...validateForm(name, value)
        }

        setSponsorDetails({
            ...sponsorDetails,
            [name]: value,
        });

        setErrors({
            ...inputErrors
        });

        setIsFormValid(checkFormValidation(inputErrors))
    };

    const handleImageChange = (e) => {
        console.log("Uploaded sponsor Image", e.target.files[0]);

        setSponsorDetails({
            ...sponsorDetails,
            ["sponsorImageLink"]: e.target.files[0],
        });
    }

    return (
        <div className={classes.parent}>
            <form onSubmit={() => handleSubmit(sponsorDetails)}>
                <Grid container xs={12} md={12} sm={12}>
                    <Grid
                        item
                        sm={12}
                        md={12}
                        sm={12}
                        className={classes.innerGrid}
                    >
                        <TextField
                            label="Sponsors Name"
                            name="sponsorName"
                            size="small"
                            type="text"
                            fullWidth
                            value={sponsorDetails.sponsorName}
                            onChange={handleInputChange}
                            required
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
                            {getHelperText("sponsorName")}
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
                            label="Sponsors Website"
                            name="sponsorWebLink"
                            size="small"
                            type="text"
                            value={sponsorDetails.sponsorWebLink}
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
                                color: "red"
                            }}
                        >
                            {getHelperText("sponsorWebLink")}
                        </FormHelperText>
                    </Grid>

                    <Grid item md={3} />

                    <Grid item md={6} className={classes.innerGrid}>
                        <Button variant="outlined" fullWidth onClick={() => {document.getElementById("sponsorImageUpload").click()}}>
                            Upload Image
                        </Button>
                        <input id="sponsorImageUpload" type="file" accept=".png, .jpg, .jpeg" style={{visibility: "hidden"}} onChange={handleImageChange}/>
                        <FormHelperText
                            component="div"
                            error={errors && errors.length > 0}
                            style={{
                                paddingLeft: "8px",
                                boxSizing: "border-box",
                                color: "red"
                            }}
                        >
                            {getHelperText("sponsorImageLink")}
                        </FormHelperText>
                    </Grid>

                    <Grid item md={3} />

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

export default Sponsorsform;
