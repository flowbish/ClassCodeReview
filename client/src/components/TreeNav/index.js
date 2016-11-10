import React, { Component } from 'react';

import './style.css';

class TreeNav extends Component {
  render() {
    return (

      <li>
      {
        Object.keys(this.props.children).length > 0 ?
          <span>
             {this.props.name}
              <ol>
                {
                    Object.keys(this.props.children).map((name, index) => {
                        return <TreeNav children={this.props.children[name]} name={name}/>;
                    })
                }
              </ol>
          </span>
          : 
          <span>{this.props.name}</span>
      }
      </li>
    );
  }
}

export default TreeNav;
