import React, { Component } from 'react';

import './style.css'

import Highlight from 'react-highlight';
class Line extends Component {
  render() {
    return (
    <Highlight>
      <div 
        className="line"
        id = {this.props.lineNumber}
        >
        {this.props.text.concat("\n")}
      </div>
    </Highlight>
    );
  }
}

export default Line;
