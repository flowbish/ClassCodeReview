import React, { Component } from 'react';

class Line extends Component {
  render() {
    return (
      <div 
        className="line"
        id = {this.props.lineNumber}
        >
        {this.props.text.concat("\n")}
      </div>
    );
  }
}

export default Line;
