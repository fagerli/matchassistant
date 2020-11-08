import React from 'react';
import './App.css';

class Score extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      score: 0
    }
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment(){
    this.setState({score : this.state.score+1});
  }

  decrement(){
    if(this.state.score > 0){
      this.setState({score : this.state.score-1});
    }
  }
  
  render() {
    return(
      <span className="scoreContainer">
      <div className="score" onClick={this.increment}>
      {this.state.score}
      </div>
      <div onClick={this.decrement}>-</div>
      </span>
    );
  }
}
export default Score