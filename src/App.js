import React, { Component } from 'react';
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
            <pre>
            <code class="C++">{"struct node {void *data; struct node *next; };\
int i = 0;\
int main(int argc, char[] *argv) {\
    return 0;\
}"}</code>
            </pre>
      </div>
    );
  }
}

export default App;
