import React from 'react';
import MatchView from './MatchView.js';
import SetupView from './SetupView.js';
import HelpView from './HelpView.js';
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
      playerCount:0,
      activeView: 'SetupView',
      swapTime: 3*60*1000,
      matchDuration : 13*60*1000
    }

    this.toggleTimer = this.toggleTimer.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.swapInPlayer = this.swapInPlayer.bind(this);
    this.swapOutPlayer = this.swapOutPlayer.bind(this);
    this.resetScore = this.resetScore.bind(this);
    this.setView = this.setView.bind(this);
    this.setMatchDuration = this.setMatchDuration.bind(this);
    this.setSwapTime = this.setSwapTime.bind(this);

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

  setView(nextView){
    this.setState({activeView: nextView});
  }

  setMatchDuration(nextMatchDuration){
    this.setState({matchDuration: nextMatchDuration});
  }

  setSwapTime(nextSwapTime){
    this.setState({swapTime: nextSwapTime});
  }

  render(){

    let view;
    if(this.state.activeView==='MatchView'){
      view = <MatchView 
        passivePlayers={this.state.passivePlayers}
        activePlayers={this.state.activePlayers}
        swapTime={this.state.swapTime}
        swapInPlayer={this.swapInPlayer}
        swapOutPlayer={this.swapOutPlayer}
        timerRunning={this.state.timerRunning} 
        timerStart={this.state.timerStart}
        toggleTimer={this.toggleTimer}
        setView={this.setView}
      />
    }else if(this.state.activeView==='SetupView'){
      view = <SetupView 
        passivePlayers={this.state.passivePlayers}
        activePlayers={this.state.activePlayers}
        swapTime={this.state.swapTime}
        matchDuration={this.state.matchDuration}
        addPlayer={this.addPlayer}
        setSwapTime={this.setSwapTime}
        setMatchDuration={this.setMatchDuration} 
        setView={this.setView}/>     
    }else{
      view = <HelpView setView={this.setView}/>
    }

  return (
    <div>{view}</div>
  );
  }
}
export default App;