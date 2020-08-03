import React from 'react';
import {Col, Row} from 'antd';
import BrowseHistoryCard from './BrowseHistoryCard';
import '../App.css';

var userID = require('../data');

//browse but for history of past quizzes attempted and/or completed
class BrowseHistory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //this defines which set of the tests the user can see, either completed or not.
            open : false,
            userID : userID.userID,
            visible : true,
            quizzes : [],
        }
        this.handleComplete = this.handleComplete.bind(this)
        this.handleIncomplete = this.handleIncomplete.bind(this)
    }

    //if element that is clicked is closed then open the quiz with the 'History' component
    //if element is open, then fetch the tests quizID and open using 'quiz' using that id  
    callbackID = (targetID) =>{
        if(this.state.open === false){
            return(
                this.props.changeState('History', targetID)
            )
        }
        else{
            fetch(`https://api-backend-304cem.herokuapp.com/history/openquiz/${targetID}`)
            .then(res => res.json())
            .then(
                (result) => {
                    return(
                        this.props.changeState('Quiz', result[0].quizID)
                    )
                },
                (error) => {
                    this.setState({
                        error
                    });
                }  
            ) 
           
        }
    }

    //fetch all quizzes completed by the user
    handleComplete(){
        let id = this.state.userID
        fetch(`https://api-backend-304cem.herokuapp.com/history/closed/${id}`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    open:false,
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

    //fetch all partially completed quizzes saved by the user
    handleIncomplete(){ 
        let id = this.state.userID
        fetch(`https://api-backend-304cem.herokuapp.com/history/open/${id}`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    open:true,
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

    //intially render all the closed quizzes
    componentDidMount(){
        let id = this.state.userID
            fetch(`https://api-backend-304cem.herokuapp.com/history/closed/${id}`)
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
    /****************************************************************
    Title:OktobUI
    Author:Mahmoud Awad
    Date: 2019
    availability : https://github.coventry.ac.uk/ab8505/OktobUI/tree/homePage
  
    ****************************************************************/
    //using display we learnt in the labs
    //this function returns 1 row
    oneRow(options, rowNumber){
        let row = options.map(element => {
            //sends both the time and score variable to the child even if one is null
            return <>
            <Col span={6}>
                <div onClick={this.handleClick}>
                    {element !== null ? (
                    <BrowseHistoryCard key={element.id} id={element.id} title={element.title} description={element.description}
                        imgSrc = {element.imgURL !== null && element.imageURL !== "" ? (element.imageURL) : "https://www.marshall.edu/it/files/question-mark-circle-icon-300x240.png"}   
                        selectID = {this.callbackID} author = {element.author} time ={element.time} score={element.score} open={this.state.open}/> ) : null }
                </div>
            </Col>
            </>
        }
        );
        //place the row variable between 2 row elements
        return <div key={rowNumber}>
            <Row type="flex" justify="center">
                {row}
            </Row>
            <br />
        </div>
    }

    //render this first
    render(){
        let allRows = [];
        let counter = 0;
        let rowNumber = 0;
         /****************************************************************
        Title:OktobUI
        Author:Mahmoud Awad
        Date: 2019
        availability : https://github.coventry.ac.uk/ab8505/OktobUI/tree/homePage
  
        ****************************************************************/
        //more setup we learnt in class to display the browsecards in a simple to use layout of columsn and rows
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
            //push each row into this var
            allRows.push(this.oneRow(quizzesPerRow, rowNumber));

        }
        //create some navigation between the two types of quizzes, completed and not
        return <>
            <div>
                <ul className="historyBrowseNav">
                    <li onClick={this.handleComplete}>Completed tests</li>
                    <li onClick={this.handleIncomplete}>Incomplete tests</li>
                </ul>
            </div>
            {allRows}
        </>;
    }
}

export default BrowseHistory;