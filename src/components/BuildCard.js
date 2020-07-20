import React from 'react';
import {Checkbox, Card, Button, Form} from 'antd';

function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}

let answers = []

class BuildCard extends React.Component{
    
    constructor(props){
        super(props);
    
        this.state = {
            question : [{
                title : "",
                options : "",
                answers : ""
            }]

            
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.clicked(this.props.id);
    }

    handleSubmit(event){
        alert(this.state.question)
    }
    render(){
        return <Card>
            <Form onSubmit={this.handleSubmit}>
                <p>{this.props.num}</p>
                <input id = "Title" type="text" value ={this.state.title}/>
                <input id = "Options" type="text" value ={this.state.options}/>
                <input id = "Answers" type="text" value ={this.state.answers}/>
                <Button value="Submit">Submit</Button>
                <Button onClick={this.props.remove}>Remove</Button>
            </Form>
        </Card>;
    }
}


export default BuildCard;