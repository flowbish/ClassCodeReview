import React, { Component } from 'react';
import Request from 'react-http-request';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TopNav from '../TopNav';
import TreeNav from '../TreeNav';

const avatar = 'https://avatars0.githubusercontent.com/u/4381236';
const fs = {
    "root": {
        "a": {},
        "b": {
            "b1": {},
            "b2": {}
        },
        "c": {}
    }
};

class Project extends Component {
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
      var files = [];
      for(var name in fs) {
          files.push(<TreeNav children={fs[name]} name={name}/>);
      }
    return (
      <div className="Project">
        <TopNav avatar={avatar} title="Project"/>
        <Request
        url='https://api.github.com/users/mbasso'
        method='get'
        accept='application/json'
        verbose={true}
        >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <div>loading...</div>;
            } else {
              if (result.body.error == null) {
                return <div>{files}</div>;
              } else {
                return <div>Unable to load url: {this.props.url}></div>;
              }
            }
          }
        }
        </Request>
      </div>
    );
  }
}

export default Project;
