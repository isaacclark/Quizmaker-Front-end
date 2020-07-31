import React from 'react';
import {Col, Row} from 'antd';
import BrowseCard from './BrowseCard';

var userID = require('../data');

class Browse extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            userID : userID.userID,
            visible : true,
            quizzes : []
        }
    }

    callbackID = (targetID) =>{
        console.log(targetID)
        return(
            this.props.changeState('Quiz', targetID)
        )
    }
    
    componentDidMount(){
        if(this.state.userID === null){
            fetch(`https://api-backend-304cem.herokuapp.com/api/v1.0/quiz/browse`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                    quizzes: result
                });
                },
                (error) => {
                this.setState({
                    error
                });
                }
            )
        }
        else{
            fetch(`https://api-backend-304cem.herokuapp.com/api/v1.0/quiz/browse/${this.state.userID}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                    quizzes: result
                });
                },
                (error) => {
                this.setState({
                    error
                });
                }
            )
        }
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