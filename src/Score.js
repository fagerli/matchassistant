import React from 'react';
import './App.css';

class Score extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      score: 0
    }
    this.increment = this.increment.bind(this);
  }

  increment(){
    this.setState({score : this.state.score+1});
  }
  
  render() {
    return(
      <span className="score" onClick={this.increment}>
      {this.state.score}
      </span>
    );
  }
}
export default Score