import React, { Component } from 'react';
import Request from 'react-http-request';
import Highlight from 'react-highlight';
import CircularProgress from 'material-ui/CircularProgress';

import Line from '../Line';

import './lineNumbers.css';

class File extends Component {
  showCommentBox(lineNumber) {
      alert(""+lineNumber);
  }
  render() {
    return (
      <div className="File">
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
                  return <Highlight>
                  {
                      result.body.contents.split("\n").map((line, lineNumber) => {
                          return <Line id={lineNumber} text={line}/>;
                      })
                  }
                  </Highlight>;
              } else {
                return <Highlight>Unable to load url: {this.props.url}</Highlight>;
              }
            }
          }
        }
        </Request>
      </div>
    );
  }
}

export default File;
