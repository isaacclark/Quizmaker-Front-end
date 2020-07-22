import React from 'react';
import {Col, Row} from 'antd';
import BrowseCard from './BrowseCard';

let quizzes = []

class Browse extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            visible : true
        }
    }

    callbackID = (targetID) =>{
        return(
            this.props.changeState('Quiz', targetID)
        )
    }
   
    oneRow(quizzes, rowNumber){
        let row = quizzes.map(element => {
            return <>
            <Col span={6}>
                <div onClick={this.handleClick}>
                    {element !== null ? (
                    <BrowseCard key={element.id} id={element.id} title={element.title} description={element.description}
                        imgSrc = {element.imgURL} selectID = {this.callbackID} />) : null }
                </div>
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

        while(counter < this.props.quizzes.length){
            let quizzesPerRow = [];

            for(let i=0; i < 3; i++){
                if(counter < this.props.quizzes.length)  
                    quizzesPerRow.push(this.props.quizzes[counter]);
                else
                    quizzesPerRow.push(null);
                counter++;
            }

            rowNumber++;
            allRows.push(this.oneRow(quizzesPerRow, rowNumber));

        }
        return <>
            {allRows}
        </>;
    }
}

export default Browse;