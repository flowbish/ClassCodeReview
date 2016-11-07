import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

class TopNav extends Component {
  render() {
    return (
      <div className="TopNav">
        <AppBar title="Class Code Review" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
		<List>
			<ListItem
			  disabled={true}
			  leftAvatar={
				<Avatar src={this.props.avatar} />
			  }
			>
        	sqlite/master/src/main.c
			</ListItem>
		</List>
        <hr/>
      </div>
    );
  }
}

export default TopNav;
