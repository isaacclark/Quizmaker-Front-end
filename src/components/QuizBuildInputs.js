import React from 'react'


const BuildCard = (props) =>{

    const handleChange = event => {
        props.onchange(event.target.value);
    }

//                  <button type="primary" name={deleteID }data-id={index} id={deleteID} onClick={handleChange}>Delete</button>
    return (
        props.questions.map((val, index) => {
            let questionID =`question-${index}`;
            let optionsID =`options-${index}`;
            let answersID =`answers-${index}`;
            let deleteID =`delete-${index}`;
            
            return(
                <div key={index}>
                    <label htmlFor={questionID}>{`question #${index +1}`}</label>
                    <input type = "text" name={questionID} data-id={index} id={questionID} className="question" />
                    <label htmlFor={optionsID}>Options</label>
                    <input type = "text" name={optionsID} data-id={index} id={optionsID} className="options" />
                    <label htmlFor={answersID}>Answers</label>
                    <input type = "text" name={answersID} data-id={index} id={answersID} className="answers" />

                </div>
            )
        })        
    )

}

export default BuildCard;