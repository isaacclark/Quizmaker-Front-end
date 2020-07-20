import React, { Children } from 'react';
import {Col, Row, Button} from 'antd';
import BuildCard from './BuildCard';

let counter = 0;
let allRows = [];
let questions = [];

class QuizBuild extends React.Component{
    
    constructor(props){
        super(props);
        this.questionID = 0;

        this.state = { 
            visible : true,   
            allRows : [{id : ""}]
        }

        this.handleClick = this.handleClick.bin010d(this);
        this.addQuestion = this.addQuestion.bind(this);
    }

    handleClick = () =>{
        return(
            this.props.changeState('Browse')
        )
    }
    

    addQuestion = (element) =>{
        this.questionID ++;
    }

    oneRow = () => {     
        let row = questions.map(element => {
            return <>
                <Col span={6}>
                    {element !== null ? (
                        <BuildCard />) : null }
                </Col>
            </>
        }
        );
        return <div>
            <Row type="flex" justify="center">
                {row}
            </Row>
            <br />
        </div>
    }


    render(){    
        counter = 0;
            while counter


        return <>
            {allRows}
            <br/>
            <Button id='addQuestion' onclick={this.addQuestion}>Add question</Button>
            <br/>
            <Button id='submitTest' type="primary" onClick={this.handleClick}>Submit</Button>    
        </>;

    }
}



export default QuizBuild;