import React from 'react';
import {Col, Row, Button, Form, Input} from 'antd';
import BuildCard from './QuizBuildInputs';


class QuizBuild extends React.Component{
    
    constructor(props){
        
        super(props);

        this.state = { 
            visible : true,   
            title: "",
            description: "",
            questions : [{
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
/*
    handler = (index) => {
        let questionscopy = this.state.questions;
        if (questionscopy > 1){
          questionscopy.splice(index,1);
        }
        this.setState({
            questions: questionscopy
        })
    }*/

    addQuestion = e => {
        this.setState((prevState) => ({
            questions: [...prevState.questions, {
                question : "", 
                options : "",
                answers : ""}]
        }))
    }

    handleSubmit = e => { 
        e.preventDefault()
        let newQuiz = [
            title = e.target.title,
            description = e.target.description,
            imageURL = null,
            author = null,
        ]

        let newQuestions = [
            question = "",
            quizID = "" //get quiz id back from server
        ]

        let corrArray = target.value.answers.split(',')

        for(i = 0; i < corrArray.length; i++){
            let newAnswers = [
                answer = "",
                correct = True,
                questionID = ""
            ]
        }

     /*   fetch('http://localhost:3000/api/v1.0/quizBuild', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({values})})*/
        
    }

    handleChange = e => {
        if(["question", "options", "answers"].includes(e.target.className)){
            let questions = [...this.state.questions]
            questions[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            this.setState({questions}, () => console.log(this.state.questions))
        }
        else{
            this.setState({ [e.target.name]: e.target.value.toUpperCase()})
        }
    }

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
                <input type="text" name="title" id="title" />
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description"/>
                <button onClick={this.addQuestion}>Add question</button>  
                <BuildCard questions={questions} />
                <input type="submit" value="Submit"/> 
            </Form>
        )
    }
}



export default QuizBuild;