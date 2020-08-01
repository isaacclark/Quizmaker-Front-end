import React  from 'react';
import '../App.css';
var userID = require('../data');

class Navigation extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            visible : true,
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
        if (userID.userID === null){
            return(
                this.props.changeState('Signup')
            )
        }
        else{
            return(
            this.props.changeState('BrowseHistory')
            )
        }
    }

    handleQuizBuild = () => {
        if (userID.userID === null){
            return(
                this.props.changeState('Signup')
            )
        }
        else{
            return(
            this.props.changeState('QuizBuild')
            )
        }
    }

    render(){
        return(
            <ul className="navBar">
               <li onClick= {this.handleBrowse}>Browse</li>
               <li onClick= {this.handleLogin}>Login</li>
               <li onClick= {this.handleSignup}>Signup</li>
               <li onClick= {this.handleHistory}>History</li>
               <li onClick= {this.handleQuizBuild}>Create a quiz</li>
               <li>{userID.userName}</li>
            </ul>
        )
    }
}

export default Navigation;