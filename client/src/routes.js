import React from 'react';
import { Router, Route } from 'react-router';

import ViewFile from './components/ViewFile';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import Project from './components/Project';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={DashBoard} />
    <Route path="/project" component={Project} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
