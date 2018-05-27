import React, { Component } from 'react';
import firebase from "./firebase";
import 'react-skeleton-css/styles/skeleton.2.0.4.css'
import './Resources.css'
import EditableItem from './EditableItem'


class Portal extends Component {

  constructor() {
    super();
    this.state = {
      resources: [],
      showNewResource: false,
      newName: "",
      newCount: ""
    };
  }


  componentDidMount() {
    const resourceRef = firebase.database().ref("resources");

    resourceRef.on("value", snapshot => {
      let items = snapshot.val();
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

  // incrementing and decrementing count
  onCountClick = (e, id, delta) => {  
    e.preventDefault();
    var ref = firebase.database().ref('resources/' + id);
    ref.once('value').then(function (snapshot) {
      var newCount = snapshot.val().count + delta;
      ref.update({
        count: (newCount >= 0) ? newCount : 0 
      });
    });
  };

  deleteResource = id => {
    const toDelete = firebase.database().ref("/resources/" + id);
    toDelete.remove();
  };

  clearNewResource = () => {
    this.setState({
      newName: "",
      newCount: "",
      showNewResource: false
    });
  }

  addNewResource = e => {
    e.preventDefault();
    this.setState({ newName: this.state.newName.trim(), newCount: this.state.newCount.trim() });
    const countInt = parseInt(this.state.newCount);
    if (!this.state.newName || isNaN(countInt) || countInt < 0) {
      alert("Fields are invalid or blank.");
    } else {
      const resourceRef = firebase.database().ref('resources');
      const item = {
        name: this.state.newName,
        count: countInt
      };
      resourceRef.push(item);
      this.clearNewResource();
    }
  }

  renderNewResource = () => {
    if (this.state.showNewResource) {
      return (
        <div style={{margin: "10px"}} >
          <input value={this.state.newName} 
                 placeholder="Resource name"
                 type="text" 
                 onChange={e => this.setState({ newName: e.target.value })} />
          <input value={this.state.newCount} 
                 placeholder="Count"
                 type="text" 
                 onChange={e => this.setState({ newCount: e.target.value })} />
          <div>
            <button onClick={this.addNewResource} style={{ float: "left" }}> Add </button>
            <button onClick={this.clearNewResource} style={{ float: "left" }}> Cancel </button>
          </div>
        </div>
      );
    } 
  }


  render() {
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
              onDelete={e => this.deleteResource(item.id)}
            />
          )}
        </ul>
        <button style={{ margin: "10px" }} onClick={e => this.setState({showNewResource: true})}>
          Add Resource
        </button>
        {this.renderNewResource()}
      </div>
    );
  }
}

export default Portal;
    