import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import File from '../File';
import './style.css';

const url = '/api/file?path=../../tmp/bezier_bad.c&format=google';

class ViewFile extends Component {
  /* Boiler Plate to set the theme to MUI for material UI */
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    }
  }

  render() {
    return (
      <div className="ViewFile">
        <AppBar title="Class Code Review" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <h3>{url}</h3>
        <hr/>
        <File url={url}/>
      </div>
    );
  }
}

export default ViewFile;
