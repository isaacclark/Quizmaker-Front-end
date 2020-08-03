import React from 'react';
import {Col, Row, Form} from 'antd';
import HistoryCard from './HistoryCard';
var userID = require('../data');

class Quiz extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state = { 
            visible : true,
            test: [{
                id : 0, 
                title : "", 
                description : "", 
                imageURL: "", 
                score: "",
                userID: userID.userID
            }],
            questions : [{ 
                id : 0,
                question : "",
                imageURL : "",
                quizAnswer : "",
                userAnswer : ""
            }]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //callbackfunction to return to Browse when submitted
    handleSubmit = async (e) =>{
        return(
            this.props.changeState('Browse')
        )
    }
/*
    handleChange = (questID , e)  => {
        if(e != undefined){   
            let answers = e.join()
            var exists = false;
            //create a copy of userAnswers
            var userAnswersCopy = this.state.userAnswers;
            //for all the answers that were stored un userAnswers
            for (let i = 0; i < userAnswersCopy.length; i++){
                //if the question id is the same as the questionID supplied by the child component
                if (userAnswersCopy[i].questionID == questID){
                    exists = true; 
                    if (exists){
                        //the userAnswers copy answer is now the same as the answers supplied by the element
                        userAnswersCopy[i].answer = answers
                    }
                }
                else{
                }
            }
            //if the question doesn't exist in state add a new one
            if (exists == false){ 
                this.setState((prevState) => ({
                    userAnswers: [...prevState.userAnswers, {
                        id : null,
                        answer : answers,
                        questionID : questID,
                        testID : null
                    }]
                }))
            }
            else{
                this.setState({
                    userAnswers : userAnswersCopy
                })
            }
        }
    }
*/
    //Fetching quiz info & questions
    async componentDidMount(){    
        let answersArray= [];
        //fetch quiz from db
        const testcall = await fetch(`https://api-backend-304cem.herokuapp.com/history/test/${this.props.id}`)
        const testResult = await testcall.json()
        //fetch the questions from the quiz
        const questioncall = await fetch(`https://api-backend-304cem.herokuapp.com/history/${this.props.id}/questions`)
        const questionResult = await questioncall.json()  
        this.setState({
            test : testResult,
            questions : questionResult,
        })
        //async function means we can use await which will wait for this function to be executed before continuing
        await Promise.all(
            questionResult.map(async (id) => {
                var s = JSON.stringify(id.id);
                var d = JSON.parse(s);  
                //get answers using the question id and test id
                let answercall = await fetch(`https://api-backend-304cem.herokuapp.com/quiz/${this.props.id}/questions/${d}`)
                let answerres = await answercall.json()
                answerres.map(id => {
                    answersArray.push(id)
                })
                
                answersArray.push(answerres)
               
                }
            )
        )
        this.setState({
            answers : answersArray
        })

    }  

    /****************************************************************
    Title:OktobUI
    Author:Mahmoud Awad
    Date: 2019
    availability : https://github.coventry.ac.uk/ab8505/OktobUI/tree/homePage
  
    ****************************************************************/
    //using display we learnt in the labs
    //this function returns 1 row    
    oneRow(questions, rowNumber){
        let row = questions.map((element, i) => {
            //let row span entire width of the page
            return <>
                <Col span={24}>
                    {element !== null ? (
                        <HistoryCard key={element.id} id={element.id} title={element.question} 
                        userAnswer={element.answer === "" ? "" : element.userAnswer} quizAnswer= {element.quizAnswer} clicked={this.handleChange} extra={counter}/>) : null }
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
        /****************************************************************
        Title:OktobUI
        Author:Mahmoud Awad
        Date: 2019
        availability : https://github.coventry.ac.uk/ab8505/OktobUI/tree/homePage
  
        ****************************************************************/
        //more setup we learnt in class to display the browsecards in a simple to use layout of columsn and rows
        while(counter < this.state.questions.length){
            let questionsPerRow = [];
            if(counter < this.state.questions.length)  
                questionsPerRow.push(this.state.questions[counter]);
            else
                questionsPerRow.push(null);
            counter++;
            rowNumber++;
            allRows.push(this.oneRow(questionsPerRow, rowNumber));
        }
        //display the title, description, image, score and all questions & answers
        return <>
        <div className = "history">
            <h1 className= "">{this.state.test.title}</h1>
            <img src = {this.state.test.imageURL}/>
            <h3>{this.state.test.description}</h3>
            <h2>score : {this.state.test.score}/{this.state.questions.length}</h2>
            {allRows}
            <br/>     
        </div>
        </>;


    }
}

export default Quiz;