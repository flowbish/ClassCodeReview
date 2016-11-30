import React, { Component } from 'react';

import './style.css';
import './css_tree/_styles.css';

class TreeNav extends Component {
  render() {
    return (
      <span>
      {
          this.props.data.type == "dir" ?
          <li>
              <label htmlFor={this.props.name}>{this.props.name}</label>
              <input 
                type="checkbox"
                checked
                id={this.props.name}
              />
              <ol>
                {
                    Object.keys(this.props.data.files).map((name, index) => {
                        return <TreeNav data={this.props.data.files[name]} name={name}/>;
                    })
                }
              </ol>
          </li>
          : 
          <li className="file"><a href={"/?path=" + this.props.root + "/" + this.props.data.path}>{this.props.name}</a></li>
      }
      </span>
    );
  }
}

export default TreeNav;
