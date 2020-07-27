import React from 'react';
import {Col, Row} from 'antd';
import BrowseCard from './BrowseCard';

class Browse extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            visible : true,
            quizzes : []
        }
    }

    callbackID = (targetID) =>{
        return(
            this.props.changeState('Quiz', targetID)
        )
    }
    
    componentDidMount(){
        fetch("http://localhost:3000/api/v1.0/quiz/")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                quizzes: result
            });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                error
            });
            }
        )
    }

    oneRow(options, rowNumber){
        let row = options.map(element => {
            return <>
            <Col span={6}>
                <div onClick={this.handleClick}>
                    {element !== null ? (
                    <BrowseCard key={element.id} id={element.id} title={element.title} description={element.description}
                        imgSrc = {element.imgURL !== null ? (element.imageURL) : ""}   selectID = {this.callbackID} />) : null }
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

        while(counter < this.state.quizzes.length){
            let quizzesPerRow = [];

            for(let i=0; i < 3; i++){
                if(counter < this.state.quizzes.length)  
                    quizzesPerRow.push(this.state.quizzes[counter]);
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