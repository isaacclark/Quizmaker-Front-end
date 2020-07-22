import React, { Component } from 'react';

import '../App.css';

let openComponent = ""

class Navigation extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            visible : true
        }
    }

    handleBrowse = () => {
        return(
            this.props.changeState('Browse')
        )
    }

    handleLogin = () => {
        return(
            this.props.changeState('Login')
        )
    }

    handleSignup = () => {
        return(
            this.props.changeState('Signup')
        )
    }

    handleHistory = () => {
        return(
            this.props.changeState('BrowseReview')
        )
    }

    handleQuizBuild = () => {
        return(
            this.props.changeState('QuizBuild')
        )
    }

    render(){
        return(
            <ul>
               <li onClick= {this.handleBrowse}>Browse</li>
               <li onClick= {this.handleLogin}>Login</li>
               <li onClick= {this.handleSignup}>Signup</li>
               <li onClick= {this.handleHistory}>History</li>
               <li onClick= {this.handleQuizBuild}>Create a quiz</li>
            </ul>
        )
    }
}

export default Navigation;