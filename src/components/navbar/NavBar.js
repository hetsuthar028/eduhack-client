import React, {useState, useEffect, useContext} from "react";
import "./NavBar.scss";
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
} from "@material-ui/core";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from "../ui/Style";
import { AppContext } from '../../AppContext';
import getIcon from '../../static/Icons/getIcon';
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useHistory } from "react-router";

const NavBar = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const [currentUser, setCurrentUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let { location, navClickHandler } = props;

    let { appCurrentUser, updateAppCurrentUser } = useContext(AppContext);

    useEffect(() => {
        updateAppCurrentUser();
    }, []);

    const handleMenuClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleSignOut = () => {
        try{
            localStorage.removeItem('session');
            return history.push('/');
        }
        catch(err){
            
        }
    }

    const navToMyHackathons = () => {
        history.push('/hackathon/myhackathons')
    }

    const renderNavButttons = () => {
        
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

            if(appCurrentUser.userType == "developer"){
                return (
                    <>
                        <Button className={classes.navButton} onClick={() => navClickHandler("codeeditor")}>Code Editor</Button>
                        <Button className={classes.navButton} onClick={() => navClickHandler("learn")}>Learn</Button>
                        <Button className={classes.navButton} onClick={() => navClickHandler("practice")}>Practice</Button>
                        <Button className={classes.navButton}>Hackathons</Button>
                        {/* <Avatar className={classes.navAvatar}><AccountCircleRoundedIcon /></Avatar> */}
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
                        {/* <Avatar><AccountCircleRoundedIcon style={{color: "red"}} /></Avatar> */}
                    </>
                )
            }
        }
        
    };

    const renderSmallMenuIcons = () => {

        if(matches){
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
                            <MenuItem><Button className={classes.navButton} onClick={() => handleSignOut()}>Sign Out</Button></MenuItem>
                        </div>
                    );
                }
            }
            
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
    
                
                if(appCurrentUser.userType == "developer"){
                    return (
                        <div>
                            <MenuItem><Button className={classes.navButton} onClick={() => navClickHandler("codeeditor")}>Code Editor</Button></MenuItem>
                            <MenuItem><Button className={classes.navButton} onClick={() => navClickHandler("learn")}>Learn</Button></MenuItem>
                            <MenuItem><Button className={classes.navButton} onClick={() => navClickHandler("practice")}>Practice</Button></MenuItem>
                            <MenuItem><Button className={classes.navButton}>Hackathons</Button></MenuItem>
                            <MenuItem><Button className={classes.navButton} onClick={() => handleSignOut()}>Sign Out</Button></MenuItem>
                        </div>
                    )
                }
                else if(appCurrentUser.userType == "organization"){
                    return (
                        <div>
                            <MenuItem><Button className={classes.navButton} onClick={() => navClickHandler("codeeditor")}>Code Editor</Button></MenuItem>
                            <MenuItem><Button className={classes.navButton} onClick={() => navClickHandler("learn")}>Learn</Button></MenuItem>
                            <MenuItem><Button className={classes.navButton} onClick={() => navClickHandler("explore")}>Explore</Button></MenuItem>
                            <MenuItem><Button className={classes.navButton}>Hackathons</Button></MenuItem>
                            <MenuItem><Button variant="contained" className={classes.navButtonContained} href="/hackathon/organize/overview">Organize a Hackathon</Button></MenuItem>
                            <MenuItem><Button className={classes.navButton} onClick={() => handleSignOut()}>Sign Out</Button></MenuItem>
                        </div>
                    )
                }
            }
        } else {
            return (
                <div>
                    {appCurrentUser && appCurrentUser.userType == "organization" && (<MenuItem><Button className={classes.navBotton} onClick={() => navToMyHackathons()}>My Hackathons</Button></MenuItem>)}
                    <MenuItem><Button className={classes.navButton} onClick={() => handleSignOut()}>Sign Out</Button></MenuItem>
                </div>
            )
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
                                </IconButton>
                            </Grid>
                            <Grid item xs={6} sm={9} md={10} className={classes.navButtons} style={{marginLeft: "auto", placeSelf: "center", display: "flex", placeContent: "end", paddingRight: "10px"}}>
                                {matches ? null : renderNavButttons()}
                                {appCurrentUser && <Avatar className={classes.navAvatar} onClick={handleMenuClick}><AccountCircleRoundedIcon /></Avatar>}
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
                            </Menu>
                        </Grid>
                        

                        
                    </Toolbar>
                </AppBar>
                </Grid>
            </Grid>
         </Typography>
    );
};

export default NavBar;
