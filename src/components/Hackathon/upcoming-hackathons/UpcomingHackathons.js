import React, { useEffect, useState } from "react";
import {
    Grid,
    Container,
    Box,
    Button,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import './UpcomingHackathons.scss';

const useStyles = makeStyles((theme) => ({
    card: {
        padding: "auto",
    },
    cardContainer: {
        // marginLeft: "auto",
        // display: "flex",
        // justifyContent: "space-between"
    },
}));

const Upcominghackathons = (props) => {
    // const {title, description, regEnd } = props;
    const { hackathon } = props;
    const [upcomingHackathons, setUpcomingHackathons] = useState([]);
    const classes = useStyles();

    const getData = async () => {
        const response = await axios
            .get("http://localhost:4400/api/hackathon/get/upcomingHackathons", {
                header: {
                    authorization: localStorage.getItem("session"),
                },
            })


            // .then((response) => {
            //     // console.log("Upcoming Hackathons", response.data)
                let { get_upcoming_hackathons } = response.data;
                console.log(get_upcoming_hackathons.upcomingHackathons);
                setUpcomingHackathons(
                    get_upcoming_hackathons.upcomingHackathons
                );
            // });
    };

    useEffect(() => {
        getData();
    }, []);

    const getProperDateFormat = (regEnd) => {
        const date = regEnd.toString().split('T')[0]
        const allDate = date.split('-')
        const finalDate = `${allDate[2]}/${allDate[1]}/${allDate[0]}`
        return finalDate
    }

    return (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            xs={12}
            sm={12}
            md={12}
            classes={classes.cardContainer}
        >
            {upcomingHackathons.map(({ ...hackathon }) => (
                
                <Grid item xs={12} sm={4} md={3} key={hackathon.title}>
                    <Card classes={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="160"
                                image="https://source.unsplash.com/random"
                                alt="Hackathon Image"
                            />

                            <CardContent>
                                <Grid container xs={12} sm={12} md={12}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography variant="h6" gutterBottom fontFamily="Open Sans">
                                            {hackathon.title} OPEN
                                        </Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography
                                            variant="subtitle1"
                                            color="text.secondary"
                                            gutterBottom
                                            fontFamily="Open Sans"
                                        >
                                            <strong>
                                                Registration Ends:{" "}
                                                {getProperDateFormat(hackathon.regEnd)}
                                            </strong>
                                        </Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            gutterBottom
                                            fontFamily="Open Sans"
                                            style={{textAlign: "justify", textJustify: "inner-word"}}
                                            className="line-clamp module"
                                        >
                                            {hackathon.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                )
            )}
        </Grid>
    );
};

export default Upcominghackathons;
