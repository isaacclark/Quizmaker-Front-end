import React from 'react';
import {Checkbox, Card} from 'antd';
let answers = []

class HistoryCard extends React.Component{
    
    constructor(props){
        super(props);
    
        this.state = {
            
        }

        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleClick(){
        this.props.clicked(this.props.id);
    }

    onChange(e) {
        this.props.clicked(this.props.id, e);
    }

    render(){
        let mystyle = ""
        if(this.props.quizAnswer !== this.props.userAnswer){
            mystyle = {backgroundColor: "Crimson"}
        }
        else{
            mystyle = {backgroundColor: "Chartreuse"} 
        }

        let Meta = Card.Meta;
        return( 
            <div>
                <Card style = {mystyle}>
                    <h3>Question : {this.props.title}</h3>
                    <p>Your answer : {this.props.userAnswer}</p>
                    <p>Actual answer : {this.props.quizAnswer}</p>
                
                </Card>
            </div>
        )
    }
}


export default HistoryCard;