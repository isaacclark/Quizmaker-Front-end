import React from 'react';
import {Col, Row, Button, Input} from 'antd';
import QuestionCard from './QuestionCard';

let questions= []
let counter = 0

class Quiz extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state = { 
            visible : true,
            quiz : [{
                id : 0, 
                title : "", 
                description : "", 
                imageURL: "", 
                author: ""
            }],
            questions : [{ 
                    id : 0,
                    question : "",
                    imageURL : "",
                    quizID : 0
            }],
            answers : [{
                id : 0,
                answer : "",
                correct : false,
                questionID : 0
            }]
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = () =>{
        return(
            this.props.changeState('Browse')
        )
    }

    async componentDidMount(){    

        let answersArray= [];

        //fetch quiz from db
        const quizcall = await fetch(`http://localhost:3000/api/v1.0/quiz/${this.props.id}`)
        const quizres = await quizcall.json()
        const questioncall = await fetch(`http://localhost:3000/api/v1.0/quiz/${this.props.id}/questions/`)
        const questionres = await questioncall.json()
        this.setState({
            quiz : quizres,
            questions : questionres,
        })
        
        await Promise.all(
            questionres.map(async (id) => {
                var s = JSON.stringify(id.id);
                var d = JSON.parse(s);  

                let answercall = await fetch(`http://localhost:3000/api/v1.0/quiz/${this.props.id}/questions/${d}`)
                let answerres = await answercall.json()
                answerres.map(id => {
                    answersArray.push(id)
                })
                
               // answersArray.push(answerres)
               
                }
            )
        )
        //console.log(answersArray)
        this.setState({
            answers : answersArray
        })

    }  

        
    oneRow(questions, rowNumber, answers){
        let answerlabels = []
    
        let row = questions.map((element, i) => {
            answers.map((index) =>{
                if (index.questionID === element.id){
                    answerlabels.push(index.answer)
                }
                
            })
        
            //console.log(answerlabels)
            return <>
                <Col span={6}>
                    {element !== null ? (
                        <QuestionCard key={element.id} id={element.id} title={element.question} answers={answerlabels} extra={counter}
                        clicked={this.clickItem} />) : null }
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
        let answers = this.state.answers;

        while(counter < this.state.questions.length){
            let questionsPerRow = [];

            if(counter < this.state.questions.length)  
                questionsPerRow.push(this.state.questions[counter]);
            else
                questionsPerRow.push(null);

            counter++;
            rowNumber++;

       
            allRows.push(this.oneRow(questionsPerRow, rowNumber, answers));

        }
        return <>
            <h1>{this.state.quiz.title}</h1>
            <img src = {this.state.quiz.imageURL}/>
            <h3>{this.state.quiz.description}</h3>
            {allRows}
            <br/>
            <Button id='submitTest' type="primary" onClick={this.handleClick}>Submit</Button> 
        </>;


    }
}

export default Quiz;