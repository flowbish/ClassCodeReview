import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import File from '../File';
import TopNav from '../TopNav';
import './style.css';

const url = '/api/file?path=../../tmp/bezier_bad.c&format=google';
const avatar = 'https://avatars0.githubusercontent.com/u/4381236';

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
        <TopNav avatar={avatar} title="sqllite.c"/>
        <File url={this.props.location.query.path}/>
      </div>
    );
  }
}

export default ViewFile;
