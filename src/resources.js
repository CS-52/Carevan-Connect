import React, {Component} from 'react';
import Item from './Item'
import './Resources.css'

class Resources extends Component {
  render() {
    return (
      <ul className="resource-list">
        {this.props.items.map((item, index) => 
          <Item 
            key={index}
            {...item}
          />
        )}
      </ul>
    );
  }
}

export default Resources;