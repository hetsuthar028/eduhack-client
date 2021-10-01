import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container, Grid } from "@mui/material";
import useStyles from "../ui/Style";

const postHackathons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const PastHackathonLanding = () => {
    const classes = useStyles();

    return (
        
        <Container className={classes.cardContainer}>

            <h1>Past Hackathons</h1>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }}>
                {postHackathons.map((hackathon) => (
                    <Grid item xs={2} sm={4} md={3} key={hackathon}>
                        <Card sx={{ maxWidth: 500 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://source.unsplash.com/random"
                                    alt="hackathon image"
                                    className={classes.cardMedia}
                                />

                                <CardContent className={classes.cardContent}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        World's first Student driven hackathon.
                                        This hackathon contains various
                                        technologies.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default PastHackathonLanding;
