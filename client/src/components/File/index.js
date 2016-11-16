import React, { Component } from 'react';
import Request from 'react-http-request';
import CircularProgress from 'material-ui/CircularProgress';

import Line from '../Line';

class File extends Component {
  render() {
    return (
        <Request
        url={this.props.url}
        method='get'
        accept='text/plain'
        verbose={true}
        >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <CircularProgress size={200} thickness={15} />
            } else {
              if (result.body.error == null) {
                  return <div className="file">
                  {
                      result.body.contents.split("\n").map((line, lineNumber) => {
                          return <Line id={lineNumber} text={line}/>;
                      })
                  }
                  </div>;
              } else {
                return <h2>Unable to load url: {this.props.url}</h2>;
              }
            }
          }
        }
        </Request>
    );
  }
}

export default File;
