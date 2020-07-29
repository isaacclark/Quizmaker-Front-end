import React from 'react';
import {Col, Row, Button, Form, Input} from 'antd';
import BuildCard from './QuizBuildInputs';
var userID = require('../data');


class QuizBuild extends React.Component{
    

    constructor(props){
        
        super(props);

        this.state = { 
            visible : true,   
            title: "",
            description: "",
            id: null,
            questions : [{
                id: null,
                question : "", 
                options : "",
                answers : ""
            }],
        }

        this.handleClick = this.handleClick.bind(this);
      //  this.handler = this.handler.bind(this);
    }

    handleClick = () =>{
        return(
            this.props.changeState('Browse')
        )
    }

    addQuestion = e => {
        this.setState((prevState) => ({
            questions: [...prevState.questions, {
                question : "", 
                options : "",
                answers : ""}]
        }))
    }

    handleSubmit= (e) => { 
        e.preventDefault()
        var newQuiz = {
            title : e.target.title.value, 
            description : e.target.description.value, 
            imageURL : '',
            author : userID.userID}
        //post quiz data (title, description, author)   
     
        fetch('http://localhost:3000/api/v1.0/quizBuild/', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newQuiz})
        })
        //get back the id of the quiz now stored in the db
        .then(res => {
            return res.json()
        })
        .then(data =>  {
            //run through all questions stored in the array
            for(let i = 0; i <this.state.questions.length; i++){
                //prepare json to send through
                var newQuestion = {
                    question : this.state.questions[i].question, 
                    imageURL : '', 
                    quizID : data[0]["LAST_INSERT_ID()"]
                }
                fetch('http://localhost:3000/api/v1.0/quizBuild/question', {
                    method: 'POST',
                    headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({newQuestion})
                })        
                .then(res => {
                    return res.json()
                })
                .then(data =>  {
                    //split the string of correct answers into variables
                    let answerArray = []
                    let corArray = this.state.questions[i].answers.split(',')
                    for(let j = 0; j < corArray.length; j++){
                        var newAnswer = {
                            answer : corArray[j], 
                            correct : 1, 
                            questionID : data[0]["LAST_INSERT_ID()"]
                        }   
                        //push correct answer object into one large array of both correct and incorrect answers 
                        answerArray.push(newAnswer)
                    }
                    //now for incorrect answers
                    let incorArray = this.state.questions[i].options.split(',')
                    for (let j = 0; j < incorArray.length; j++){
                        var newAnswer = {
                            answer : incorArray[j], 
                            correct : 0, 
                            questionID : data[0]["LAST_INSERT_ID()"]
                        }   
                        answerArray.push(newAnswer)
                    }

                    //randomise answerArray so order is stored randomly in db so it's displayed randomly to user upon attempt
                    // https://javascript.info/task/shuffle

                    let newAnswers = answerArray.sort(() => Math.random() - 0.5) 
                    fetch('http://localhost:3000/api/v1.0/quizBuild/answers', {
                        method: 'POST',
                        headers: {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({newAnswers})
                    })        
                    .then(res => {
                       // return res.json()
                    })
                   
                })
            }
        })
    }

    handleChange = e => {
        if(["question", "options", "answers"].includes(e.target.className)){
            let questions = [...this.state.questions]
            questions[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            this.setState({questions}, () => console.log(this.state.questions))
        }
        else{
            this.setState({ [e.target.name]: e.target.value.toUpperCase()})
            console.log(this.state.title)
        }
    }
/*
    handleTitleChange = e => {
        this.setState({
            title : e.target.value.title
        })
    }

    handleDescriptionChange = e => {
        this.setState({
            description : e.target.value.description
        })
    }
*/
    onchange = (data) => {
        console.log("Form>", data);
        console.log(this.state.questions)
    }
    
//  https://codepen.io/pen/?editors=0010

    render(){ 
        let questions = this.state.questions;
        return(
            <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" value={this.state.title} />
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" value={this.state.description}/>
                <button type = "button" onClick={this.addQuestion}>Add question</button>  
                <BuildCard questions={questions} />
                <input type="submit" value="Submit"/> 
            </Form>
        )
    }
}



export default QuizBuild;