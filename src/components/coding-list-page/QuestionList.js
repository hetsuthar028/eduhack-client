import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Questioncard from './QuestionCard';
import axios from 'axios';

const Questionlist = () => {

    const [ questions, setQuestions ] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:9200/api/coding/get/all/questions`)
            .then((response) => {
                setQuestions(response.data.questions)
            }).catch((err) => {
                console.log("Error getting data from gateway - all questions")
                
            });
    }, []);

    return (
        <div style={{marginTop: "20px"}}>
            <Grid container>
                {questions.map((question) => (
                    <Questioncard question={question} />
                ))}
{/*                 
                <Questioncard />
                <Questioncard />
                <Questioncard />
                <Questioncard />
                <Questioncard />
                <Questioncard />
                <Questioncard />
                <Questioncard /> */}
            </Grid>
        </div>
    );
}

export default Questionlist;
