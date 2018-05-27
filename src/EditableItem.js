import React, { Component } from 'react';
import firebase from "./firebase";


class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      value: this.props.count 
    };
  }


  handleDoubleClick = e => {
    e.preventDefault();
    this.setState({ editing: true });
  };


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


  renderCount = () => {
    if (!this.state.editing) {
      return (
        <div onDoubleClick={this.handleDoubleClick}>
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
    return (
      <li className="item">
        <div className="row vertical-center">
          <div className="one-half column">
            {this.props.name}
          </div> 
          <div className="one-half column">
            <button onClick={this.props.onDecrement} style={{ float: "left" }}> - </button>
            <div style={{margin: "10px", float: "left"}}>
              {this.renderCount()}
            </div>
            <button onClick={this.props.onIncrement} style={{ float: "left" }}> + </button>
            <button onClick={this.props.onDelete} style={{ float: "right" }}> X </button>
          </div>
        </div>
      </li>
    );
  }
}

//<ItemCountField count={this.props.count} editing={this.state.editing}  />

export default Item;