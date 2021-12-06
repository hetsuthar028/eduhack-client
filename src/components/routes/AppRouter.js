import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "../auth/signin/SignIn";
import SignUp from "../auth/signup/SignUp";
import Dashboard from "../dashboard/Dashboard";
import Overviewhackathon from "../Hackathon/OverviewPage/OverviewHackathon";
import LandingPage from "../landing-page/LandingPage";
import theme from "../ui/Theme";
import { ThemeProvider } from "@material-ui/core";
import Organizepage from "../Hackathon/OrganizePage/OrganizePage";
import Hackathonmain from "../Hackathon/HackathonMain/HackathonMain";
import Hackathonsubmission from "../Hackathon/HackathonSubmission/HackathonSubmission";
import Hackathonsummary from "../Hackathon/summary/HackathonSummary";
import Codinglistmain from "../coding-list-page/CodingListMain";
import Codingmain from "../coding-main/CodingMain";
import Myhackathons from "../Hackathon/MyHackathons/MyHackathons";
import Userprofile from '../profile/UserProfile';

const AppRouter = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Router>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/auth/signin" component={SignIn} />
                    <Route exact path="/auth/signup" component={SignUp} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/hackathon/organize/overview" component={Overviewhackathon} />
                    <Route exact path="/hackathon/organize/" component={Organizepage} />
                    <Route exact path="/hackathon/view/:id" component={Hackathonmain} />
                    <Route exact path="/hackathon/submission/:id" component={Hackathonsubmission} />
                    <Route exact path="/hackathon/submission/summary/:id" component={Hackathonsummary} />
                    <Route exact path="/coding/practice/:language" component={Codinglistmain} />
                    <Route exact path="/coding/question/:id" component={Codingmain} />
                    <Route exact path="/hackathon/myhackathons/" component={Myhackathons} />
                    <Route exact path="/profile" component={Userprofile} />
                </Router>
            </div>
        </ThemeProvider>
    );
};

export default AppRouter;
