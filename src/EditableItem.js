import React, { Component } from 'react';
import firebase from "./firebase";


class Item extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      editing: false,
      value: this.props.count,
      outOfStock: this.props.outOfStock,
      image: null
    };
    this.getTestImage();
  }


  handleBlur = e => {
    if (this.state.editing) {
      this.setState({ editing: false });
      const newCount = parseInt(e.target.value.trim());
      this.handleSave(newCount);
    }
  };


  handleSave = newCount => {
    if (isNaN(newCount) || newCount < 0) {
      this.setState({ value: this.props.count });
    } else {
      var ref = firebase.database().ref('resources/' + this.props.id);
      console.log(this.props.id, newCount);
      ref.update({
        count: newCount 
      });
    }
  }

  // incrementing and decrementing count
  onIncrement = (id, delta) => {  
    var ref = firebase.database().ref('resources/' + id);
    ref.once('value').then(function (snapshot) {
      var newCount = snapshot.val().count + delta;
      ref.update({
        count: (newCount >= 0) ? newCount : 0 
      });
    });
  };

  deleteResource = id => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      const toDelete = firebase.database().ref("/resources/" + id);
      toDelete.remove();
    }
  };

  flipOutOfStock = id => {
    var newAvail = !this.state.outOfStock;
    this.setState({outOfStock: newAvail});
    var ref = firebase.database().ref('resources/' + id);
    ref.update({
      outOfStock: newAvail
    });
  }

  getTestImage = () => {
    var imageRef = firebase.storage().ref();
    var genericsRef = imageRef.child("generics");
     imageRef.child("generics/" + this.props.category + ".png").getDownloadURL().then(url => {
    //imageRef.child("icons/socks_icon.png").getDownloadURL().then(url => {
      this.setState({image: url});
    }).catch(error => {
      console.log("Error fetching image");
    });
  }


  renderCount = () => {
    if (!this.state.editing) {
      return (
        <div onDoubleClick={e => this.setState({ editing: true })}>
          {this.props.count}
        </div>
      );
    } else {
      return (
        <input value={this.state.value} 
               autoFocus='true'
               type="text" 
               onChange={e => this.setState({ value: e.target.value })} 
               onBlur = {this.handleBlur} />
      );
    }
  }

  render() {
    var decoration = this.state.outOfStock ? "line-through" : "none"

    return (
      <li className="item">
        <div className="row vertical-center">
          <div className="one-half column" style={{textDecoration: decoration}}>
            {this.props.name}
          </div> 
          <div className="one-half column">
            <div style={{margin: "10px", float: "left", textDecoration: decoration}}>
              {this.renderCount()}
            </div>
            <button disabled={this.state.outOfStock} 
                    onClick={e => this.onIncrement(this.props.id, 1)} 
                    style={{ float: "left" }}>
                    +
            </button>
            <button onClick={e => this.flipOutOfStock(this.props.id)} style={{ float: "left" }}> 
              { this.state.outOfStock ? 
                  "Mark back in stock" :
                  "Mark out of stock"
              } 
            </button>
            <button onClick={e => this.deleteResource(this.props.id)} style={{ float: "right" }}> X </button>
            <img src={ this.state.image } style={{width: "50px", height: "50px"}} alt="Image icon" />
          </div>
        </div>
      </li>
    );
  }
}

export default Item;