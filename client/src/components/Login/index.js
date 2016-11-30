import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import $ from 'jquery';

import './style.css';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
  /* Boiler Plate to set the theme to MUI for material UI */
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }

  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      message: '',
      username: '',
      password: ''
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({disabled: true});
    var request = $.ajax({
      type: 'POST',
      url: '/api/session',
      data: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      contentType : 'application/json'
    });

    request.done((user) => {
      this.props.login(user);
    });

    request.fail(() => {
      this.setState({
        disabled: false,
        message: 'Invalid NetID or password.',
        password: ''
      });
    });
  }

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  render() {
    return (
    <div className="container">
      <div className="Login">
        <Card>
        <CardTitle title="Class Code Review" subtitle="Login" />
        <CardText>{this.state.message}</CardText>
        <CardText>
        <form action="/login">
            <TextField
              hintText="Netid"
              name="username"
              onChange={this.handleUsernameChange}
            />
            <br/>
            <TextField
              hintText="AD Password"
              name="password"
              type="password"
              onChange={this.handlePasswordChange}
            />
            <br/>
        <RaisedButton label="Login" fullWidth={true} onClick={this.handleLogin} />
        </form>
        </CardText>
      </Card>
       </div>
    </div>
    );
  }
}

export default Login;
