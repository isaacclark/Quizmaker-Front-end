import React from 'react';
import {Col, Row} from 'antd';
import BrowseHistoryCard from './BrowseHistoryCard';
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
            
            fetch(`https://api-backend-304cem.herokuapp.com/api/v1.0/history/openquiz/${targetID}`)
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
        fetch(`https://api-backend-304cem.herokuapp.com/api/v1.0/history/closed/${id}`)
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
        fetch(`https://api-backend-304cem.herokuapp.com/api/v1.0/history/open/${id}`)
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
            fetch(`https://api-backend-304cem.herokuapp.com/api/v1.0/history/closed/${id}`)
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
                        imgSrc = {element.imgURL !== null ? (element.imageURL) : ""}   selectID = {this.callbackID} time ={element.time} score={element.score}/>) : null }
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
            <ul>
                <button onClick={this.handleComplete}>Completed tests</button>
                <button onClick={this.handleIncomplete}>Incomplete tests</button>
            </ul>
        </div>
            {allRows}
        </>;
    }
}

export default BrowseHistory;