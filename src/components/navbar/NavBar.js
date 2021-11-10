import React, {useState, useEffect, useContext} from "react";
import "./NavBar.scss";
import Box from "@mui/material/Box";
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Button,
    Avatar,
    Grid
} from "@material-ui/core";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import useStyles from "../ui/Style";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const NavBar = (props) => {
    const classes = useStyles();
    
    const [currentUser, setCurrentUser] = useState(null);
    let { location, navClickHandler } = props;

    let { appCurrentUser, updateAppCurrentUser } = useContext(AppContext);

    useEffect(() => {
        updateAppCurrentUser();
        // setCurrentUser(appCurrentUser)
        // axios
        //     .get("http://localhost:4200/api/user/currentuser", {
        //         headers: {
        //             authorization: localStorage.getItem("session"),
        //         }
        //     })
        //     .then((response) => {
        //         if (response.data.currentUser) {
        //             // console.log("C User", response.data.currentUser)
        //             setCurrentUser(response.data.currentUser);
        //         } else {
        //             // Push outside of the application
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("Error in Dashboard - While fetching current user");
        //     });
    }, []);

    const renderNavButttons = () => {
        
        // console.log("Current User", currentUser)
        if(location == "landingPage"){
            if (!appCurrentUser) {
                return (
                    <>
                        <Button className={classes.navButton}>Hackathons</Button>
                        <Button className={classes.navButton}>About Us</Button>
                        <Button className={classes.navButton} href="/hackathon/organize/overview">Organize a Hackathon</Button>
                        <Button variant="contained" className={classes.navButtonContained} href="/auth/signin">Sign In</Button>
                        <Button variant="contained" className={classes.navButtonContained} href="http://localhost:3000/auth/signup">Sign Up</Button>
                    </>
                );
            } else {
                return (
                    <>
                        <Button className={classes.navButton}>Hackathons</Button>
                        <Button className={classes.navButton}>About Us</Button>
                        <Button className={classes.navButton} href="/hackathon/organize/overview">Organize a Hackathon</Button>
                        <Button variant="contained" className={classes.navButtonContained} href="http://localhost:3000/dashboard">Go to Dashboard</Button>
                    </>
                );
            }
        }
        // console.log("Current User 2", appCurrentUser)
        if(location == "dashboard"){
            if(!appCurrentUser){
                return (
                    <>
                        <Button className={classes.navButton}>Hackathons</Button>
                        <Button className={classes.navButton}>About Us</Button>
                        <Button className={classes.navButton} href="/hackathon/organize/overview">Organize a Hackathon</Button>
                        <Button variant="contained" className={classes.navButtonContained} href="/auth/signin">Sign In</Button>
                        <Button variant="contained" className={classes.navButtonContained} href="http://localhost:3000/auth/signup">Sign Up</Button>
                    </>
                )
            }

            // console.log("Current User 3", appCurrentUser)
            if(appCurrentUser.userType == "developer"){
                return (
                    <>
                        <Button className={classes.navButton} onClick={() => navClickHandler("codeeditor")}>Code Editor</Button>
                        <Button className={classes.navButton} onClick={() => navClickHandler("learn")}>Learn</Button>
                        <Button className={classes.navButton} onClick={() => navClickHandler("practice")}>Practice</Button>
                        <Button className={classes.navButton}>Hackathons</Button>
                        <Avatar className={classes.navAvatar}><AccountCircleRoundedIcon /></Avatar>
                    </>
                )
            }
            else if(appCurrentUser.userType == "organization"){
                return (
                    <>
                        <Button className={classes.navButton} onClick={() => navClickHandler("codeeditor")}>Code Editor</Button>
                        <Button className={classes.navButton} onClick={() => navClickHandler("codeeditor")}>Learn</Button>
                        <Button className={classes.navButton} onClick={() => navClickHandler("codeeditor")}>Explore</Button>
                        <Button className={classes.navButton}>Hackathons</Button>
                        <Button variant="contained" className={classes.navButtonContained} href="/hackathon/organize/overview">Organize a Hackathon</Button>
                        <Avatar><AccountCircleRoundedIcon style={{color: "red"}} /></Avatar>
                        
                        {/* <Button variant="contained" className={classes.navButtonContained} href="http://localhost:3000/auth/signup">Sign Up</Button> */}
                    </>
                )
            }
        }
        
    };

    return (
        <Typography color="textPrimary">
            <Grid container>
            {/* <Box sx={{ flowGrow: 1 }} padding="0"> */}
            <Grid item xs={12} sm={12} md={12}>
                <AppBar position="static" color="primary" elevation={0} >
                    <Toolbar style={{minHeight: "50px"}}>
                        <Grid container>
                            <Grid item xs={6} sm={3} md={2}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-lebel="web logo"
                                    disableRipple
                                    sx={{ mr: 1 }}
                                    className={classes.navIcon}
                                >
                                    <strong>EduHack</strong>
                                </IconButton>
                            </Grid>
                            <Grid item xs={6} sm={9} md={10} className={classes.navButtons} style={{marginLeft: "auto", placeSelf: "center", display: "flex", placeContent: "end"}}>
                            {/* {currentUser !=null? renderNavButttons(): ""} */}
                                {renderNavButttons()}
                            </Grid>
                        </Grid>
                        

                        
                    </Toolbar>
                </AppBar>
                </Grid>
            {/* </Box> */}
            </Grid>
         </Typography>
    );
};

export default NavBar;
