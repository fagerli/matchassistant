import React from 'react';
import Score from './Score.js';
import Timer from './Timer.js';
import PlayerPane from './PlayerPane.js';
import './App.css';

class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      home: 0,
      away: 0,
      timerStart: new Date(),
      timerRunning: false,
      activePlayers: [],
      passivePlayers: [],
      playerCount:0
    }

    this.toggleTimer = this.toggleTimer.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.swapInPlayer = this.swapInPlayer.bind(this);
    this.swapOutPlayer = this.swapOutPlayer.bind(this);
    this.resetScore = this.resetScore.bind(this);
  }

  toggleTimer(){
    if(this.state.timerRunning){
      this.setState({timerRunning: false});
    }else{
      this.setState({timerStart: new Date(), timerRunning: true});
      window.navigator.vibrate([100,30,100,30,100]);
    }
  }

  resetScore(){
    this.setState({home:0,away:0});
  }

  addPlayer(e){
    e.preventDefault();
    let inputfield = document.getElementById("nameInput");
    let playerName = inputfield.value;
    inputfield.value = "";
    inputfield.focus();
    let tmpPassivePlayers = this.state.passivePlayers;
    let playerNumber = this.state.playerCount+1;
    tmpPassivePlayers.push({no:playerNumber, name:playerName});
    this.setState({
      passivePlayers: tmpPassivePlayers, 
      playerCount: playerNumber });
  }

  swapInPlayer(key){
    let substitute;
    const newPassivePlayers = this.state.passivePlayers.filter(
        function(player){
          if(player.no === key){
            substitute = player;
            return false
          }
          return true;    
        }
        );
    const newActivePlayers = this.state.activePlayers.concat(substitute);    
    this.setState({passivePlayers: newPassivePlayers, activePlayers: newActivePlayers, timerStart: new Date() });    
  }

  swapOutPlayer(key){
    let substitute;
    const newActivePlayers = this.state.activePlayers.filter(
        function(player){
          if(player.no === key){
            substitute = player;
            return false
          }
          return true;    
        }
        );
    const newPassivePlayers = this.state.passivePlayers.concat(substitute);    
    this.setState({passivePlayers: newPassivePlayers, activePlayers: newActivePlayers, timerStart: new Date() });    
  }

  render(){

    let passivePlayerItems = this.state.passivePlayers.map((player) =>
    <PlayerPane key={player.no}
              value={player} clickCallback={this.swapInPlayer}  />
    );

    let activePlayerItems = this.state.activePlayers.map((player) =>
    <PlayerPane key={player.no}
              value={player} clickCallback={this.swapOutPlayer}  />
    );

    let timerButtonText = this.state.timerRunning? "stopp timer" : "start timer";


  return (
    <div className="App">
      <header className="App-header">
        <span className="center"><Score/><Timer isOn={this.state.timerRunning} start={this.state.timerStart}/><Score/></span>
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
      <form onSubmit={this.addPlayer}>
      <input id="nameInput" type="text"></input>
      <button onClick={this.addPlayer}>legg til spiller</button>
      </form>
      <button onClick={this.toggleTimer}>{timerButtonText}</button>
      <br/><br/><br/>
      <div>
        Dette er en veldig enkel app for å holde orden på stillingen, hvilke spillere som skal bytte
        og hvor lenge det er siden forrige bytte.<br/>
        <ol>
        <li>Skriv inn spillernavn og legg til alle spillerne som skal delta</li>
        <li>Alle spillere havner i utgangspunktet på benken</li>
        <li>Klikk på spillerene som skal starte, disse hopper da opp i listen over spillere på banen</li>
        <li>Når kampen starter klikker du på "start timer" knappen</li>
        <li>Øverste navn på listene er de som har vært lengst på banen eller på benken. De er neste som skal byttes</li>
        <li>Hver gang du gjør et bytte så resettes timer for å vise hvor lang tid det er siden forrige bytte</li>
        <li>Trykk på pause timer når omgangen er over</li>
        </ol>
      </div>
    </div>
  );
  }
}
export default App;