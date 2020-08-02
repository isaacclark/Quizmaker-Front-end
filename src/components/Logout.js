import React from 'react';
import {Card, Button} from 'antd';
import '../App.css';
var userID = require('../data');



class Logout extends React.Component{
    
    constructor(props){
        super(props);
    
        this.state = {
            
        }

        this.handleLogout = this.handleLogout.bind(this)
        this.handleBrowse = this.handleBrowse.bind(this);
    }

    handleBrowse = () => {
        return(
            this.props.changeState('Browse')
        )
    }

    handleLogout = e => {
        userID.userID = null 
        userID.userName = null
        return(
            this.props.changeState('Browse')
        )
    }

    render(){
        return(
            <div className="logout">
                <h3>Are you sure you want to Logout?</h3>
                <Button className="handleLogoutBtn" onClick={this.handleLogout}>Yes Logout</Button>
                <Button className="handleBrowseBtn" onClick={this.handleBrowse}>No return to browse</Button>
            </div>
        );
    }
}

export default Logout;