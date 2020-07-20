import React from 'react';
import {Col, Row, Button, Input} from 'antd';
import QuestionCard from './QuestionCard';

let options = []
let counter = 0

class Quiz extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state = { 
            visible : true
        }

        this.clickItem = this.handleClick.bind(this);
    }

    handleClick = () =>{
        return(
            this.props.changeState('Browse')
        )
    }

    oneRow(options, rowNumber){
        
        let row = options.map(element => {
            counter ++;
            console.log(element.id);
            return <>
                <Col span={6}>
                    {element !== null ? (
                        <QuestionCard key={element.id} id={element.id} title={element.title} answers={element.answers} extra={counter}
                        clicked={this.clickItem} />) : null }
                </Col>
            </>
        }
        );

        return <div key={rowNumber}>
            <Row type="flex" justify="center">
                {row}
            </Row>
            <br />
        </div>
    }
    

    render(){
        let allRows = [];
        let counter = 0;
        let rowNumber = 0;

        while(counter < this.props.options.length){
            let optionsPerRow = [];

            if(counter < this.props.options.length)  
                optionsPerRow.push(this.props.options[counter]);
            else
                optionsPerRow.push(null);

            counter++;
            rowNumber++;

            allRows.push(this.oneRow(optionsPerRow, rowNumber));

        }
        return <>
            {allRows}
            <br/>
            <Button id='submitTest' type="primary" onClick={this.handleClick}>Submit</Button> 
        </>;


    }
}

export default Quiz;