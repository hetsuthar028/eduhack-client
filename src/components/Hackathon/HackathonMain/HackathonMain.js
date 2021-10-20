import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import {
    Box,
    Paper,
    Grid,
    Divider,
    Button,
    TextField,
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Container,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import NavBar from "../../navbar/NavBar";
import Footer from "../../footer/Footer";
import Formsectionheader from "../FormSectionHeader/FormSectionHeader";
import theme from "../../ui/Theme";
import axios from "axios";
import { AppContext } from "../../../AppContext";
import "./HackathonMain.scss";
import firstPrize from '../../../static/Icons/firstPrize.svg'
import getIcon from '../../../static/Icons/getIcon';

const useStyles = makeStyles((theme) => ({
    parent: {
        width: "100%"
    },
    innerGrid: {
        margin: "10px",
        padding: "20px",
    },
    carousel: {
        height: "400px",
        width: "100vw",
        backgroundColor: "#444",
    },
    card: {
        padding: "auto",
        width: "80px",
    },
    nestedGrid: {
        margin: "10px",
    },
    probStatementGridHeader: {

    },
    probStatDesc: {
        padding: "10px",
        overflowX: "auto"
        // wordWrap: "break-word"

    },
    probStatementGrid: {
        margin: "10px",
        padding: "10px 20px"
    },
    justifiedText: {
        textAlign: "justify",
        textJustify: "inner-word"
    }
}));

const tempPrizes = [1, 2, 3];
const tempProblemStatements = [1, 2, 3, 4];

const formatDate = (date) => {
    let tempDate = new Date(date);

    return `${tempDate.getDate()}/${tempDate.getMonth()}/${tempDate.getFullYear()}`
}

const Hackathonmain = (props) => {
    const classes = useStyles();
    const [hackathon, setHackathon] = useState({});
    const [problemStatements, setProblemStatements] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const [registrationStatues, setRegistrationStatus] = useState(false);
    const { setShowBanner } = useContext(AppContext);
    const history = useHistory();

    const handleAfterFormResponse = () => {
        setTimeout(() => {
            setShowBanner(null);
        }, 3000);
    }

    const checkregistration = async () => {
        await axios.get(`http://localhost:4400/api/hackathon/get/checkregistration/${props.match.params.id}`)
            .then((responses) => {
                if(responses.data.message == 'already registered'){
                    setRegistrationStatus(true)
                }else {
                    setRegistrationStatus(false)
                }
            }).catch(err => {
                console.log("Error registration check", err);
            })
    }

    const handleParticipate = (e) => {
        e.preventDefault();
        console.log(props.match.params.id)
        try{
            axios.post(`http://localhost:4400/api/hackathon/register/${props.match.params.id}`, {}, {
                headers: {
                    authorization: localStorage.getItem('session')
                }
            }).then(responses => {
                if(responses.data.register_user_db == "registered successfully"){
                    setShowBanner({apiSuccessResponse: "You're successfully registered for the Hackathon"})
                    console.log("PARAMS", props.match.params.id)
                    return history.push(`/hackathon/submission/${props.match.params.id}`)
                }
                console.log("Registration Request Data", responses.data);
            }).catch((err) => {
                console.log("ERROR MESSAGE =", err.response.data)
                if(err.response.data == "Not Authorized"){
                    setShowBanner({apiErrorResponse: err.response.data});
                    return history.push('/dashboard')
                }
                if(err.response.data == "Not Authenticated"){
                    setShowBanner({apiErrorResponse: err.response.data})
                    return history.push('/auth/signin')
                }
                if(err.response.data == "Already registered"){
                    return setShowBanner({apiErrorResponse: err.response.data})
                }
                if(err.response.data == "Participant limit exceeded"){
                    return setShowBanner({apiErrorResponse: err.response.data})
                }
                else {

                    // @WORKAROUND
                    /* This is just a WORKAROUND for the problem of Can't getting the response from the Backend
                        system. Remove this else part later on and handle the responses in the THEN block.
                    */
                    // setShowBanner({apiSuccessResponse: "You're successfully registered for the Hackathon"})
                    // history.push(`/hackathon/view/${props.match.params.id}`)
                }
                
                // return 
            })
        } catch(err){
            setShowBanner({apiErrorResponse: "Something went wrong! Please try again"})
        } finally{
            handleAfterFormResponse();
        }
    }

    useEffect(() => {
        try{
            checkregistration()

            axios.get(`http://localhost:4400/api/hackathon/get/id/${props.match.params.id}`,  {
                body: {

                },
                headers: {
                    authorization: localStorage.getItem("session"),
                },
            }).then(responses => {
                console.log("Got Hackathon", responses)
                setHackathon(responses.data.get_hackathon_db.hackathon)
                setProblemStatements(responses.data.get_problem_statements_db.problemStatements)
                setSponsors(responses.data.get_sponsors_db.sponsors)
                setShowBanner({apiSuccessResponse: "Loading Hackathon..."})
            }).catch(err => {

                console.log("Error fetching hackathon", err.response?.data);
                // setShowBanner({apiErrorResponse: err.response?.data})
                if(err.response.data == "Hackathon doesn't exists!"){
                    setShowBanner({apiErrorResponse: err.response?.data})
                    return history.push('/dashboard')
                }

                if(err.response.data == "Invalid user"){
                    return history.push('/auth/signin');
                }
                
            })
        } catch(err){

        } finally{
            handleAfterFormResponse();
        }
        
    }, []);

    return (
        <div className={classes.parent}>
            <NavBar />

            {/* Parent Container */}
            <Typography fontFamily="Open Sans">
            <Grid container sm={12} xs={12} md={12}>
                {/* Carousel */}
                <Grid item xs={12} sm={12} md={12} className={classes.carousel}>
                    <div></div>
                </Grid>

                {/* Top Grid - Dates */}
                <Grid item xs={12} sm={6} md={4} className={classes.innerGrid}>
                    <Grid container sm={12} xs={12} md={12}>
                        <Grid item xs={12} sm={12} md={12}>
                            <center>
                                <Typography
                                    variant="h5"
                                    fontFamily="Open Sans"
                                    color={theme.palette.common.orangeColor}
                                >
                                    <strong>Registration</strong>
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography
                                    variant="subtitle1"
                                    fontFamily="Open Sans"
                                    color={theme.palette.common.darkGreen}
                                >
                                    Starts at
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography
                                    variant="subtitle1"
                                    fontFamily="Open Sans"
                                    color={theme.palette.common.darkGreen}
                                >
                                    Ends at
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography variant="h5" fontFamily="Open Sans">
                                    <b>{formatDate(hackathon.regStart)}</b>
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography variant="h5" fontFamily="Open Sans">
                                    <b>{formatDate(hackathon.regEnd)}</b>
                                </Typography>
                            </center>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={classes.innerGrid}>
                    <Grid container sm={12} xs={12} md={12}>
                        <Grid item xs={12} sm={12} md={12}>
                            <center>
                                <Typography
                                    variant="h5"
                                    fontFamily="Open Sans"
                                    color={theme.palette.common.orangeColor}
                                >
                                    <strong>Hackathon</strong>
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography
                                    variant="subtitle1"
                                    fontFamily="Open Sans"
                                    color={theme.palette.common.darkGreen}
                                >
                                    Starts at
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography
                                    variant="subtitle1"
                                    fontFamily="Open Sans"
                                    color={theme.palette.common.darkGreen}
                                >
                                    Ends at
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography variant="h5" fontFamily="Open Sans">
                                    <b>{formatDate(hackathon.hackStart)}</b>
                                </Typography>
                            </center>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <center>
                                <Typography variant="h5" fontFamily="Open Sans">
                                    <b>{formatDate(hackathon.hackEnd)}</b>
                                </Typography>
                            </center>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4} className={classes.innerGrid}>
                    <center>
                        <div component="div">
                            <Typography variant="h6" fontFamily="Open Sans">
                                Participants Count: {hackathon.participantCount}
                            </Typography>
                        </div>
                        {registrationStatues ?  
                            <Button
                                variant="contained"
                                style={{ marginTop: "20px" }}
                                size="large"
                                onClick={() => {history.push(`/hackathon/submission/${props.match.params.id}`)}}
                            >
                                View Hackathon
                            </Button>
                        :
                            <Button
                                variant="contained"
                                style={{ marginTop: "20px" }}
                                size="large"
                                onClick={handleParticipate}
                            >
                                Participate Now
                            </Button>
                        }
                        
                    </center>
                </Grid>

                {/* Description Title Section */}
                <Grid item xs={12} md={3} sm={4} className={classes.innerGrid}>
                    <Formsectionheader name="Description" />
                </Grid>

                {/* Description Texts */}
                <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                    className={classes.innerGrid}
                >
                    <Typography variant="h6" fontFamily="Open Sans" className={classes.justifiedText}>
                        {hackathon.description}
                    </Typography>
                </Grid>

                {/* Winning Prizes Title Section */}
                <Grid item xs={12} md={3} sm={4} className={classes.innerGrid}>
                    <Formsectionheader name="Winning Prizes" />
                </Grid>
                <Grid item xs={12} md={12} sm={12}></Grid>

                {/* Winning Prizes Details */}
                <Container>
                    <Grid container sm={12} xs={12} md={12}>
                        {["firstPrizeDesc", "secondPrizeDesc", "thirdPrizeDesc"].map((tempPrize) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                className={classes.innerGrid}
                            >
                                <Card classes={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="div"
                                            style={{maxWidth: "100%", maxHeight: "200px", display: "flex"}}
                                            alt="Hackathon Image"
                                        >
                                            <img src={getIcon(tempPrize)} maxHeight="100%"/>
                                        </CardMedia>
                                        <CardContent style={{paddingTop: "0px", paddingBottom: "0px"}}>
                                            <Typography 
                                            variant="h6"
                                            fontFamily="Open Sans"
                                            >
                                                <ul>
                                                    {
                                                        hackathon[tempPrize]?.split(", ").map(prize=> (
                                                            <li>
                                                                {prize}
                                                            </li>
                                                        ))
                                                    }
                                                    
                                                </ul>
                                            </Typography>                                 
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* Problem Statements Title Section */}
                <Grid item xs={12} md={3} sm={4} className={classes.innerGrid}>
                    <Formsectionheader name="Problem Statements" />
                </Grid>
                                                    
                {/* Problem Statements Details */}
                <Grid
                        item
                        xs={12}
                        md={12}
                        sm={12}
                        className={classes.probStatementGrid}
                    >
                        <Paper elevation={10} style={{backgroundColor: theme.palette.common.orangeColor, border: "2px solid", borderColor: theme.palette.secondary.main}}>
                            <Grid container sm={12} md={12} xs={12}>
                                <Grid
                                    item
                                    xs={6}
                                    md={1.3}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    <Typography variant="subtitle1" fontFamily="inherit"  color="white">
                                        <strong>ID</strong>
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={2.5}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    <Typography variant="subtitle1"  fontFamily="inherit" color="white">
                                        <strong>Title</strong>
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={4}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    <Typography variant="subtitle1"  fontFamily="inherit" color="white">
                                        <strong>Description</strong>
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={1}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    <Typography variant="subtitle1"  fontFamily="inherit" color="white">
                                        <strong>Solution Type</strong>
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={2}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    <Typography variant="subtitle1"  fontFamily="inherit" color="white">
                                        <strong>Technologies</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                {/* Problem Statements Details */}
                {problemStatements.map((problemStatement) => (
                    <Grid
                        item
                        xs={12}
                        md={12}
                        sm={12}
                        className={classes.probStatementGrid}
                    >
                        <Paper elevation={5} style={{border: "1px solid", borderColor: theme.palette.primary.main}}>
                            <Grid container sm={12} md={12} xs={12} className={classes.justifiedText}>
                                <Grid
                                    item
                                    xs={6}
                                    md={1.3}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    {problemStatement.id}
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={2.5}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    {problemStatement.title}
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={4}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    {problemStatement.description}
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={1}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    {problemStatement.solutionType}
                                </Grid>
                                <Grid
                                    item
                                    md={0.3}
                                    className={classes.probStatDesc}
                                >
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={2}
                                    sm={6}
                                    className={classes.probStatDesc}
                                >
                                    {problemStatement.technologies}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}

                {/* Sponsors Title Section */}
                <Grid item xs={12} md={3} sm={4} className={classes.innerGrid}>
                    <Formsectionheader name="Sponsors" />
                </Grid>
                <Grid item xs={12} md={12} sm={12}></Grid>

                {/* Sponsors Details */}
                {
                    sponsors.map((sponsor) => (
                        <Grid item xs={12} sm={6} md={3} className={classes.innerGrid}>
                            <a 
                                key={sponsor}
                                href={sponsor.webLink}
                                target="_blank"
                            >
                            
                                    <img
                                        src="https://source.unsplash.com/random"
                                        height={170}
                                        width="85%"
                                        style={{ borderRadius: "2%" }}
                                    />
                                
                            </a>
                        </Grid>
                    ))
                }
            </Grid>
            </Typography>

            <Footer />
        </div>
    );
};

export default Hackathonmain;
