import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const DashRouter = () => {

    

    return (
        <Router>
            <Switch>
                <Route path="/" component={Dashboard} />
            </Switch>
        </Router>
    );
}

export default DashRouter;
