import React from 'react';
import './App.css';

class PlayerPane extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.clickCallback(this.props.value.no)
  }
  
  render() {
    return(
    <li onClick={this.handleClick}>{this.props.value.name}</li>
    );
  }
}
export default PlayerPane