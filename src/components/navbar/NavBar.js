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
    Grid,
    Tooltip,
    Menu,
    MenuItem,
    Divider,
    
} from "@material-ui/core";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MenuIcon from '@mui/icons-material/Menu';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import useStyles from "../ui/Style";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import getIcon from '../../static/Icons/getIcon';
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { AnchorRounded } from "@mui/icons-material";

const NavBar = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const [currentUser, setCurrentUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
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

    const handleMenuClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

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

    const renderSmallMenuIcons = () => {
        if(location == "landingPage"){
            if (!appCurrentUser) {
                return (
                    <div>
                        <MenuItem><Button className={classes.navButton}>Hackathons</Button></MenuItem>
                        <MenuItem><Button className={classes.navButton}>About Us</Button></MenuItem>
                        <MenuItem><Button className={classes.navButton} href="/hackathon/organize/overview">Organize a Hackathon</Button></MenuItem>
                        <MenuItem><Button variant="contained" className={classes.navButtonContained} href="/auth/signin" fullWidth>Sign In</Button></MenuItem>
                        <MenuItem><Button variant="contained" className={classes.navButtonContained} href="/auth/signup" fullWidth>Sign Up</Button></MenuItem>
                    </div>
                );
            } else {
                return (
                    <div>
                        <MenuItem><Button className={classes.navButton}>Hackathons</Button></MenuItem>
                        <MenuItem><Button className={classes.navButton}>About Us</Button></MenuItem>
                        <MenuItem><Button className={classes.navButton} href="/hackathon/organize/overview">Organize a Hackathon</Button></MenuItem>
                        <MenuItem><Button variant="contained" className={classes.navButtonContained} href="http://localhost:3000/dashboard">Go to Dashboard</Button></MenuItem>
                    </div>
                );
            }
        }
        // console.log("Current User 2", appCurrentUser)
        if(location == "dashboard"){
            if(!appCurrentUser){
                return (
                    <div>
                        <MenuItem><Button className={classes.navButton}>Hackathons</Button></MenuItem>
                        <MenuItem><Button className={classes.navButton}>About Us</Button></MenuItem>
                        <MenuItem><Button className={classes.navButton} href="/hackathon/organize/overview">Organize a Hackathon</Button></MenuItem>
                        <MenuItem><Button variant="contained" className={classes.navButtonContained} href="/auth/signin">Sign In</Button></MenuItem>
                        <MenuItem><Button variant="contained" className={classes.navButtonContained} href="http://localhost:3000/auth/signup">Sign Up</Button></MenuItem>
                    </div>
                )
            }

            // console.log("Current User 3", appCurrentUser)
            if(appCurrentUser.userType == "developer"){
                return (
                    <div>
                        <MenuItem><Button className={classes.navButton} onClick={() => navClickHandler("codeeditor")}>Code Editor</Button></MenuItem>
                        <MenuItem><Button className={classes.navButton} onClick={() => navClickHandler("learn")}>Learn</Button></MenuItem>
                        <MenuItem><Button className={classes.navButton} onClick={() => navClickHandler("practice")}>Practice</Button></MenuItem>
                        <MenuItem><Button className={classes.navButton}>Hackathons</Button></MenuItem>
                        <MenuItem><Avatar className={classes.navAvatar}><AccountCircleRoundedIcon /></Avatar></MenuItem>
                    </div>
                )
            }
            else if(appCurrentUser.userType == "organization"){
                return (
                    <div>
                        <MenuItem><Button className={classes.navButton} onClick={() => navClickHandler("codeeditor")}>Code Editor</Button></MenuItem>
                        <MenuItem><Button className={classes.navButton} onClick={() => navClickHandler("codeeditor")}>Learn</Button></MenuItem>
                        <MenuItem><Button className={classes.navButton} onClick={() => navClickHandler("codeeditor")}>Explore</Button></MenuItem>
                        <MenuItem><Button className={classes.navButton}>Hackathons</Button></MenuItem>
                        <MenuItem><Button variant="contained" className={classes.navButtonContained} href="/hackathon/organize/overview">Organize a Hackathon</Button></MenuItem>
                        <MenuItem><Avatar><AccountCircleRoundedIcon style={{color: "red"}} /></Avatar></MenuItem>
                        
                        {/* <Button variant="contained" className={classes.navButtonContained} href="http://localhost:3000/auth/signup">Sign Up</Button> */}
                    </div>
                )
            }
        }
    }

    const smallMenu = (
        <>
            <Tooltip title="Navigation Options">
                <IconButton onClick={handleMenuClick} size="small" sx={{ ml: 2 }}>
                    <MenuIcon sx={{ width: 32, height: 32 }}/>
                </IconButton>
            </Tooltip>
        </>
    );

    return (
        <Typography color="textPrimary">
            <Grid container>
            {/* <Box sx={{ flowGrow: 1 }} padding="0"> */}
            <Grid item xs={12} sm={12} md={12}>
                <AppBar position="static" color="primary" elevation={0}>
                    <Toolbar style={{minHeight: "50px"}} disableGutters>
                        <Grid container>
                            <Grid item xs={6} sm={3} md={2}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-lebel="web logo"
                                    disableRipple
                                    sx={{ mr: 0.1 }}
                                    className={classes.navIcon}
                                    href="/dashboard"
                                    style={{maxHeight: "50px", placeSelf: "center"}}
                                >
                                    <img src={getIcon("eduhack")} className={classes.appLogo}/>
                                    {/* <strong>EduHack</strong> */}
                                </IconButton>
                            </Grid>
                            <Grid item xs={6} sm={9} md={10} className={classes.navButtons} style={{marginLeft: "auto", placeSelf: "center", display: "flex", placeContent: "end"}}>
                            {/* {currentUser !=null? renderNavButttons(): ""} */}
                                {matches ? smallMenu : renderNavButttons()}
                                {/* {renderNavButttons()} */}
                            </Grid>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                onClick={handleMenuClose}
                                PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                    },
                                    '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                    },
                                },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                {renderSmallMenuIcons()}
                                {/* <MenuItem>
                                <Avatar /> Profile
                                </MenuItem>
                                <MenuItem>
                                <Avatar /> My account
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                Add another account
                                </MenuItem>
                                <MenuItem>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                                </MenuItem>
                                <MenuItem>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                                </MenuItem> */}
                            </Menu>
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
