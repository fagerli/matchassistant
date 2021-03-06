import React from 'react';
import MatchView from './MatchView.js';
import SetupView from './SetupView.js';
import HelpView from './HelpView.js';
import './App.css';

class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state = this.getInitStateObject();

    this.toggleTimer = this.toggleTimer.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.deletePlayer = this.deletePlayer.bind(this);
    this.swapInPlayer = this.swapInPlayer.bind(this);
    this.swapOutPlayer = this.swapOutPlayer.bind(this);
    this.resetScore = this.resetScore.bind(this);
    this.setView = this.setView.bind(this);
    this.setMatchDuration = this.setMatchDuration.bind(this);
    this.setSwapInterval = this.setSwapInterval.bind(this);
    this.clearAppState = this.clearAppState.bind(this);

  }

  componentDidMount(){
    let players = localStorage.getItem('MatchAssistantPlayers');
    if(players){
      let playerArray = JSON.parse(players);
      this.setState({passivePlayers:playerArray,playerCount:playerArray.length});
    }
  }

  toggleTimer(){
    if(this.state.timerRunning){
      this.setState({timerRunning: false});
    }else{
      this.setState({timerStart: new Date(), swapTime: new Date(), timerRunning: true});
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
     
    let playerList = tmpPassivePlayers.concat(this.state.activePlayers);
    localStorage.setItem('MatchAssistantPlayers', JSON.stringify(playerList));  
  }

  deletePlayer(playerNo){
    console.log("Player should have been deleted. But...  not implemented yet");
    //search active and passive players
    //need to ensure no collision on player IDs
  }

  clearAppState(){
    this.setState(this.getInitStateObject());
  }

  getInitStateObject(){
    return {
      home: 0,
      away: 0,
      timerStart: new Date(),
      swapTime: new Date(),
      timerRunning: false,
      activePlayers: [],
      passivePlayers: [],
      playerCount:0,
      activeView: 'SetupView',
      swapInterval: 3*60*1000,
      matchDuration : 13*60*1000
    }
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
    this.setState({passivePlayers: newPassivePlayers, activePlayers: newActivePlayers, swapTime: new Date() });    
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
    this.setState({passivePlayers: newPassivePlayers, activePlayers: newActivePlayers, swapTime: new Date() });    
  }

  setView(nextView){
    this.setState({activeView: nextView});
  }

  setMatchDuration(nextMatchDuration){
    this.setState({matchDuration: nextMatchDuration});
  }

  setSwapInterval(nextSwapInterval){
    this.setState({swapInterval: nextSwapInterval});
  }

  render(){

    let view;
    if(this.state.activeView==='MatchView'){
      view = <MatchView 
        passivePlayers={this.state.passivePlayers}
        activePlayers={this.state.activePlayers}
        swapInterval={this.state.swapInterval}
        swapInPlayer={this.swapInPlayer}
        swapOutPlayer={this.swapOutPlayer}
        timerRunning={this.state.timerRunning} 
        timerStart={this.state.timerStart}
        matchDuration={this.state.matchDuration}
        swapTime={this.state.swapTime}
        toggleTimer={this.toggleTimer}
        setView={this.setView}
      />
    }else if(this.state.activeView==='SetupView'){
      view = <SetupView 
        passivePlayers={this.state.passivePlayers}
        activePlayers={this.state.activePlayers}
        swapInterval={this.state.swapInterval}
        matchDuration={this.state.matchDuration}
        addPlayer={this.addPlayer}
        deletePlayer={this.deletePlayer}
        setSwapInterval={this.setSwapInterval}
        setMatchDuration={this.setMatchDuration} 
        clearAppState={this.clearAppState}
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