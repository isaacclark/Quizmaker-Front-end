import React from 'react';
import {Card} from 'antd';
import '../App.css';

class BrowseHistoryCard extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {     
        }

        this.handleClick = this.handleClick.bind(this);
    }

    //calback function to return the id of the quiz selected to the parent component
    handleClick = () => {
        return(
            this.props.selectID(this.props.id)
        )
    }

    //returns the entire card
    cardReport(){
        var timeDisplay = null
        //if time wasn't set to 0 by user and the quiz wasn't completed so the time prop isn't null
        if (this.props.time !== "00:00:00" && this.props.time !== undefined){
            //remove the last 3 characters of the time string as this is
            //how it's converted from hh:mm:ss to mm:ss
            timeDisplay = (this.props.time).slice(0, -3);
        }    
        //if open props is true, display the time remaining as the quiz won't have been graded
        if(this.props.open === true){
            return<>
                    <Card className="browseHistoryCard" onClick={this.handleClick} extra={"Author : " + this.props.author} hoverable={true} cover={<img src={this.props.imgSrc} />}>
                        <h3>{this.props.title}</h3>
                        <h2>{timeDisplay}</h2>                
                        <p>{this.props.description}</p>
                    </Card>
                </>
        }
        //if open props is false, display score as there is no need to display time left 
        //when quiz is completed
        else{
            return<>
                    <Card className="browseHistoryCard"  extra={"Author : " + this.props.author} hoverable={true} cover={<img src={this.props.imgSrc} />}>
                        <h3>{this.props.title}</h3>
                        <h2>{this.props.score}</h2>             
                        <p>{this.props.description}</p>
                    </Card>
                </>
        }

    }


    render(){
        //assign var to the function
        let browseCard = this.cardReport()
        return(
            //if element is clicked go to handleClick()
            <div onClick={this.handleClick}>
                {browseCard}
            </div>
        )
    }
}

export default BrowseHistoryCard;