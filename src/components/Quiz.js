import React from 'react';
import {Col, Row, Form} from 'antd';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
var userID = require('../data');


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

    handleComplete(){
        this.setState({
            completed: 1
        })
    }

    handleIncomplete(){
        this.setState({
            completed: 0
        })
    }

    handleSubmit = async (e) =>{
        e.preventDefault()
        var newTest = {
            userID : userID.userID,
            quizID : this.props.id,
            completed : this.state.completed,
            time : this.state.time
        }
        const postTest = await fetch('https://api-backend-304cem.herokuapp.com/api/v1.0/quiz/', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newTest})
        })
        const result = await postTest.json()
        let resultTestID = null;
        if(result[0] === undefined){
            resultTestID = result
        }
        else{
            resultTestID = result[0]["LAST_INSERT_ID()"]
        }
        let userAnswersArray = []
        var userAnswersCopy = this.state.userAnswers
        if(userAnswersCopy === null){
            userAnswersCopy = [
                {
                    id : null,
                    answer : "",
                    testID : null,
                    questionID : this.state.answers[0].id
                }
            ]
        }
        for(let i = 0; i < userAnswersCopy.length; i++){
            var newAnswer = {
                answer : userAnswersCopy[i].answer,
                testID : resultTestID,
                questionID : userAnswersCopy[i].questionID
            }
            userAnswersArray.push(newAnswer)
        }
        await fetch('https://api-backend-304cem.herokuapp.com/api/v1.0/quiz/answers', {
            method: 'POST',
            headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userAnswersArray})
        }) 
        let TestID = userAnswersArray[0].testID;
        if(this.state.completed === 1){
            const testscore = await fetch(`https://api-backend-304cem.herokuapp.com/api/v1.0/quiz/score/${TestID}`)
            const score = await testscore.json();
            alert("you got " + score + " out of " + this.state.questions.length)
        }
        return(
            this.props.changeState('Browse')
        )  
    }
    getTimeback = (timeData) =>{
        let minString, secString, timeString = "";
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

        timeString = ( minString + ":" + secString)
       // console.log(timeString)
        this.setState({
            time : timeString
        })   
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
        const quizcall = await fetch(`https://api-backend-304cem.herokuapp.com/api/v1.0/quiz/${this.props.id}`)
        const quizres = await quizcall.json()
        const questioncall = await fetch(`https://api-backend-304cem.herokuapp.com/api/v1.0/quiz/${this.props.id}/questions`)
        const questionres = await questioncall.json()
      
        this.setState({
            quiz : quizres[0],
            questions : questionres,
        })
        var doesExist = false
        //check if quiz alrdy been attempted by user and try to return answers 
        const testcheck = await fetch(`https://api-backend-304cem.herokuapp.com/api/v1.0/quiz/savetest/${this.props.id}/${userID.userID}`)
        const testAns = await testcheck.json()
        if (testAns !== undefined & testAns.length !== 0) {
           doesExist = true;
        }
        const testTimeCall = await fetch(`https://api-backend-304cem.herokuapp.com/api/v1.0/quiz/getTest/${this.props.id}/${userID.userID}`)
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
                let answercall = await fetch(`https://api-backend-304cem.herokuapp.com/api/v1.0/quiz/${this.props.id}/questions/${questionres[k].id}`)
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
//classwork
        
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
                <Col span={6}>
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
        return <>
            <h1>{this.state.quiz.title}</h1>
            <img src = {this.state.quiz.imageURL !== null ? this.state.quiz.imageURL : ""}/>
            <h3>{this.state.quiz.description}</h3>
            <Form onSubmit= {this.handleSubmit} onChange={this.handleChange}>
            {this.state.time !== null && this.state.time !== undefined ?( <Timer initialTime = {this.state.time} timerCallback={this.getTimeback}/>) : null}
                {allRows}
                <br/>
                <input type="submit" value="Submit" onClick={this.handleComplete}/>
                <input type="submit" value="Save" onClick={this.handleIncomplete}/>
            </Form>
            
        </>;


    }
}

export default Quiz;