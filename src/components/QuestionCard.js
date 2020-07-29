import React from 'react';
import {Checkbox, Card} from 'antd';
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
        let newval = this.props.defaultChecked
        let Meta = Card.Meta;
        return <Card>
        <h3>{this.props.title}</h3>
        <Checkbox.Group options = {this.props.answers} style={{margin: 'center'}} defaultValue={newval} onChange={this.onChange} className="checkbox"/>
        </Card>;
        
    }
}


export default QuestionCard;