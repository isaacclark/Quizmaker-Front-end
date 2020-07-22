import React, { Component } from 'react';
import './App.css';
import Quiz from './components/Quiz'
import Signup from './components/signup';
import Login from './components/Login';
import Browse from './components/Browse';
import Navigation from './components/Navigation';
import QuizBuild from './components/QuizBuild';
import BrowseReview from './components/BrowseReview';

const options = 
[{ id: 1, title : "chicken", description : "chicken description", imgURL : "https://i.imgur.com/C4LnClT.png", 
  questions: [{title : "What is the capital of japan?", answers : [{ label :"Tokyo", value: "Tokyo"},{ label : "kyoto", value: "kyoto"},{ label : "Osaka", value: "Osaka"}]},
  {title: "What is the largest animal by mass?", answers : [{ label: "Elephant", value: "Elephant"}, {label: "Blue whale", value : "Blue whale"}]},
  {title: "True or false? 70% of the world's population live in the northern hemisphere.", answers : [{ label: "True", value: "True"}, {label: "False", value : "False"}]},
  {title: "True or false? 70% of the world's population live in the northern hemisphere.", answers : [{ label: "True", value: "True"}, {label: "False", value : "False"}]}
  ]},
 {id: 2 , title : "dog", description : "dog description", imgURL : "https://i.imgur.com/tDPelXq.png",
  questions: [{title : "What is the capital of japan?", answers : [{ label :"Tokyo", value: "Tokyo"},{ label : "kyoto", value: "kyoto"},{ label : "Osaka", value: "Osaka"}]},
  {title: "testy westy", answers : [{ label: "Elephant", value: "Elephant"}, {label: "Blue whale", value : "Blue whale"}]},
  {title: "True or false? 70% of the world's population live in the northern hemisphere.", answers : [{ label: "True", value: "True"}, {label: "False", value : "False"}]},
  {title: "True or false? 70% of the world's population live in the northern hemisphere.", answers : [{ label: "True", value: "True"}, {label: "False", value : "False"}]}
]}];

class App extends React.Component {
  
  state = {
    visible: true,
    whichComponentToShow: 'Browse',
    id: 0
  }
  
  callbackState = (newState, targetid) => {
    //callback function to get data back from child for navbar
    this.setState({whichComponentToShow: newState, id: targetid})
  }


  render(){  
    //this.state.whichComponentToShow = Navigation;
    switch(this.state.whichComponentToShow){
      case 'Quiz':
        return(     
          <div>
            <Navigation changeState = {this.callbackState}/>
            {<Quiz options = {options} id = {this.state.id} key = {this.state.id} changeState = {this.callbackState}/>}
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
            <Browse quizzes = {options} changeState = {this.callbackState}/>
          </div>
      )
      case 'QuizBuild':
        return(
          <div>
            <Navigation changeState = {this.callbackState}/>
            <QuizBuild options = {options} changeState = {this.callbackState}/>
          </div>
      )
      case 'BrowseReview':
        return(
          <div>
            <Navigation changeState = {this.callbackState}/>
            <BrowseReview quizzes = {options}/>
          </div>
      )
      default: 
        return (null)
    }
  }
}



   

export default App;
