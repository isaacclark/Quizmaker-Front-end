import React from 'react';
import {Col, Row} from 'antd';
import BrowseCard from './BrowseCard';

let quizzes = []

class Browse extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            
        }
    }
   
    oneRow(quizzes, rowNumber){
        let row = quizzes.map(element => {
            return <>
            <Col span={6}>
                {element !== null ? (
                <BrowseCard key={element.id} id={element.id} title={element.title} description={element.description}
                    imgSrc = {element.imgURL}/>) : null }
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

            for(let i=0; i < 1; i++){
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