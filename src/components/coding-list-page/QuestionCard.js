import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Grid, Typography, Paper, Card, CardActionArea, Avatar } from '@mui/material';
import theme from '../ui/Theme';

const Questioncard = (props) => {

    const history = useHistory();

    const [ question, setQuestion ] = useState(props.question);

    const handleClick = (e) => {
        return history.push(`/coding/question/${question._id}`)
    }

    return (
        <Grid item xs={12} sm={6} md={6} style={{padding: "10px"}}>
            <Card elevation={5}>
                <CardActionArea style={{padding: "15px 20px"}} onClick={handleClick}>
                    <Grid container>

                        {/* Question Title */}
                        <Grid item xs={8} sm={8} md={8}>
                            <Typography
                                variant="h5"
                                fontFamily="Open Sans"
                                fontWeight="bold"
                                
                            >
                                {question.title}
                            </Typography>
                        </Grid>

                        <Grid item xs={2} sm={2} md={2}>
                            
                            <Typography
                                variant="body2"
                                fontFamily="Open Sans"
                                style={{padding: "5px", backgroundColor: "green", borderRadius: "5px", textAlign: "center", color: "white"}}
                                fontWeight = "bold"
                                backgroundColor="primary"
                            >
                                Solved
                            </Typography>
                            
                        </Grid>

                        <Grid item xs={2} sm={2} md={2}>

                            <Typography
                                variant="body1"
                                fontFamily="Open Sans"
                                style={{padding: "5px", color: "green"}}
                                fontWeight = "bold"
                                textAlign="center"
                            >
                                123987
                            </Typography>   

                        </Grid>

                        <Grid item xs={12} sm={12} md={12} style={{display: "flex"}}>
                            <Avatar style={{width: "15px", height: "15px", backgroundColor: "green", placeSelf: "center"}} > </Avatar>
                            <Typography
                                variant="body1"
                                fontFamily="Open Sans"
                                style={{padding: "5px", color: "green"}}
                                
                            >
                                {question.concepts.map((concept) => (
                                    `${concept}, `
                                ))}
                            </Typography>  
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} style={{display: "flex"}}>
                            <Typography
                                variant="body1"
                                fontFamily="Open Sans"
                                style={{padding: "5px", color: "green", textJustify: "inner-word", textAlign: "justify"}}
                            >
                                {question.description}
                            </Typography>  
                        </Grid>

                    </Grid>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default Questioncard;
