import React, { Component } from 'react';

import './style.css';
import './css_tree/_styles.css';

class TreeNav extends Component {
  render() {
    return (
      <span>
      {
          Object.keys(this.props.children).length > 0 ?
          <li>
              <label htmlFor={this.props.name}>{this.props.name}</label>
              <input 
                type="checkbox"
                checked
                id={this.props.name}
              />
              <ol>
                {
                    Object.keys(this.props.children).map((name, index) => {
                        return <TreeNav children={this.props.children[name]} name={name}/>;
                    })
                }
              </ol>
          </li>
          : 
          <li className="file"><a href="#">{this.props.name}</a></li>
      }
      </span>
    );
  }
}

export default TreeNav;
