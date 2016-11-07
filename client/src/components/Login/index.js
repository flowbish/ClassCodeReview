import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './style.css';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
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
    <div className="container">
      <div className="Login">
        <Card>
        <CardTitle title="Class Code Review" subtitle="Login" />
        <CardText>
        <form action="action_page.php">
            <TextField
              hintText="Netid"
              name="username"
            />
            <br/>
            <TextField
              hintText="AD Password"
              name="password"
                type="password"
            />
            <br/>
            <RaisedButton label="Login" fullWidth={true} />
        </form>
        </CardText>
      </Card>
       </div>
    </div>
    );
  }
}

export default Login;
