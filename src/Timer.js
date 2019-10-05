const React = require('react')
class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0
    }
    let me = this;
    setInterval(
      function(){
        if(me.props.isOn){
          me.setState({time: Date.now() - me.props.start})
        }
      }  
      , 1000);
  }
  
  render() {  
     let min = Math.floor((this.state.time/1000/60) << 0);
     let sec = Math.floor((this.state.time/1000) % 60);
     let minStr = min < 10 ? "0"+min : ""+min;
     let secStr = sec < 10 ? "0"+sec : ""+sec;
    return(
      <span className="timer">{minStr}:{secStr}</span>
    )
  }
}
export default Timer