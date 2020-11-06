import React from 'react';
import PlayerPane from './PlayerPane.js';
import './App.css';

class SetupView extends React.Component {
  
  constructor(props){
    super(props);
    this.gotoHelp = this.gotoHelp.bind(this);
    this.gotoMatch = this.gotoMatch.bind(this);
    this.setMatchDuration = this.setMatchDuration.bind(this);
    this.setSwapInterval = this.setSwapInterval.bind(this);
  }

  gotoHelp(){
    this.props.setView('HelpView');
  }
  
  gotoMatch(){
    this.props.setView('MatchView');
  }

  setMatchDuration(e){
    e.preventDefault();
    let inputfield = document.getElementById("matchDuration");
    this.props.setMatchDuration(inputfield.value*60*1000);
  }

  setSwapInterval(e){
    e.preventDefault();
    let inputfield = document.getElementById("swapTime");
    this.props.setSwapInterval(inputfield.value*60*1000);
  }

  render(){

    let completeList = this.props.activePlayers.concat(this.props.passivePlayers);  
    let playerItems = completeList.map((player) =>
    <PlayerPane key={player.no}
              value={player} clickCallback={this.props.deletePlayer}  />
    );  

  return (
    <div className="App">
      <div className="activePlayers">
        <div><h1>Spillere</h1><br/></div>
        <ul>{playerItems}</ul>
      </div>
      <form onSubmit={this.addPlayer}>
      <input id="nameInput" type="text"></input>
      <br/>
      <button onClick={this.props.addPlayer}>legg til spiller</button>
      </form>
      <br/>
      <label htmlFor="matchDuration">Kampvarighet</label>
      <input id="matchDuration" type="number" value={this.props.matchDuration/60/1000} onChange={this.setMatchDuration}></input>
      <br/>
      <label htmlFor="swapTime">Tid mellom bytter</label>
      <input id="swapTime" type="number" value={this.props.swapInterval/60/1000} onChange={this.setSwapInterval}></input>
      <br/>
      <button onClick={this.gotoMatch}>Match view</button>
      <button onClick={this.gotoHelp}>Hjelp</button>
      <hr/>
      <button onClick={this.props.clearAppState}>Reset alt</button>
    </div>
  );
  }
}
export default SetupView;