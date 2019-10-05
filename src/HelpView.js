import React from 'react';
import './App.css';

class HelpView extends React.Component {
  
  constructor(props){
    super(props); 
    this.gotoSetup = this.gotoSetup.bind(this);
    this.gotoMatch = this.gotoMatch.bind(this);
  }

  gotoSetup(){
    this.props.setView('SetupView');
  }
  
  gotoMatch(){
    this.props.setView('MatchView');
  }

  render(){

    
  return (
    <div className="App">
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
        <button onClick={this.gotoMatch}>Match view</button>
        <button onClick={this.gotoSetup}>Setup view</button>
    </div>
  );
  }
}
export default HelpView;