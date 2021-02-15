import React, { Component } from 'react';
import '../Styles/TimerStyle.scss';

class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
            timerTitle: `Timer Number ${this.props.tKey}`,
            inputDisplay: false,
            backColor: '',
            breakTime: 10,
            workTime: 25,
            timerSeconds: 0,
            phase: "Work",
            paused: false,
            timerRunning: false,
        }

        this.editTitle = this.editTitle.bind(this);
        this.updateTimerTitle = this.updateTimerTitle.bind(this);
        this.modifyTime = this.modifyTime.bind(this);
        this.prettyTime = this.prettyTime.bind(this);
        this.runTimer = this.runTimer.bind(this);
        this.initialTime = this.initialTime.bind(this);
        this.setPaused = this.setPaused.bind(this);
    }


    componentDidMount(){
        const colors = ["red", "yellow", "green"];
        this.setState({backColor: colors[Math.floor(Math.random() * colors.length)]});
        this.initialTime();
        console.log(this.state.timerSeconds);
    }

    initialTime(){
        if(this.state.phase == "Work"){
            this.setState({timerSeconds: this.state.workTime * 60});
        }else{
            this.setState({timerSeconds: this.state.breakTime * 60});
        }
    }

    modifyTime(timer, direction){
        switch(timer){
            case "break":
                if(direction == "up"){
                    if(this.state.phase == "Break"){
                        this.setState({breakTime: this.state.breakTime + 1, timerSeconds: (this.state.breakTime + 1) * 60})
                    }else{
                        this.setState({breakTime: this.state.breakTime + 1});
                    }
                }else{
                    if(this.state.phase == "Break"){
                        this.state.breakTime > 1 && this.setState({breakTime: this.state.breakTime - 1, timerSeconds: (this.state.breakTime - 1) * 60})
                    }else{
                        this.setState({breakTime: this.state.breakTime - 1});
                    }
                }
            case "work": 
                if(direction == "up"){
                    if(this.state.phase == "Work"){
                        this.setState({workTime: this.state.workTime + 1, timerSeconds: (this.state.workTime + 1) * 60})
                    }else{
                        this.setState({workTime: this.state.workTime + 1});
                    }
                }else{
                    if(this.state.phase == "Work"){
                        this.state.workTime > 1 && this.setState({workTime: this.state.workTime - 1, timerSeconds: (this.state.workTime - 1) * 60})
                    }else{
                        this.setState({workTime: this.state.workTime - 1});
                    }
                }
                break;
        }
    }

    updateTimerTitle(e){
        if(this.state.inputDisplay){
            this.setState({timerTitle: e.target.value});
        }
    }

    editTitle(){
        this.setState({inputDisplay: !this.state.inputDisplay});
    }

    setPaused(){
        this.setState({paused: !this.state.paused});
    }

    runTimer(){
        let timer = ''
        if(!this.state.timerRunning){
            this.setState({timerRunning: true})
             timer = setInterval(() => {
                !this.state.paused && this.setState({timerSeconds: this.state.timerSeconds - 1})
                if(this.state.timerSeconds == 0){
                    this.setState({timerRunning: false})
                    if(this.state.phase == "Work"){
                        this.setState({phase: "Break"});
                        this.initialTime();
                    }else{
                        this.setState({phase: "Work"});
                        this.initialTime();
                    }
                    clearInterval(timer);
                }
            }, 1000)
        }
        else{
            clearInterval(timer);
        }

        
    }

    prettyTime(){
        let minutes = 0;
        let seconds = 0;
        let placeHolderSeconds = this.state.timerSeconds;
        minutes = Math.floor( placeHolderSeconds / 60)
        seconds = placeHolderSeconds - (minutes * 60);
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ''}${seconds}`;


                
    }

    render(){ 
        return (
            <div className="timer">
                <div className={`title-container background-${this.state.backColor}`}>
                <span className="editPencil" onClick={() => {this.props.deleteMe(this.props.tKey)}}>❌</span>
                    <h3 className={`display-${!this.state.inputDisplay} `}>
                        {this.state.timerTitle} 
                    </h3>
                    <input 
                        type="text" 
                        className={`display-${this.state.inputDisplay}`} 
                        value={this.state.timerTitle} 
                        onChange={this.updateTimerTitle}
                       />
                    <span className="editPencil" onClick={this.editTitle}>✏️</span>

                </div>
                <div className="timer-box">
                    <div className="timer-controls">
                        <div className="break-box">
                            <p className="control-title">
                                Break Time:
                            </p>
                            <span className="timer-up" onClick={() => {
                                this.modifyTime("break", "up");
                            }}>👆</span>
                            <p>{this.state.breakTime}</p>
                            <span className="timer-down" onClick={() => {
                                this.modifyTime("break", "down");
                            }}>👇</span>
                        </div>
                        <div className="work-box">
                            <p className="control-title">
                                Work Time:
                            </p>
                            <span className="timer-up" onClick={() => {
                                this.modifyTime("work", "up");
                            }}>👆</span>
                            <p>{this.state.workTime}</p>
                            <span className="timer-down" onClick={() => {
                                this.modifyTime("work", "down");
                            }}>👇</span>
                        </div>
                    </div>
                    <div id="current-phase">
                        <h3>{this.state.phase}</h3>
                    </div>
                    <div id="time">
                        <p>{this.prettyTime()}</p>
                    </div>
                    <button id="timerButton" onClick={this.state.timerRunning ? this.setPaused : this.runTimer}>{
                    this.state.timerRunning 
                    ?  this.state.paused ? "Resume" :
                    "Pause"
                    : "Start"}
                    
                    </button>
                </div>
            </div>
        )
    }
}

export default Timer;