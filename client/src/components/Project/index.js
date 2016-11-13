import React, { Component } from 'react';
import Request from 'react-http-request';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TopNav from '../TopNav';
import TreeNav from '../TreeNav';

const avatar = 'https://avatars0.githubusercontent.com/u/4381236';
const url= '/api/list/?path=.';

class Project extends Component {
  /* Boiler Plate to set the theme to MUI for material UI */
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }


  render() {
    return (
      <div className="Project">
        <TopNav avatar={avatar} title="Project"/>
        <Request
          url={url}
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
                  const fs = result.body.contents;
                  return <div> {
                    Object.keys(fs).map((name) => {
                      return <ol className="tree"><TreeNav data={fs[name]} name={name}/></ol>;
                    })
                  } </div>;
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
