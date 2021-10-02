import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import SignIn from "../auth/signin/SignIn";
import SignUp from "../auth/signup/SignUp";
import Dashboard from "../dashboard/Dashboard";
import LandingPage from "../landing-page/LandingPage";
import theme from "../ui/Theme";
import { ThemeProvider, Typography } from "@material-ui/core";

const AppRouter = (props) => {
    return (
        <ThemeProvider theme={theme}>
            {/* <Typography color="textPrimary"> */}
            <div className="App">
                <Router>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/auth/signin" component={SignIn} />
                    <Route exact path="/auth/signup" component={SignUp} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </Router>
            </div>
            {/* </Typography> */}
        </ThemeProvider>
    );
};

export default AppRouter;
