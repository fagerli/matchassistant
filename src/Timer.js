const React = require('react')
class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 0,
      vibrated : false
    }
    let me = this;
    this.intervalID = setInterval(
      function(){
        if(me.props.isOn){
          let newTime = Date.now() - me.props.start;
          me.setState({time: newTime})
          if(me.state.time > me.props.interval){
            if(!me.state.vibrated){
              window.navigator.vibrate([200, 100, 200, 100, 200]);
              me.setState({vibrated:true});
            }
           }else{
             if(me.state.vibrated){
              me.setState({vibrated:false});
             }
           }
        }
      }  
      , 1000);
  }
  

  componentWillUnmount(){
    clearInterval(this.intervalID);
  }

  render() {  
     let min = Math.floor((this.state.time/1000/60) << 0);
     let sec = Math.floor((this.state.time/1000) % 60);
     let minStr = min < 10 ? "0"+min : ""+min;
     let secStr = sec < 10 ? "0"+sec : ""+sec;

     let decoration = "timer";
     if(this.state.time > this.props.interval){
      decoration = "redTimer"
     }

     let title = this.props.title;

    return(
      <div>
        <div>{title}</div>
        <span className={decoration} style={{display:'block'}}>{minStr}:{secStr}</span>
      </div>
    )
  }
}
export default Timer