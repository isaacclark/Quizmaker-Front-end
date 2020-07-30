import React from 'react';
import {Col, Row, Form} from 'antd';
import HistoryCard from './HistoryCard';
var userID = require('../data');

let questions= []
let counter = 0

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

    handleSubmit = async (e) =>{
        return(
            this.props.changeState('Browse')
        )
    }


    handleChange = (questID , e)  => {
        if(e != undefined){   
            let answers = e.join()
            var exists = false;
            var userAnswersCopy = this.state.userAnswers;
            for (let i = 0; i < userAnswersCopy.length; i++){
                if (userAnswersCopy[i].questionID == questID){
                    exists = true;
                    if (exists){
                        userAnswersCopy[i].answer = answers
                    }
                }
                else{
                }
            }
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

    //Fetching quiz info & questions
    async componentDidMount(){    

        //let answersArray= [];

        //fetch quiz from db
        const testcall = await fetch(`http://localhost:3000/api/v1.0/history/test/${this.props.id}`)
        const testResult = await testcall.json()
        const questioncall = await fetch(`http://localhost:3000/api/v1.0/history/${this.props.id}/questions`)
        const questionResult = await questioncall.json()    
        this.setState({
            test : testResult,
            questions : questionResult,
        })
        /*await Promise.all(
            questionResult.map(async (id) => {
                var s = JSON.stringify(id.id);
                var d = JSON.parse(s);  

                let answercall = await fetch(`http://localhost:3000/api/v1.0/quiz/${this.props.id}/questions/${d}`)
                let answerres = await answercall.json()
                answerres.map(id => {
                    answersArray.push(id)
                })
                
               // answersArray.push(answerres)
               
                }
            )
        )
        this.setState({
            answers : answersArray
        })*/

    }  
//classwork
        
    oneRow(questions, rowNumber){
        let row = questions.map((element, i) => {
        
            return <>
                <Col span={6}>
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
        return <>
            <h1>{this.state.test.title}</h1>
            <img src = {this.state.test.imageURL}/>
            <h3>{this.state.test.description}</h3>
            <h2>score : {this.state.test.score}/{this.state.questions.length}</h2>
            {allRows}
            <br/>     
        </>;


    }
}

export default Quiz;