import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Request from 'react-http-request';
var Highlight = require('react-highlight');
import './style.css';

class App extends Component {
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
    return (
      <div className="App">
        <AppBar title="Class Code Review" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <h3>sqlite/master/src/main.c</h3>
        <hr/>
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
