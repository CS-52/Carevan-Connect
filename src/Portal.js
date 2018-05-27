import React, { Component } from 'react';
import firebase from "./firebase";
import 'react-skeleton-css/styles/skeleton.2.0.4.css'
import './Resources.css'
import EditableItem from './EditableItem'


class Portal extends Component {

  constructor() {
    super();
    this.state = {
      resources: []
    };
  }


  componentDidMount() {
    const resourceRef = firebase.database().ref("resources");

    resourceRef.on("value", snapshot => {
      let items = snapshot.val();
      console.log(snapshot.val());
      const resources = [];
      for (let item in items) {
        const resource = {
          id: item,
          name: items[item].name,
          count: items[item].count,
        };
        resources.push(resource);
      }
      this.setState({ resources: resources });
    });
  }

  onCountClick = (e, id, delta) => {  
    e.preventDefault();
    var ref = firebase.database().ref('resources/' + id);
    console.log(id, delta);
    ref.once('value').then(function (snapshot) {
      var newCount = snapshot.val().count + delta;
      ref.update({
        count: (newCount >= 0) ? newCount : 0 
      });
    });
  };

  onCountEdit = (e, id) => {
    
  }


  render() {
    console.log(this.state.resources);
    return (
      <div className="Portal">
        <h1>Resources</h1>
        <ul className="resource-list">
          {this.state.resources.map((item, index) => 
            <EditableItem 
              key={index}
              {...item}
              onIncrement={e => this.onCountClick(e, item.id, 1)} // this.onCountChange(item.id, 1)
              onDecrement={e => this.onCountClick(e, item.id, -1)} // this.onCountChange(item.id, -1)
            />
          )}
        </ul>
      </div>
    );
  }
}

export default Portal;
    