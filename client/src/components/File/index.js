import React, { Component } from 'react';
import Request from 'react-http-request';
import Highlight from 'react-highlight';

import './lineNumbers.css';

class File extends Component {
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
              return <Highlight>loading...</Highlight>;
            } else {
              if (result.body.error == null) {
                  return <Highlight>{
                      result.body.contents.split("\n").map(line => {
                          return <div><span>&nbsp;{line.concat("\n")}</span></div>}
                          )}
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
