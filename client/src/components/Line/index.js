import React, { Component } from 'react';
import Highlight from 'react-highlight';
import RaisedButton from 'material-ui/RaisedButton';
var MarkdownEditor = require('react-markdown-editor').MarkdownEditor;

import './style.css'

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: false, content: ""};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
      content: prevState.content
    }));
  }

  handleContentChange(updatedContent) {
      this.setState(prevState => ({
          isToggleOn: prevState.isToggleOn,
          content: updatedContent
      }));
  }

  componentWillMount = () => {
    this.props.getContent((content) => {
      this.setState({ content: content });
    })
  }

  submitChange = (e) => {
    this.props.saveChange(this.state.content);
  }

  render() {
    return (
        <div>
        <div onClick={this.handleClick}
      style={this.state.content != "" ? {"background-color": "red"} : {}}>
                <Highlight>
                  <div
                    className="line"
                    id = {this.props.lineNumber}
                    >
                    {this.props.text.concat("\n")}
                  </div>
                </Highlight>
            </div>
        	{
                this.state.isToggleOn
                ?
                <div className="commentBox">
                    <MarkdownEditor
                        initialContent={this.state.content}
                        onContentChange={this.handleContentChange}
                        iconsSet="materialize-ui"
                    />
              <RaisedButton label="Submit Changes" fullWidth={true} onClick={this.submitChange} />
                </div>
                :
                null
            }
        </div>
    );
  }
}

export default Line;
