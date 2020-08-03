import React from 'react';
import {Col, Row, Form} from 'antd';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
import '../App.css';
var userID = require('../data');

//main component used for any quiz/test the user attempts
class Quiz extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state = { 
            visible : true,
            secondmount: false,
            completed: 0,
            time: null,
            quiz : [{
                id : 0, 
                title : "", 
                description : "", 
                imageURL: "", 
                author: "",
                time: null
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
                completed : 0,
            }],
            userAnswers : [{
                id : null,
                answer : null,
                testID : null,
                questionID : null
            }]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleComplete = this.handleComplete.bind(this)
        this.handleIncomplete = this.handleIncomplete.bind(this)
    }
    //changes the state of completed depending on whether the user chose to save or submit
    handleComplete(){
        this.setState({
            completed: 1
        })
    }
    //changes the state of completed depending on whether the user chose to save or submit
    handleIncomplete(){
        this.setState({
            completed: 0
        })
    }
    //upon submit do this
    handleSubmit = async (e) =>{
        e.preventDefault()
        //create a var for the test to be posted containing userID, quizID, completed, and time remaining
        var newTest = {
            userID : userID.userID,
            quizID : this.props.id,
            completed : this.state.completed,
            time : this.state.time
        }
        //post the test var to the db
        //as it's an async function we can use await as we need the var this call returns 
        //for the next post
        const postTest = await fetch('https://api-backend-304cem.herokuapp.com/quiz/', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newTest})
        })
        const result = await postTest.json()
        let resultTestID = null;
        //if the test was previosuly attempted this is it's ID
        if(result[0] === undefined){
            resultTestID = result
        }
        //if its a new test the testID was stored at this var
        else{
            resultTestID = result[0]["LAST_INSERT_ID()"]
        }
        let userAnswersArray = []
        //copy state.userAnswers
        var userAnswersCopy = this.state.userAnswers
        if(userAnswersCopy === null){
            //if the answer didn't previously exist create a new answer
            userAnswersCopy = [
                {
                    id : null,
                    answer : "",
                    testID : null,
                    questionID : this.state.answers[0].id
                }
            ]
        }
        //for the each element of userAnswerscopy
        for(let i = 0; i < userAnswersCopy.length; i++){
            //creat a newAnswer witth answersCopy answer, testID from the previous call
            //questionID from the userAnswers
            var newAnswer = {
                answer : userAnswersCopy[i].answer,
                testID : resultTestID,
                questionID : userAnswersCopy[i].questionID
            }
            //push the newAnswer var into an array
            userAnswersArray.push(newAnswer)
        }
        //post all the answers in userAnswersArray to the db
        await fetch('https://api-backend-304cem.herokuapp.com/quiz/answers', {
            method: 'POST',
            headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userAnswersArray})
        }) 
        let TestID = userAnswersArray[0].testID;
        //if the test is completed, grade the quiz and return the score in an alert
        if(this.state.completed === 1){
            const testscore = await fetch(`https://api-backend-304cem.herokuapp.com/quiz/score/${TestID}`)
            const score = await testscore.json();
            alert("you got " + score + " out of " + this.state.questions.length)
        }
        //navigate to browse
        return(
            this.props.changeState('Browse')
        )  
    }
    //get the time remaining on the timer
    getTimeback = (timeData) =>{
        let minString, secString, timeString = "";
        //depending on how long the minString and secString vars are, add 0s so
        //they can be stored in the db which has the time data type
        switch(timeData.minutes.toString().length){
            case 0: 
                minString = "00";
                break;
            case 1:
                minString = "0" + timeData.minutes.toString();
                break;
            default:
                minString = timeData.minutes.toString();
        }
        switch(timeData.seconds.toString().length){
            case 0: 
                secString = "00";
                break;
            case 1:
                secString = "0" + timeData.seconds.toString();
                break;
            default:
                secString = timeData.seconds.toString();
        }
        //concat the 2 vars
        timeString = ( minString + ":" + secString)
        this.setState({
            time : timeString
        })   
        //if the time left is 0, assign the quiz as completed
        if(timeData.seconds === 0 && timeData.minutes === 0){
            this.setState({
                completed : 1
            })   
            this.handleSubmit()
        }
    }
    
    handleChange = (questID , e)  => {
        if(e !== undefined){   
            let answers = e.join()
            var exists = false;
             //create a copy of userAnswers
            var userAnswersCopy = this.state.userAnswers;
             //for all the answers that were stored un userAnswers
            for (let i = 0; i < userAnswersCopy.length; i++){
                //if the question id is the same as the questionID supplied by the child component
                if (userAnswersCopy[i].questionID === questID){
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
        const quizcall = await fetch(`https://api-backend-304cem.herokuapp.com/quiz/${this.props.id}`)
        const quizres = await quizcall.json()
        //fetch questions for that quiz from db
        const questioncall = await fetch(`https://api-backend-304cem.herokuapp.com/quiz/${this.props.id}/questions`)
        const questionres = await questioncall.json()
      
        //set state.quiz = to the quiz fetched from db
        //same for questions and the state.time = quiz.time from db
        this.setState({
            time : quizres[0].time,
            quiz : quizres[0],
            questions : questionres,
        })
        var doesExist = false
        //check if quiz alrdy been attempted by user and try to return answers 
        const testcheck = await fetch(`https://api-backend-304cem.herokuapp.com/quiz/savetest/${this.props.id}/${userID.userID}`)
        const testAns = await testcheck.json()
        if (testAns !== undefined & testAns.length !== 0) {
           doesExist = true;
        }
        const testTimeCall = await fetch(`https://api-backend-304cem.herokuapp.com/quiz/getTest/${this.props.id}/${userID.userID}`)
        const testTime = await testTimeCall.json()
        if(testTime.length > 0){
            let quizTemp = this.state.quiz
            quizTemp.time = testTime[0].time
            this.setState({
                time : quizTemp.time,
                quiz : quizTemp
            })

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
                let answercall = await fetch(`https://api-backend-304cem.herokuapp.com/quiz/${this.props.id}/questions/${questionres[k].id}`)
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
                    if (checkedAns.answer === answerres[i].answer && checkedAns.questionID === answerres[i].questionID){    //compare test answer value with answer value,if true assign true to the quiz answer's checked variable
                        answerres[i].checked = "isChecked"
                    }          
                }
                for(let j = 0; j < answerres.length; j++){
                    AnswersArray.push(answerres[j])
                }      
            }
        
        this.setState({
            secondmount : true,
            answers : AnswersArray
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
    oneRow(questions, rowNumber, answers, counter){
        let answerlabels = []
        let setDefaultCheck = []
        let row = questions.map((element, i) => {
            //setDefaultCheck.pop()
            setDefaultCheck.push("")  
            answers.map((index) =>{
                if (index.questionID === element.id){ 
                    answerlabels.push(index.answer) 
                    if(index.checked === "isChecked"){
                        setDefaultCheck.push(index.answer)
                    } 
                   
                    if(setDefaultCheck.length > 1){
                        setDefaultCheck.shift()
                    }
                }
                
            })

            return <>
                <Col span={24}>
                    {element !== null && setDefaultCheck.length > 0 && this.state.secondmount === true ?(
                        <QuestionCard key={element.id} id={element.id} title={element.question} 
                        defaultChecked={setDefaultCheck === [""] ? null : setDefaultCheck} answers={answerlabels} 
                        clicked={this.handleChange}  />) : null }
                </Col>
            </>
        });
        return( <div key={rowNumber}>
            <Row type="flex" justify="center">
                {row}
            </Row>
            <br />
        </div>
        )
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

       
            allRows.push(this.oneRow(questionsPerRow, rowNumber, answers, counter));

        }
        //only initialise timer if secondmount i.e. componentDidMount is finished
        //and if the intial time isn't "00:00:00" or null as the author may not have
        //set a time
        return <>
            <div className = "quiz">
                <h1 >{this.state.quiz.title}</h1>
                <img className="quizImg" src = {this.state.quiz.imageURL !== null ? this.state.quiz.imageURL : ""}/>
                <h3>{this.state.quiz.description}</h3>
                <Form onSubmit= {this.handleSubmit} onChange={this.handleChange}>
                    {this.state.time !== null && this.state.time !== undefined && this.state.secondmount === true && this.state.time !== "00:00:00" ?
                    (<Timer initialTime = {this.state.time} timerCallback={this.getTimeback} />) : null}
                    {allRows}
                    <br/>
                    <input className="submitBtn" type="submit" value="Submit" onClick={this.handleComplete}/>
                    <input className="saveBtn" type="submit" value="Save" onClick={this.handleIncomplete}/>
                </Form>
            </div>
        </>;


    }
}

export default Quiz;