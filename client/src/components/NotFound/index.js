import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

class NotFound extends Component {
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
            <h3>Content not found.</h3>
        </div>
    );
  }
}

export default NotFound;
