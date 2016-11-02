import React, { Component } from 'react';
import Request from 'react-http-request';
import logo from './logo.svg';
import './App.css';
var Highlight = require('react-highlight');

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
      <Request
        url='https://raw.githubusercontent.com/mackyle/sqlite/master/src/main.c'
        method='get'
        accept='text/plain'
        verbose={true}
        >
        {
            ({error, result, loading}) => {
                if (loading) {
                    return <div>loading...</div>;
                } else {
                    return <Highlight>{result.text}</Highlight>;
                }
            }
        }
      </Request>
      </div>
    );
  }
}

export default App;
