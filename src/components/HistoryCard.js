import React from 'react';
import {Checkbox, Card} from 'antd';
import '../App.css';

let answers = []

class HistoryCard extends React.Component{
    //create constructor and pass it props
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    //both callback functions
    handleClick(){
        this.props.clicked(this.props.id);
    }

    onChange(e) {
        this.props.clicked(this.props.id, e);
    }

    render(){
        //set the nameClass for each element to either wrong or right so can use 
        //different css depending on that i.egreen for correct, red for not
        let nameclass = ""
        if(this.props.quizAnswer !== this.props.userAnswer){
            nameclass = "wrong"
        }
        else{
            nameclass = "correct"
        }
        let Meta = Card.Meta;
        return( 
            <div>
                <Card className = {nameclass}>
                    <h3>Question : {this.props.title}</h3>
                    <p>Your answer : <b>{this.props.userAnswer}</b></p>
                    <p>Correct answer : <b>{this.props.quizAnswer}</b></p>  
                </Card>
            </div>
        )
    }
}


export default HistoryCard;