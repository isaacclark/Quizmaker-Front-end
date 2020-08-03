import React from 'react';
import '../App.css';

class Timer extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            minutes : 0,
            seconds: 0  
        }
    }
    //passes the current time back to the parent
    returnTime = () =>{
        this.props.timerCallback(this.state)
    }

    //gets the initial time from parent
    initialiseTime(){
        //removes the excess ":00" at the end of the time string
        let initialTimeString = this.props.initialTime.toString().slice(0, -3)
        //removes the final 3 chaarcters to get min value
        let intMins = parseInt(initialTimeString.slice(0, -3))
        //removes the first 3 characters to get sec value
        let intSecs = parseInt(initialTimeString.substr(3))
        //set state to intial time
        this.setState({
            minutes: intMins,
            seconds: intSecs
        })
    }

    //make this function async so we can use await
    async componentDidMount(){  
        //wait for the time to be initialised
        await this.initialiseTime()
        //check timer hasn't ended
        if(this.state.minutes > 0 || this.state.seconds > 0){   
            //every 1000ms(1 second) do this
            this.myInterval = setInterval(()=> {
                //assign state vars to temp holders
                let tempminutes = this.state.minutes
                let tempSeconds = this.state.seconds
                tempSeconds = tempSeconds -1 
                //if minutes is greater than 0 remove 1 when seconds reaches 0
                if(tempminutes > 0){
                    if(tempSeconds < 0){
                        tempSeconds = 59
                        tempminutes = tempminutes - 1
                    }
                }
                //set state equal to temp holders
                this.setState({
                    seconds : tempSeconds,
                    minutes : tempminutes
                })
                //if time hits 0 break
                if(tempminutes === 0 && tempSeconds === 0){
                    clearInterval(this.myInterval);
                }
                //return the current time
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
                <h3 className="timer">{minutes} : {seconds}</h3>
            </div>
        )
    }
}

export default Timer
