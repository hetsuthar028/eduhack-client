import React from "react";
import {
    Card,
    CardContent,
    CardActionArea,
    CardMedia,
} from "@mui/material";
import { useHistory } from 'react-router';
import { Typography } from "@material-ui/core";

const Hackathoncard = (props) => {
    const {title, id} = props;
    const history = useHistory();

    const handleCardClick = (hackId) => {
        return history.push(`/hackathon/view/${hackId}`);
    }

    return (
        <Card sx={{ maxWidth: 700, height: "200px" }}>
            <CardActionArea
                onClick={() => handleCardClick(id)}
            >
                <CardMedia
                    component="img"
                    height="140"
                    image="https://source.unsplash.com/random"
                    alt="hackathon image"
                />
                <CardContent style={{flowGrow: 1}}>
                    <Typography
                        fontFamily="Open Sans"
                        fontWeight="bold"
                        variant="h6"
                    >
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Hackathoncard;
