import React, {useState, useEffect, useContext} from 'react';
import { Grid, Typography, Card, CardActionArea, CardContent } from "@mui/material";
import {useHistory} from 'react-router';
import { makeStyles } from "@material-ui/core";
import NavBar from '../../navbar/NavBar';
import Footer from '../../footer/Footer';
import Formsectionheader from '../../Hackathon/FormSectionHeader/FormSectionHeader'
import axios from 'axios';
import { AppContext } from '../../../AppContext';

const useStyles = makeStyles((theme) => ({
    parent: {
        padding: "20px",
    }
}))

const Myhackathons = () => {

    const classes = useStyles();
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState({});
    const [myHackathons, setMyHackathons] = useState([]);
    const {setShowBanner} = useContext(AppContext);

    useEffect(() => {
        axios.get(`http://localhost:4200/api/user/currentuser`, {
            headers: {
                authorization: localStorage.getItem('session'),
            }
        }).then((responses) => {
            setCurrentUser(responses.data.currentUser);
        }).catch((err) => {
            return setShowBanner({apiErrorResponse: 'Unable to fetch user! Please try again'});
        });

        axios.get(`http://localhost:4200/api/hackathon/get/myhackathons`, {
            headers: {
                authorization: localStorage.getItem('session'),
            }
        }).then((responses) => {
            
        }).catch((err) => {
            return setShowBanner({apiErrorResponse: 'Unable to fetch your hackathons! Please try again.'})
        })
    }, []);

    useEffect(() => {
        if(!currentUser){
            setShowBanner({apiErrorResponse: 'You must be signed in!'});
            return history.push('/auth/signin');
        }
    }, [currentUser]);

    return (
        <div>
            <NavBar location="dashboard" />

            <Grid container className={classes.parent}>
                <Grid
                    item
                    xs={12}
                    md={3}
                    sm={4}
                >
                    <Formsectionheader name="My Hackathons" />
                </Grid>
            </Grid>

            <Footer />
        </div>
    );
}

export default Myhackathons;
