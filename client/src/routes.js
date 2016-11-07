import React from 'react';
import { Router, Route } from 'react-router';

import ViewFile from './components/ViewFile';
import Login from './components/Login';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={ViewFile} />
    <Route path="/login" component={Login} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
