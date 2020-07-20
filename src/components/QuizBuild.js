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
        this.handler = this.handler.bind(this);
    }

    handleClick = () =>{
        return(
            this.props.changeState('Browse')
        )
    }

    handler = (index) => {
        let questionscopy = this.state.questions;
        if (questionscopy > 1){
          questionscopy.splice(index,1);
        }
        this.setState({
            questions: questionscopy
        })
    }

//https://www.youtube.com/watch?v=ivM4Yfks_sk&t=960s
/*
    removeQuestion = (index) =>{
      let questionscopy = this.state.questions;
      if (questionscopy > 1){
        questionscopy.splice(index,1);
      }
      this.setState({
          questions: questionscopy
      })
    }
*/
    /*  let questionsTemp =  this.state.questions;

    if (questionsTemp.length > 1){
        questionsTemp.splice(index,1);
        for (let i = index; i < questionsTemp.length; i++){
            questionsTemp[i].num = questionsTemp[i].num -1;
        }
        
        this.setState({
            questions: questionsTemp
        })
    }
    console.log('this is a test plz work')*/
/*
    addQuestion = () =>{
        let questionsTemp =  this.state.questions;
        let questionID, questionNum = 0;
        if (Number.isInteger((questionsTemp.slice(-1)[0]).id)){
            questionID = (questionsTemp.slice(-1)[0]).id + 1;
            questionNum = (questionsTemp.slice(-1)[0]).num + 1;
        }

        questionsTemp.push({
            id: questionID, 
            num: questionNum,
            question: ""
        })
        
        this.setState({
            questions : questionsTemp
        })
    }
*/
    addQuestion = e => {
        this.setState((prevState) => ({
            questions: [...prevState.questions, {
                question : "", 
                options : "",
                answers : ""}]
        }))
    }

    handleSubmit = e => {
        e.preventDefault();
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
    }

//  https://codepen.io/pen/?editors=0010

    render(){ 
        let questions = this.state.questions;
        return(
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" />
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description"/>
                <button onClick={this.addQuestion}>Add question</button>  
                <BuildCard questions={questions} />
                <input type="submit" value="Submit"/> 
            </form>
        )
    }
}



export default QuizBuild;