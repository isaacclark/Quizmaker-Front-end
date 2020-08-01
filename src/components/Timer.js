import React from 'react';
import {Checkbox, Card} from 'antd';

//https://github.com/codingforentrepreneurs/Try-Reactjs

class Timer extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            minutes : 0,
            seconds: 0
            
        }
    }
    returnTime = () =>{
        this.props.timerCallback(this.state)
    }

    initialiseTime(){
        console.log("working yet?")
        let initialTimeString = this.props.initialTime.toString().slice(0, -3)
        console.log(initialTimeString + " initialised time is")
        let intMins = parseInt(initialTimeString.slice(0, -3))
        let intSecs = parseInt(initialTimeString.substr(3))
        this.setState({
            minutes: intMins,
            seconds: intSecs
        })
    }

    componentDidMount(){  
        this.initialiseTime()
        console.log("we've initialised")
        if(this.state.minutes !== 0 || this.state.seconds !== 0){   
            console.log("now we've passed that check")
            this.myInterval = setInterval(()=> {
                console("are the intervals working?")
                let tempminutes = this.state.minutes
                let tempSeconds = this.state.seconds
                tempSeconds = tempSeconds -1 
                if(tempminutes > 0)
                if(tempSeconds < 0){
                    tempSeconds = 59
                    tempminutes = tempminutes - 1
                }
                this.setState({
                    seconds : tempSeconds,
                    minutes : tempminutes
                })
                if(tempminutes === 0 && tempSeconds === 0){
                    clearInterval(this.myInterval);
                }
                console.log(tempminutes , tempSeconds)
                this.returnTime()
            }, 1000) 
        }
        else{
            this.setState({
                minutes : null,
                seconds: null
            })
        }      
    }

    componentWillUnmount(){
        clearInterval(this.myInterval)
    }

    render(){
        var {seconds} = this.state
        var {minutes} = this.state
        return(    
            <div>
                <h3>{minutes} : {seconds}</h3>
            </div>
        )
    }
}

export default Timer
