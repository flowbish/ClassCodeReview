import React from 'react';
import { Router, Route } from 'react-router';

import File from './components/File';
import NotFound from './components/NotFound';

const Routes = (props) => (
        <Router {...props}>
        <Route path="/" component={File} />
        <Route path="*" component={NotFound} />
        </Router>
);

export default Routes;
