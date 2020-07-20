import React, { Component } from 'react';
import './App.css';
import Quiz from './components/Quiz'
import Signup from './components/signup';
import Login from './components/Login';
import Browse from './components/Browse';
import Navigation from './components/Navigation';
import QuizBuild from './components/QuizBuild';

const options = [{title : "What is the capital of japan?", answers : [{ label :"Tokyo", value: "Tokyo"},{ label : "kyoto", value: "kyoto"},{ label : "Osaka", value: "Osaka"}]},
  {title: "What is the largest animal by mass?", answers : [{ label: "Elephant", value: "Elephant"}, {label: "Blue whale", value : "Blue whale"}]},
  {title: "True or false? 70% of the world's population live in the northern hemisphere.", answers : [{ label: "True", value: "True"}, {label: "False", value : "False"}]},
  {title: "True or false? 70% of the world's population live in the northern hemisphere.", answers : [{ label: "True", value: "True"}, {label: "False", value : "False"}]}];

const quizzes = [{ title : "chicken", description : "chicken description", imgURL : "https://i.imgur.com/C4LnClT.png"},
  { title : "dog", description : "dog description", imgURL : "https://i.imgur.com/tDPelXq.png"}];

class App extends React.Component {
  
  state = {
    visible: true,
    whichComponentToShow: 'Quiz'
  }
  
  callbackState = (newState) => {
    //callback function to get data back from child for navbar
    this.setState({whichComponentToShow: newState})
  }


  render(){  
    //this.state.whichComponentToShow = Navigation;
    switch(this.state.whichComponentToShow){
      case 'Quiz':
        return(     
          <div>
            <Navigation changeState = {this.callbackState}/>
            {<Quiz options = {options} changeState = {this.callbackState}/>}
          </div>
        )
      case 'Signup':
        return(
          <div>  
            <Navigation changeState = {this.callbackState}/>
            {<Signup options = {options}/>}
          </div>
      )
      case 'Login':
        return(
          <div>   
            <Navigation changeState = {this.callbackState}/>  
            {<Login options = {options}/>}
          </div>
      )
      case 'Browse':
        return(
          <div>
            <Navigation changeState = {this.callbackState}/>
            <Browse quizzes = {quizzes}/>
          </div>
      )
      case 'QuizBuild':
        return(
          <div>
            <Navigation changeState = {this.callbackState}/>
            <QuizBuild options = {options} changeState = {this.callbackState}/>
          </div>
      )
      default: 
        return (null)
    }
  }
}



   

export default App;
