import React, { Component } from 'react';
import firebase from "./firebase";
import 'react-skeleton-css/styles/skeleton.2.0.4.css'
import './resourceList.css'
import EditableItem from './EditableItem'
import LocationPanel from './LocationPanel'
import './Portal.css'
import Resources from './imgs/Resources.png'


class Portal extends Component {
  constructor() {
    super();
    this.state = {
      resources: [],
      /* State for new resource */
      showNewResource: false,
      newName: "",
      newCount: "",
      newCategory: "clothing", // default
    };
  }


  componentDidMount() {
    // get resources from database
    const resourceRef = firebase.database().ref("resources");
    resourceRef.on("value", snapshot => {
      let items = snapshot.val();
      const resources = [];
      for (let item in items) {
        const resource = {
          id: item,
          name: items[item].name,
          count: items[item].count,
          category: items[item].category,
          outOfStock: items[item].outOfStock
        };
        resources.push(resource);
      }
      this.setState({ resources: resources });
    });
  }

  clearNewResource = () => {
    this.setState({
      newName: "",
      newCount: "",
      newCategory: "",
      showNewResource: false
    });
  }

  addNewResource = e => {
    this.setState({ newName: this.state.newName.trim(), 
                    newCount: this.state.newCount.trim(),
                    newCategory: this.state.newCategory.trim() });
    console.log(this.state.newCategory);
    const countInt = parseInt(this.state.newCount);
    if (!this.state.newName || isNaN(countInt) || countInt < 0) {
      alert("Fields are invalid or blank.");
    } else {
      const resourceRef = firebase.database().ref('resources');
      const item = {
        name: this.state.newName,
        count: countInt,
        category: this.state.newCategory,
        outOfStock: false
      };
      resourceRef.push(item);
      this.clearNewResource();
    }
  }

  handleSelect = e => {
    this.setState({ newCategory: e.target.value });
    console.log("Set new category state:");
    console.log(this.state.newCategory);
  }

  renderNewResource = () => {
    if (this.state.showNewResource) {
      return (
        <div style={{margin: "10px"}} >
        <div id="portalButton2">
          <input value={this.state.newName} 
                 placeholder="Resource name"
                 type="text" 
                 onChange={e => this.setState({ newName: e.target.value })} />
          
          <div className="portalButton3">
          <input value={this.state.newCount} 
                 placeholder="Count"
                 type="text" 
                 onChange={e => this.setState({ newCount: e.target.value })} />
          </div>

          <select name="Category"
                  defaultValue={this.state.newCategory}
                  onChange={this.handleSelect.bind(this)}>

            <option value="clothing">Clothing</option>
            <option value="equipment">Equipment</option>
            <option value="food">Food</option>
            <option value="hygiene">Hygiene</option>
            <option value="info-vouchers">Info/Vouchers</option>
            <option value="misc">Misc.</option>
          </select>
                  </div>

          <div>
            <button onClick={this.addNewResource} style={{ float: "left" }}> Add </button>
            <button class="portalButton4" onClick={this.clearNewResource} style={{ float: "left" }}> Cancel </button>
          </div>
        </div>
      );
    } 
  }

  render() {
    return (
    <div className="allRobotoAllTheTime">
      <div className="Portal" style={{margin: "20px"}}>

      <div className="title"> 
        <div className="titleText">
        volunteer portal 
        </div>
      </div>

      <div className="gimmeSomeSpace">
        <LocationPanel />
      </div>

      <div className="lilTitlePic2">
        <img src={Resources} style={{width: "42px", height: "54px"}}/>
        </div>
        <div className="Redderizer">
        <h1>update resources given</h1>
        </div>

        <ul> Every time you give out a resource, press "+" to increment the counter. </ul>
        <ul> If you'd like to change the count manually, double click the number and input the desired number.</ul>
        <ul> You can keep track of which items are out of stock by toggling the "MARK OUT OF STOCK" and "MARK BACK IN STOCK" buttons. </ul>
        <ul> Add new resources using the "ADD RESOURCE" button and delete resources using the "X" button. </ul> 

        <ul className="resource-list">
          {this.state.resources.map((item, index) => 
            <EditableItem 
              key={index}
              {...item}
            />
          )}
        </ul>
        <button style={{ margin: "10px" }} onClick={e => this.setState({showNewResource: true})}>
          Add Resource
        </button>
        {this.renderNewResource()}
      </div>
      </div>
    );
  }
}

export default Portal;


