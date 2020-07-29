import React from 'react';
import {Col, Row, Form} from 'antd';
import QuestionCard from './QuestionCard';
var userID = require('../data');


class Quiz extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state = { 
            visible : true,
            quiz : [{
                id : 0, 
                title : "", 
                description : "", 
                imageURL: "", 
                author: ""
            }],
            questions : [{ 
                    id : 0,
                    question : "",
                    imageURL : "",
                    quizID : 0
            }],
            answers : [{
                id : 0,
                answer : "",
                correct : false,
                questionID : 0,
                checked : ""
            }],
            test : [{
                id : null,
                userID : userID.userID,
                quizID : 0,
                completed : 0
            }],
            userAnswers : [{
                id : null,
                answer : null,
                testID : null,
                questionID : null
            }]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = async (e) =>{
        e.preventDefault()
        var newTest = {
            userID : userID.userID,
            quizID : this.props.id,
            completed : 0
        }
        const postTest = await fetch('http://localhost:3000/api/v1.0/quiz/', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newTest})
        })
        const result = await postTest.json()
        let userAnswersArray = []
        var userAnswersCopy = this.state.userAnswers
        for(let i = 1; i < userAnswersCopy.length; i++){
            var newAnswer = {
                answer : userAnswersCopy[i].answer,
                testID : result[0]["LAST_INSERT_ID()"],
                questionID : userAnswersCopy[i].questionID
            }
            userAnswersArray.push(newAnswer)
        }
        await fetch('http://localhost:3000/api/v1.0/quiz/answers', {
            method: 'POST',
            headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userAnswersArray})
        }) 
        let TestID = userAnswersArray[0].testID;
        const testscore = await fetch(`http://localhost:3000/api/v1.0/quiz/score/${TestID}`)
        const score = await testscore.json();
        alert("you got " + score + " out of " + this.state.questions.length)
        return(
            this.props.changeState('Browse')
        )
    }


    handleChange = (questID , e)  => {
        if(e !== undefined){   
            let answers = e.join()
            var exists = false;
            var userAnswersCopy = this.state.userAnswers;
            for (let i = 0; i < userAnswersCopy.length; i++){
                if (userAnswersCopy[i].questionID === questID){
                    exists = true;
                    if (exists){
                        userAnswersCopy[i].answer = answers
                    }
                }
                else{
                }
            }
            if (exists === false){ 
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
        //fetch quiz from db
        const quizcall = await fetch(`http://localhost:3000/api/v1.0/quiz/${this.props.id}`)
        const quizres = await quizcall.json()
        const questioncall = await fetch(`http://localhost:3000/api/v1.0/quiz/${this.props.id}/questions`)
        const questionres = await questioncall.json()
          
        this.setState({
            quiz : quizres,
            questions : questionres,

        })
        var doesExist = false
        //check if quiz alrdy been attempted by user and try to return answers 
        const testcheck = await fetch(`http://localhost:3000/api/v1.0/quiz/savetest/${this.props.id}/${userID.userID}`)
        const testAns = await testcheck.json()
        if (testAns !== undefined & testAns.length !== 0) {
           doesExist = true;
        }
        let checkedAns = [];
        var AnswersArray = [];
            for(let k = 0; k < questionres.length; k++){
                //if fetch request for tests with same userID as current user and same quizID as current quiz
                if (doesExist === true){
                    //if the questionid for the testanswer is equal to the current questions id assign testanswer to checkedAns
                   for(let i = 0; i < testAns.length; i++){
                      
                        if(testAns[i].questionID === questionres[k].id){
                            checkedAns = testAns[i]
                        }
                    }
                   
                }
                //fetch answers for current question
                let answercall = await fetch(`http://localhost:3000/api/v1.0/quiz/${this.props.id}/questions/${questionres[k].id}`)
                let answerresult = await answercall.json()
                let answerres = []
                //Assign all answers for current question into array and add the property "checked" to each element and define it as false
                for(let i = 0; i < answerresult.length; i++){
                    answerres[i] = {
                        id : answerresult[i].id,
                        answer : answerresult[i].answer,
                        correct : answerresult[i].correct,
                        questionID : questionres[k].id,
                        checked : "notChecked"
                    } 
                    if (checkedAns.answer === answerres[i].answer){    //compare test answer value with answer value,if true assign true to the quiz answer's checked variable
                        answerres[i].checked = "isChecked"
                    }          
                }
                for(let j = 0; j < answerres.length; j++){
                    AnswersArray.push(answerres[j])
                }      
            }
        
        this.setState({
            answers : AnswersArray
        })

    }  
//classwork
        
    oneRow(questions, rowNumber, answers){
        let answerlabels = []
        let setDefaultCheck = []
        let row = questions.map((element, i) => {
            answers.map((index) =>{
                if (index.questionID === element.id){
                    if(index.checked === "isChecked"){
                        setDefaultCheck.push(index.answer)
                    }   
                    answerlabels.push(index.answer)
                } 
            })
            return <>
                <Col span={6}>
                    {element !== null ? (
                        <QuestionCard key={element.id} id={element.id} title={element.question} 
                        defaultChecked={setDefaultCheck !== undefined ? setDefaultCheck : null}answers={answerlabels} 
                        clicked={this.handleChange}  />) : null }
                </Col>
            </>
        });

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
        let answers = this.state.answers;

        while(counter < this.state.questions.length){
            let questionsPerRow = [];

            if(counter < this.state.questions.length)  
                questionsPerRow.push(this.state.questions[counter]);
            else
                questionsPerRow.push(null);

            counter++;
            rowNumber++;

       
            allRows.push(this.oneRow(questionsPerRow, rowNumber, answers));

        }
        return <>
            <h1>{this.state.quiz.title}</h1>
            <img src = {this.state.quiz.imageURL !== null ? this.state.quiz.imageURL : ""}/>
            <h3>{this.state.quiz.description}</h3>
            <Form onSubmit= {this.handleSubmit} onChange={this.handleChange}>
                {allRows}
                <br/>
                <input type="submit" value="Submit"/> 
            </Form>
            
        </>;


    }
}

export default Quiz;