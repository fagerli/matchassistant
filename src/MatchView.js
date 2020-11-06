import React from 'react';
import PlayerPane from './PlayerPane.js';
import Timer from './Timer.js';
import Score from './Score.js';
import './App.css';

class MatchView extends React.Component {
  
  constructor(props){
       super(props);
       this.gotoHelp = this.gotoHelp.bind(this);
       this.gotoSetup = this.gotoSetup.bind(this);
  }

  gotoHelp(){
    this.props.setView('HelpView');
  }
  
  gotoSetup(){
    this.props.setView('SetupView');
  }

  render(){

    let passivePlayerItems = this.props.passivePlayers.map((player) =>
    <PlayerPane key={player.no}
              value={player} clickCallback={this.props.swapInPlayer}  />
    );

    let activePlayerItems = this.props.activePlayers.map((player) =>
    <PlayerPane key={player.no}
              value={player} clickCallback={this.props.swapOutPlayer}  />
    );

    let timerButtonText = this.props.timerRunning? "stopp timer" : "start timer";


  return (
    <div className="App">
      <header className="App-header">
        <span className="center">
          <Score/>
          <span className="center">
            <Timer isOn={this.props.timerRunning} start={this.props.timerStart} interval={this.props.matchDuration} title="Total"/>
            <Timer isOn={this.props.timerRunning} start={this.props.swapTime} interval={this.props.swapInterval} title="Bytte"/>
          </span>
          <Score/>
        </span>
      </header>
      <hr/>
      <div className="activePlayers">
        <div>Spillere på banen</div>
        <ul>{activePlayerItems}</ul>
      </div>
      <hr/>
      <div className="passivePlayers">
        <div>Spillere på benken</div>
        <ul>
        {passivePlayerItems}
        </ul>
      </div>
      <hr/>
      <button onClick={this.props.toggleTimer}>{timerButtonText}</button>
      <button onClick={this.gotoSetup}>Setup view</button>
      <button onClick={this.gotoHelp}>Hjelp</button>
    </div>
  );
  }
}
export default MatchView;