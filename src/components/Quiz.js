import React from 'react';
import {Col, Row, Form} from 'antd';
import QuestionCard from './QuestionCard';

let questions= []
let counter = 0

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
                questionID : 0
            }],
            test : [{
                id : null,
                userID : 1,
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
            userID : this.state.test.userID,
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
        console.log(result)
        let userAnswersArray = []
        var userAnswersCopy = this.state.userAnswers
        console.log(userAnswersCopy)
        for(let i = 1; i < userAnswersCopy.length; i++){
            var newAnswer = {
                answer : userAnswersCopy[i].answer,
                testID : result[0]["LAST_INSERT_ID()"],
                questionID : userAnswersCopy[i].questionID
            }
            userAnswersArray.push(newAnswer)
        }
        const postAnswers = await fetch('http://localhost:3000/api/v1.0/quiz/answers', {
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
       // console.log(this.state.userAnswers)
    }

    //Fetching quiz info & questions
    async componentDidMount(){    

        let answersArray= [];

        //fetch quiz from db
        const quizcall = await fetch(`http://localhost:3000/api/v1.0/quiz/${this.props.id}`)
        const quizres = await quizcall.json()
        const questioncall = await fetch(`http://localhost:3000/api/v1.0/quiz/${this.props.id}/questions/`)
        const questionres = await questioncall.json()
        var testDummy = {
            id : null,
            userID : 1,
            quizID : quizres.id,
            completed : 0
        }        
        this.setState({
            quiz : quizres,
            questions : questionres,
            test: testDummy
        })

        await Promise.all(
            questionres.map(async (id) => {
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
        })

    }  
//classwork
        
    oneRow(questions, rowNumber, answers){
        let answerlabels = []
    
        let row = questions.map((element, i) => {
            answers.map((index) =>{
                if (index.questionID === element.id){
                    answerlabels.push(index.answer)
                }
                
            })
        
            return <>
                <Col span={6}>
                    {element !== null ? (
                        <QuestionCard key={element.id} id={element.id} title={element.question} answers={answerlabels} extra={counter}
                        clicked={this.handleChange} />) : null }
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
            <img src = {this.state.quiz.imageURL}/>
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