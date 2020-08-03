import React from 'react';
import {Checkbox, Card} from 'antd';
import '../App.css'
let answers = []
let defaultChecked = []


class QuestionCard extends React.Component{
    
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
        let Meta = Card.Meta;
        return(
            //display answers in a checkbox, defaultValue allows the box to be preselected
            //this is for if the test was previously saved, so the user has their previous answers displayed
            <Card className="questionCard">
                <h3>{this.props.title}</h3>
                <Checkbox.Group options = {this.props.answers} style={{margin: 'center'}} defaultValue={this.props.defaultChecked} onChange={this.onChange} className="checkbox"/>
            </Card>
        );
        
    }
}


export default QuestionCard;