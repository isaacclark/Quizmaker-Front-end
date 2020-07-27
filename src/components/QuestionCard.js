import React from 'react';
import {Checkbox, Card} from 'antd';

function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}

let answers = []

class QuestionCard extends React.Component{
    
    constructor(props){
        super(props);
    
        this.state = {
            
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.clicked(this.props.id);
    }

    render(){
        //console.log(this.props.answers);
        let Meta = Card.Meta;
        return <Card>
        <h3>{this.props.title}</h3>
        <Checkbox.Group options = {this.props.answers} onChange={onChange} style={{margin: 'center'}}/>
        </Card>;
    }
}


export default QuestionCard;