import React from 'react';
import {Col, Row} from 'antd';
import BrowseCard from './BrowseCard';
import  '../App.css';
var userID = require('../data');

//class to display all the avaiable quizzes
class Browse extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            userID : userID.userID,
            visible : true,
            quizzes : []
        }
    }

    //using callback function to change states in App.js
    //supplies the id of the quiz clicked, if user is not logged in, will changestate to signup page
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
    
    //is rendered after render()
    componentDidMount(){
        //if user not logged in, fetch all quizzes to display
        if(this.state.userID === null ){
            fetch(`https://api-backend-304cem.herokuapp.com/quiz/browse`)
            //using .then as it will only move to the next line once the promise is completed
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
        //if user is logged in search for quizzes not attempted by the specific user
        else{
            fetch(`https://api-backend-304cem.herokuapp.com/quiz/browse/${this.state.userID}`)
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
    
    /****************************************************************
    Title:OktobUI
    Author:Mahmoud Awad
    Date: 2019
    availability : https://github.coventry.ac.uk/ab8505/OktobUI/tree/homePage
  
    ****************************************************************/

    //using display we learnt in the labs
    //this function returns 1 row
    oneRow(options, rowNumber){
        //go through all the elemnts of options
        let row = options.map(element => {
            //col span is out of 24 so this makes the columns 1/4 of the page
            //properties are passed from the element to the child component "Browsecard"
            //if no image supplied, use the default image
            //selectID is also a callback function
            return <>
            <Col span={6}>
                <div onClick={this.handleClick}>
                    {element !== null ? (
                    <BrowseCard key={element.id} id={element.id} title={element.title} description={element.description}
                        imgSrc = {element.imageURL !== null && element.imageURL !== "" ? element.imageURL : "https://www.marshall.edu/it/files/question-mark-circle-icon-300x240.png" }   
                        selectID = {this.callbackID} author={element.author}/>) : null }
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
            //number of elements allowed per row
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
        return <>
            <p className="browseGuide">Welcome to the quizzes, here you can browse all available quizzes. <br/>
            Please note if you have saved any quizzes mid way through you can access these through History. <br/> 
            To start a quiz click anywhere on the quiz card, Goodluck!</p>          
            {allRows}
        </>;
    }
}

export default Browse;