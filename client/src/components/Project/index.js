import React, { Component } from 'react';
import Request from 'react-http-request';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TopNav from '../TopNav';
import TreeNav from '../TreeNav';

const avatar = 'https://avatars0.githubusercontent.com/u/4381236';
const fs = {
  "dir1": {
    "path": "dir1",
    "type": "dir",
    "revision": '58300',
    "date": '2016-10-24T05:01:37.060542Z',
    "files": {
      "dir1.1": {
        "path": "dir1/dir1.1",
        "type": "dir",
        "revision": '58300',
        "date": '2016-10-24T05:01:37.060542Z',
        "files": {
          "file1.1": {
            "path": "dir1/dir1.1/file1.1",
            "type": "file",
            "revision": '58300',
            "date": '2016-10-24T05:01:37.060542Z',
            "size": "16"
          },
          "file1": {
            "path": "dir1/dir1.1/file1",
            "type": "file",
            "revision": '58300',
            "date": '2016-10-24T05:01:37.060542Z',
            "size": "16"
          }
        }
      }
    }
  },
  "file1": {
    "path": "file1",
    "type": "file",
    "revision": '58300',
    "date": '2016-10-24T05:01:37.060542Z',
    "size": "2710"
  },
  "dir2": {
    "path": "dir2",
    "type": "dir",
    "revision": '58300',
    "date": '2016-10-24T05:01:37.060542Z',
    "files": {
      "file2": {
        "path": "dir2/file2",
        "type": "file",
        "revision": '58300',
        "date": '2016-10-24T05:01:37.060542Z',
        "size": "16"
      }
    }
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
          files.push(<ol className="tree"><TreeNav data={fs[name]} name={name}/></ol>);
      }
    return (
      <div className="Project">
        <TopNav avatar={avatar} title="Project"/>
        {/*<Request
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
        </Request>*/}
        {files}
      </div>
    );
  }
}

export default Project;
