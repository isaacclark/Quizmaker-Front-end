import React from 'react'
import '../App.css'

const BuildCard = (props) =>{

    const handleChange = event => {
        props.onchange(event.target.value);
    }

    /********************************************************* 
     * Title: Building a Dynamic, Controlled Form with React
     * Author: Mike Cronin
     * Date: Jul 5, 2018
     * Availability: https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
    ***********************************************************/
    //adapted for my use, each input has it's own label
    return (
        //each value is given an index through the mapping
        props.questions.map((val, index) => {
            let questionID =`question-${index}`;
            let optionsID =`options-${index}`;
            let answersID =`answers-${index}`;
            
            return(
                <div key={index} className="buildInputs">
                    <div className="buildQuestion">
                        <label htmlFor={questionID}>{`question number ${index +1}`}</label>
                        <input type = "text" name={questionID} data-id={index} id={questionID} className="question" />
                    </div>
                    <div className="buildAnswers">
                        <label htmlFor={optionsID}>Options</label>
                        <input type = "text" name={optionsID} data-id={index} id={optionsID} className="options" />
                        <label htmlFor={answersID}>Answers</label>
                        <input type = "text" name={answersID} data-id={index} id={answersID} className="answers" />
                    </div>
                </div>
            )
        })        
    )

}

export default BuildCard;