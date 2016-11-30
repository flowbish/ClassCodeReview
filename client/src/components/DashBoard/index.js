import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TopNav from '../TopNav';

import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const avatar = 'https://avatars0.githubusercontent.com/u/4381236';

class DashBoard extends Component {
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
      <div className="DashBoard">
        <TopNav avatar={avatar} title="Dashboard"/>
		<GridList cols={3} rows={1}>
			<GridTile
			>
				<Subheader>Date Range</Subheader>
				<div>
					<DatePicker hintText="Start Creation Date" mode="landscape" container="inline"/>
					to
					<DatePicker hintText="End Creation Date" mode="landscape" container="inline"/>
				</div>
			</GridTile>
			<GridTile
			>
				<Subheader>Status</Subheader>
				<RadioButtonGroup name="status" defaultSelected="all">
				  <RadioButton
					value="all"
					label="all"
				  />
				  <RadioButton
					value="updated"
					label="updated"
				  />
				  <RadioButton
					value="new"
					label="new"
				  />
				  <RadioButton
					value="closed"
					label="closed"
				  />
				</RadioButtonGroup>
			</GridTile>
			<GridTile
			>
				<Subheader>Class</Subheader>
				<RadioButtonGroup name="class" defaultSelected="all">
				  <RadioButton
					value="CS 241"
					label="CS 241"
				  />
				  <RadioButton
					value="CS 233"
					label="CS 233"
				  />
				  <RadioButton
					value="CS 225"
					label="CS 225"
				  />
				</RadioButtonGroup>
			</GridTile>
		</GridList>
		<Divider/>
		<Subheader>Code Reviews</Subheader>
		<List>
			<ListItem
			  leftAvatar={
				<Avatar src="https://avatars0.githubusercontent.com/u/4381236?v=3&s=466" />
			  }
              href="./Project?path=parmake"
			>
			  Parmake
			</ListItem>
			<ListItem
			  leftAvatar={
				<Avatar src="https://avatars0.githubusercontent.com/u/4381236?v=3&s=466" />
			  }
              href="./Project?path=malloc"
			>
			  Malloc
			</ListItem>
			<ListItem
			  leftAvatar={
				<Avatar src="https://avatars0.githubusercontent.com/u/4381236?v=3&s=466" />
			  }
              href="./Project?path=mapreduce"
			>
			  MapReduce
			</ListItem>
		</List>
		<Divider/>
		<RaisedButton label="Create Code Review" fullWidth={true} />
      </div>
    );
  }
}

export default DashBoard;
