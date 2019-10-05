import React from 'react';
import PlayerPane from './PlayerPane.js';
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

    let completeList = this.props.activePlayers.concat(this.props.passivePlayers);  
    let playerItems = completeList.map((player) =>
    <PlayerPane key={player.no}
              value={player} clickCallback={this.props.swapOutPlayer}  />
    );  

  return (
    <div className="App">
      <div className="activePlayers">
        <div>Spillere</div>
        <ul>{playerItems}</ul>
      </div>
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