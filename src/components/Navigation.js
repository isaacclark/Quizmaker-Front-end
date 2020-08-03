import React  from 'react';
import '../App.css';
var userID = require('../data');

//navigation bar seen at the top of every page
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

    handleLogout = () => {
        return(
            this.props.changeState('Logout')
        )
    }
    handleSignup = () => {
        return(
            this.props.changeState('Signup')
        )
    }

    //if user isn't logged in reroute to signup
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

    //if user isn't logged in reroute to signup
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

    //if user is logged in, render their name to the navbar as well as a logout option
    userHere(user){ 
        if(user.userID === null || user.userID === undefined){
            return(
            <ul className="navBar">
                <li onClick= {this.handleBrowse}>Browse</li>
                <li onClick= {this.handleLogin}>Login</li>
                <li onClick= {this.handleSignup}>Signup</li>
                <li onClick= {this.handleHistory}>History</li>
                <li onClick= {this.handleQuizBuild}>Create a quiz</li>
            </ul>
            )
        }
        else{
            return (
            <div>
                <ul className="navBar">
                    <li onClick= {this.handleBrowse}>Browse</li>
                    <li onClick= {this.handleLogin}>Login</li>
                    <li onClick= {this.handleSignup}>Signup</li>
                    <li onClick= {this.handleHistory}>History</li>
                    <li onClick= {this.handleQuizBuild}>Create a quiz</li>
                    <li onClick= {this.handleLogout}>Logout</li>
                    <li className="loggedUser">{user.userName}</li>
                </ul>
                
            </div>
            )
        }
    }

    render(){
        let nav = this.userHere(userID)
        return<>
            {nav}
        </>
    }
}

export default Navigation;