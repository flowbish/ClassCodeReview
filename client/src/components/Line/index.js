import React, { Component } from 'react';
import Highlight from 'react-highlight';

import './style.css'

class CommentBox extends Component {
	render() {
		return (
			<div>this is a comment box</div>
		);
	}	
}

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: false};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render() {
    return (
        <div className="lineButton" onClick={this.handleClick}>
        <Highlight>
              <div
                className="line"
                id = {this.props.lineNumber}
                >
                {this.props.text.concat("\n")}
              </div>
            </Highlight>
        	{this.state.isToggleOn ? <CommentBox/> : null}
        </div>
    );
  }
}

export default Line;
