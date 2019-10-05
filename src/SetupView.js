import React from 'react';
import './App.css';

class SetupView extends React.Component {
  
  constructor(props){
    super(props);
    this.gotoHelp = this.gotoHelp.bind(this);
    this.gotoMatch = this.gotoMatch.bind(this);
  }

  gotoHelp(){
    this.props.setView('HelpView');
  }
  
  gotoMatch(){
    this.props.setView('MatchView');
  }

  render(){

  return (
    <div className="App">
      <form onSubmit={this.addPlayer}>
      <input id="nameInput" type="text"></input>
      <button onClick={this.props.addPlayer}>legg til spiller</button>
      </form>
      <button onClick={this.gotoMatch}>Match view</button>
      <button onClick={this.gotoHelp}>Hjelp</button>
    </div>
  );
  }
}
export default SetupView;