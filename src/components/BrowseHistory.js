import React from 'react';
import {Col, Row} from 'antd';
import BrowseHistoryCard from './BrowseHistoryCard';
import '../App.css';

var userID = require('../data');

class BrowseHistory extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            open : false,
            userID : userID.userID,
            visible : true,
            quizzes : [],
        }
        this.handleComplete = this.handleComplete.bind(this)
        this.handleIncomplete = this.handleIncomplete.bind(this)
    }

    callbackID = (targetID) =>{
        if(this.state.open === false){
            return(
                this.props.changeState('History', targetID)
            )
        }
        else{
            
            fetch(`https://api-backend-304cem.herokuapp.com/history/openquiz/${targetID}`)
            .then(res => res.json())
            .then(
                (result) => {
                    return(
                        this.props.changeState('Quiz', result[0].quizID)
                    )
                },
                (error) => {
                    this.setState({
                        error
                    });
                }  
            ) 
           
        }
    }
    
    handleComplete(){
        let id = this.state.userID
        fetch(`https://api-backend-304cem.herokuapp.com/history/closed/${id}`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    open:false,
                    quizzes: result
                });
            },
            (error) => {
                this.setState({
                    error
                });
            }  
        ) 
    }

    handleIncomplete(){ 
        let id = this.state.userID
        fetch(`https://api-backend-304cem.herokuapp.com/history/open/${id}`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    open:true,
                    quizzes: result
                });
            },
            (error) => {
                this.setState({
                    error
                });
            }
        )  
    }

    componentDidMount(){
        let id = this.state.userID
            fetch(`https://api-backend-304cem.herokuapp.com/history/closed/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        quizzes: result
                    });
                },
            (error) => {
            this.setState({
                error
            });
            }
        )   
    }

    oneRow(options, rowNumber){
        let row = options.map(element => {
            return <>
            <Col span={6}>
                <div onClick={this.handleClick}>
                    {element !== null ? (
                    <BrowseHistoryCard key={element.id} id={element.id} title={element.title} description={element.description}
                        imgSrc = {element.imgURL !== null && element.imageURL !== "" ? (element.imageURL) : "https://www.marshall.edu/it/files/question-mark-circle-icon-300x240.png"}   
                        selectID = {this.callbackID} author = {element.author} time ={element.time} score={element.score} open={this.state.open}/> ) : null }
                </div>
            </Col>
            </>
        }
        );

        return <div key={rowNumber}>
            <Row type="flex" justify="center">
                {row}
            </Row>
            <br />
        </div>
    }

    render(){
        let allRows = [];
        let counter = 0;
        let rowNumber = 0;

        while(counter < this.state.quizzes.length){
            let quizzesPerRow = [];

            for(let i=0; i < 3; i++){
                if(counter < this.state.quizzes.length)  
                    quizzesPerRow.push(this.state.quizzes[counter]);
                else
                    quizzesPerRow.push(null);
                counter++;
            }

            rowNumber++;
            allRows.push(this.oneRow(quizzesPerRow, rowNumber));

        }
        return <>
            <div>
                <ul className="historyBrowseNav">
                    <li onClick={this.handleComplete}>Completed tests</li>
                    <li onClick={this.handleIncomplete}>Incomplete tests</li>
                </ul>
            </div>
            {allRows}
        </>;
    }
}

export default BrowseHistory;