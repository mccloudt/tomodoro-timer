import React, { Component } from 'react';
import '../Styles/TimerStyle.scss';

class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
            timerTitle: `Timer Number ${this.props.tKey}`,
            inputDisplay: false,
            backColor: '',
            breakTime: 5,
            workTime: 25,
            phase: "Work",
            paused: false,
            stopped: false,
        }

        this.editTitle = this.editTitle.bind(this);
        this.updateTimerTitle = this.updateTimerTitle.bind(this);
        this.modifyTime = this.modifyTime.bind(this);
    }


    componentDidMount(){
        const colors = ["red", "yellow", "green"];
        this.setState({backColor: colors[Math.floor(Math.random() * colors.length)]});
    }

    modifyTime(timer, direction){
        console.log(timer, direction);
        switch(timer){
            case "break":
                direction == "up" ? this.setState({breakTime: this.state.breakTime + 1}) : this.state.breakTime > 1 && this.setState({breakTime: this.state.breakTime - 1})
        }
    }

    updateTimerTitle(e){

        if(this.state.inputDisplay){
            console.log(e.target.value);
            this.setState({timerTitle: e.target.value});
        }
    }

    editTitle(){
        this.setState({inputDisplay: !this.state.inputDisplay});
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
                    <div>
                        <h1>{this.state.phase}:</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Timer;