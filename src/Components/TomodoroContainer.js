import React, { Component } from 'react';
import '../Styles/TomodoroContainerStyle.scss';
import Timer from '../Components/Timer';

class TomodoroContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            timers: [],
        }
        this.addTimer = this.addTimer.bind(this);
        this.deleteTimer = this.deleteTimer.bind(this);
    }

    addTimer(){
        this.setState({timers: [...this.state.timers, <Timer 
                key={Math.random()} 
                tKey={this.state.timers.length + 1} 
                deleteMe={this.deleteTimer}
            /> 
        ]})
    }
    deleteTimer(timerKey){
        let timers = this.state.timers.slice();
        timers = timers.filter((e) => {
            return e.props.tKey !== timerKey;
        })
        this.setState({timers: timers})
        
        
    }

    render(){
        return (
            <div id="page-container">
                <h1 className="container-with-text">Tomodoro Timer</h1>
                <p className="container-with-text">To add a timer, click "Add Timer" below</p>
                <button className="container-with-text button" onClick={this.addTimer}>Add Timer</button>
                <div id="timer-container">
                    {this.state.timers}
                </div>
                <footer>
                    Made with ☕ by Tom McCloud
                </footer>
            </div>
        )
    }


}

export default TomodoroContainer;