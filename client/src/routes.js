import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import ViewFile from './components/ViewFile';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import Project from './components/Project';
import NotFound from './components/NotFound';



const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={() => (<Login login={(user) => browserHistory.push('/project')} />)}/>
    <Route path="/dashboard" component={DashBoard} />
    <Route path="/project" component={Project} />
    <Route path="/file" component={ViewFile} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
