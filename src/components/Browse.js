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
        if (this.state.userID === null ){
            return(
                this.props.changeState('Signup')
            )
        }
        else{
            return(
                this.props.changeState('Quiz', targetID)
            )
        }
    }
    
    componentDidMount(){
        if(this.state.userID === null ){
            fetch(`https://api-backend-304cem.herokuapp.com/quiz/browse`)
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
            fetch(`https://api-backend-304cem.herokuapp.com/quiz/browse/${this.state.userID}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                    quizzes: result
                });
                console.log(this.state.quizzes)
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
                        imgSrc = {element.imageURL !== null && element.imageURL !== "" ? (element.imageURL) : "https://www.marshall.edu/it/files/question-mark-circle-icon-300x240.png" }   selectID = {this.callbackID} />) : null }
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