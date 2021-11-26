import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "../auth/signup/SignUp";
import SignIn from "../auth/signin/SignIn";

const AuthRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
            </Switch>
        </Router>
    );
};

export default AuthRouter;
