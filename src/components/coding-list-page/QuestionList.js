import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Questioncard from './QuestionCard';
import axios from 'axios';
import NoQuestions from './NoQuestions';

const Questionlist = (props) => {

    const [ questions, setQuestions ] = useState([]);
    const { category } = props;
    useEffect(() => {
        console.log("Category", category)
        axios.get(`http://localhost:9200/api/coding/get/all/questions?category=${category.toString()}`)
            .then((response) => {
                setQuestions(response.data.questions)
            }).catch((err) => {
                console.log("Error getting data from gateway - all questions")
                
            });
    }, []);

    return (
        <div style={{marginTop: "20px"}}>
            <Grid container>
                {questions && questions.length !=0 ? (
                        questions.map((question) => (
                            <Questioncard question={question} key={question._id}/>
                        ))
                ) : (
                    <NoQuestions />
                )}
            </Grid>
        </div>
    );
}

export default Questionlist;
