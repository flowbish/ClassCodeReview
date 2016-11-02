import React, { Component } from 'react';
import Request from 'react-http-request';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      <pre><code class="cpp">hello</code></pre>
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
                    return <div>{JSON.stringify(result)}</div>;
                }
            }
        }
      </Request>
      </div>
    );
  }
}

export default App;
