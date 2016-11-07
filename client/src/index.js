import React from 'react';
import ReactDOM from 'react-dom';
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import { browserHistory } from 'react-router';

import Routes from './routes';

import './index.css';

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);
