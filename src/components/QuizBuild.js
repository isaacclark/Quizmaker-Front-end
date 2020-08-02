import React from 'react';
import {Col, Row, Button, Form, Input} from 'antd';
import BuildCard from './QuizBuildInputs';
import '../App.css';

var userID = require('../data');


class QuizBuild extends React.Component{
    

    constructor(props){
        
        super(props);

        this.state = { 
            visible : true,   
            title: "",
            description: "",
            imageURL: "",
            id: null,
            time : null,
            questions : [{
                id: null,
                question : "", 
                options : "",
                answers : ""
            }],
        }

    }



    addQuestion = e => {
        this.setState((prevState) => ({
            questions: [...prevState.questions, {
                question : "", 
                options : "",
                answers : ""}]
        }))
    }

    removeQuestion = e => {
        var questionsCopy = this.state.questions
        questionsCopy.pop()
        this.setState({
            questions : questionsCopy
        })
    }
    
    handleSubmit= (e) => { 
        e.preventDefault()
        let validated = true;
        if(e.target.title.value === "" || e.target.title.value === null || e.target.title.value === "" || this.state.questions.length < 1){
            validated = false;
        }
        for(let j = 0; j < this.state.questions.length; j++){
            if (this.state.questions[j].question === null || this.state.questions[j].answers === null || this.state.questions[j].question.length < 1 || this.state.questions[j].answers.length < 1){
                validated = false;
            }
        }
        if(validated === false){
            alert("There needs to be a title and atleast 1 question with atleast 1 correct answer, nor can there be any questions that don't meet these requirements.")
        }
        else{
            var newQuiz = {
                title : e.target.title.value, 
                description : e.target.description.value, 
                imageURL : e.target.imageURL.value,
                author : userID.userID,
                time : e.target.time.value
            }
            //post quiz data (title, description, author)   
        
            fetch('https://api-backend-304cem.herokuapp.com/quizBuild/', {
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
                    fetch('https://api-backend-304cem.herokuapp.com/quizBuild/question', {
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
                        fetch('https://api-backend-304cem.herokuapp.com/quizBuild/answers', {
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
            alert("Quiz created!")
            return(
                this.props.changeState('Browse')
            )
        }
    }

    handleChange = e => {
        if(["question", "options", "answers"].includes(e.target.className)){
            let questions = [...this.state.questions]
            questions[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({questions}, () => console.log(this.state.questions))
        }
        else{
            this.setState({ [e.target.name]: e.target.value})
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
        <div>
            <p className="buildGuide">Welcome to the Quiz Builder! It's very simple to do but just a <b>few things to note</b>  :<br/> <b>1)</b>  In order to create a quiz you must have a title and atleast 1 question with answer. <br/>
            <b>2)</b> There cannot be any questions that don't have a question or atleast one correct answer! <b>Make use of the "Remove last question" button!</b><br/><b>3)</b> For each question you should place your correct answer(s) in the answer input box and the incorrect answer(s) in the options box. <br/> <b>4)</b> Use a "," to signify the start of a new option/answer.<br/> 
            <b>5)</b> The time input is in mm:ss format. <b>Good luck!</b></p>  
                <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <div className="quizBuildDiv">
                        <div className="buildTitle">
                            <label htmlFor="title"> Title  </label>
                            <input type="text" name="title" id="title" value={this.state.title} />
                        </div>
                        <div className="buildDescription">
                            <label htmlFor="description" className="buildDescription">Description  </label>
                            <input type="text" name="description" id="description" value={this.state.description}/>
                        </div>
                        <div className="conjoiner">
                            <div className = "buildImg">
                                <label htmlFor="imageURL">Image URL  </label>
                                <input type="text" name="imageURL" id="imageURL" value={this.state.imageURL}/>
                            </div>
                            <div className = "buildTime">
                                <label htmlFor="time">Time  </label>
                                <input type="time" id="time" name="time" values={this.state.time}/>
                            </div>
                        </div>
                    </div>
                    <Button className="addQuestion" onClick={this.addQuestion}>Add question</Button>  
                    <Button className="removeQuestion" onClick={this.removeQuestion}>Remove last question</Button>  
                    <BuildCard questions={questions} />
                    <input type="submit" value="Submit" className="buildSubmit"/> 
                </Form>
        </div>
        )
    }
}



export default QuizBuild;