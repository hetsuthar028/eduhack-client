import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
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
import { AppContext } from "../../../AppContext";

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
    const history = useHistory();

    const { setShowBanner } = useContext(AppContext);

    const handleAfterFormResponse = () => {
        setTimeout(() => {
            setShowBanner(null);
        }, 3000);
    }

    const getData = async () => {

        try{
            const response = await axios
            .get("http://localhost:4400/api/hackathon/get/upcomingHackathons", {
                headers: {
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
        } catch(err){
            // setShowBanner({ apiErrorResponse: err.response.data })
            console.log("Error in Upcoming Hackathon", err.response);
        }
        finally{
            handleAfterFormResponse();
        }
        
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

    const handleCardClick = (hackId) => {
        history.push(`/hackathon/view/${hackId}`)
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
                
                <Grid item xs={12} sm={4} md={3} key={hackathon.title} key={hackathon.id}>
                    <Card classes={classes.card}>
                        <CardActionArea onClick={() => {handleCardClick(hackathon.id)}}>
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
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography
                                            variant="subtitle2"
                                            color="text.secondary"
                                            gutterBottom
                                            fontFamily="Open Sans"
                                            style={{color: 'green'}}
                                        >
                                            <strong>
                                                Hackathon Starts:{" "}
                                                {getProperDateFormat(hackathon.hackStart)}
                                            </strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
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
