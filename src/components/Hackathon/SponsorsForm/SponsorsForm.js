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
    sponsorImageLink : "https://source.unsplash.com/random",
    sponsorWebLink: ""
};

const Sponsorsform = (props) => {
    const classes = useStyles();
    const { setOpenPopup, handleSubmit } = props;

    const [sponsorDetails, setSponsorDetails] = useState(initialValues);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setSponsorDetails({
            ...sponsorDetails,
            [name]: value
        })
    }

    return (
        <div className={classes.parent}>
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
                </Grid>

                <Grid item md={3} />

                <Grid item md={6} className={classes.innerGrid}>
                    <Button variant="outlined" fullWidth>
                        Upload Image
                    </Button>
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
                            onClick={() => handleSubmit(sponsorDetails)}
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
        </div>
    );
};

export default Sponsorsform;
