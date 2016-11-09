import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';

import './style.css';

class TopNav extends Component {
  render() {
    return (
      <div className="TopNav">
        <AppBar title={this.props.title} iconElementLeft={<Avatar src={this.props.avatar}/>}/>
      </div>
    );
  }
}

export default TopNav;
