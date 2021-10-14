import React, {useState, useEffect} from "react";
import "./NavBar.scss";
import Box from "@mui/material/Box";
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Button,
    Avatar
} from "@material-ui/core";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import useStyles from "../ui/Style";
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const NavBar = (props) => {
    const classes = useStyles();
    
    const [currentUser, setCurrentUser] = useState(null);
    let { location } = props;

    useEffect(() => {
        axios
            .get("http://localhost:4200/api/user/currentuser", {
                headers: {
                    authorization: localStorage.getItem("session"),
                }
            })
            .then((response) => {
                if (response.data.currentUser) {
                    console.log("C User", response.data.currentUser)
                    setCurrentUser(response.data.currentUser);
                } else {
                    // Push outside of the application
                }
            })
            .catch((err) => {
                console.log("Error in Dashboard - While fetching current user");
            });
    }, []);

    const renderNavButttons = () => {
        
        console.log("Current User", currentUser)
        if(location == "landingPage"){
            if (!currentUser) {
                return (
                    <>
                        <Button className={classes.navButton}>Hackathons</Button>
                        <Button className={classes.navButton}>About Us</Button>
                        <Button className={classes.navButton}>Organize a Hackathon</Button>
                        <Button variant="contained" className={classes.navButtonContained} href="/auth/signin">Sign In</Button>
                        <Button variant="contained" className={classes.navButtonContained} href="http://localhost:3000/auth/signup">Sign Up</Button>
                    </>
                );
            } else {
                return (
                    <>
                        <Button className={classes.navButton}>Hackathons</Button>
                        <Button className={classes.navButton}>About Us</Button>
                        <Button className={classes.navButton}>Organize a Hackathon</Button>
                        <Button variant="contained" className={classes.navButtonContained} href="http://localhost:3000/dashboard">Go to Dashboard</Button>
                    </>
                );
            }
        }
        console.log("Current User 2", currentUser)
        if(location == "dashboard"){
            if(!currentUser){
                return (
                    <>
                    No User
                    </>
                )
            }

            console.log("Current User 3", currentUser)
            if(currentUser.userType == "developer"){
                return (
                    <>
                        <Button className={classes.navButton}>Code Editor</Button>
                        <Button className={classes.navButton}>Learn</Button>
                        <Button className={classes.navButton}>Explore</Button>
                        <Button className={classes.navButton}>Hackathons</Button>
                        <Avatar className={classes.navAvatar}><AccountCircleRoundedIcon /></Avatar>
                        {/* <Button variant="contained" className={classes.navButtonContained} href="http://localhost:3000/auth/signin"></Button> */}
                        {/* <Button variant="contained" className={classes.navButtonContained} href="http://localhost:3000/auth/signup">Sign Up</Button> */}
                    </>
                )
            }
            else if(currentUser.userType == "organization"){
                return (
                    <>
                        <Button className={classes.navButton}>Code Editor</Button>
                        <Button className={classes.navButton}>Learn</Button>
                        <Button className={classes.navButton}>Explore</Button>
                        <Button className={classes.navButton}>Hackathons</Button>
                        <Button variant="contained" className={classes.navButtonContained} href="http://localhost:3000/hackathon/organize/overview">Organize a Hackathon</Button>
                        <Avatar><AccountCircleRoundedIcon style={{color: "red"}} /></Avatar>
                        
                        {/* <Button variant="contained" className={classes.navButtonContained} href="http://localhost:3000/auth/signup">Sign Up</Button> */}
                    </>
                )
            }
        }
        
    };

    return (
        // <div class="nav">
        //     <input type="checkbox" id="nav-check" />
        //     <div class="nav-header">
        //         <div class="nav-title">MysteryCode</div>
        //     </div>
        //     <div class="nav-btn">
        //         <label for="nav-check">
        //             <span></span>
        //             <span></span>
        //             <span></span>
        //         </label>
        //     </div>

        //     <div class="nav-links">
        //         <ul>
        //             <li>
        //                 <a href="#" target="_blank">
        //                     Home
        //                 </a>
        //             </li>
        //             <li>
        //                 <a href="#" target="_blank">
        //                     About
        //                 </a>
        //             </li>
        //             <li>
        //                 <a href="#" target="_blank">
        //                     Services
        //                 </a>
        //             </li>
        //             <li>
        //                 <a href="#" target="_blank">
        //                     Portfolio
        //                 </a>
        //             </li>
        //             <li>
        //                 <a href="#" target="_blank">
        //                     Contact
        //                 </a>
        //             </li>
        //             <a class="icon">
        //                 <i class="fa fa-twitter"></i>
        //                 <i class="fa fa-linkedin"></i>
        //                 <i class="fa fa-youtube"></i>
        //             </a>
        //         </ul>
        //     </div>
        // </div>
        <Typography color="textPrimary">
            <Box sx={{ flowGrow: 1 }} padding="0">
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-lebel="web logo"
                            disableRipple
                            sx={{ mr: 2 }}
                            className={classes.navIcon}
                        >
                            <strong>EduHack</strong>
                        </IconButton>

                        <div className={classes.navButtons}>
                            {/* {currentUser !=null? renderNavButttons(): ""} */}
                            {renderNavButttons()}
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </Typography>
    );
};

export default NavBar;
