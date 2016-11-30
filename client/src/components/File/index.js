import React, { Component } from 'react';
import Request from 'react-http-request';
import PouchDB from 'pouchdb';
import CircularProgress from 'material-ui/CircularProgress';

import Line from '../Line';

class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: new PouchDB('http://localhost:5984/comments')
    };
  }

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
                        return <Line lineNumber={lineNumber}
                        text={line}
                        saveChange={(content, done) => {
                          this.state.db.get(`${this.props.url}:${lineNumber}`).then((doc) => {
                            doc._id = `${this.props.url}:${lineNumber}`;
                            doc.content = content;
                            return this.state.db.put(doc);
                          }).catch(() => {
                            var doc = {};
                            doc._id = `${this.props.url}:${lineNumber}`;
                            doc.content = content;
                            return this.state.db.put(doc);
                          });
                        }}
                        getContent={(done) => {
                          this.state.db.get(`${this.props.url}:${lineNumber}`).then((doc) => {
                            done(doc.content || "");
                          }).catch(() => {
                            done("");
                          });
                        }}/>;
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
