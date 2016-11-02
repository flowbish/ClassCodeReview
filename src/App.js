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
                    return <Highlight>{JSON.stringify(result)}</Highlight>;
                }
            }
        }
      </Request>
      </div>
    );
  }
}

export default App;
