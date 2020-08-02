import React from 'react';
import {Card} from 'antd';
import '../App.css';

let answers = []

class BrowseHistoryCard extends React.Component{
    
    constructor(props){
        super(props);
    
        this.state = {
            
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        return(
            this.props.selectID(this.props.id)
        )
    }

    cardReport(){
        var timeDisplay = null
        if (this.props.time !== "00:00:00" && this.props.time !== undefined){
            timeDisplay = (this.props.time).slice(0, -3);
        }    
        console.log(timeDisplay)
        console.log(this.props.open)
        if(this.props.open === true){
            return<>
                    <Card className="browseHistoryCard" onClick={this.handleClick} extra={"Author : " + this.props.author} hoverable={true} cover={<img src={this.props.imgSrc} />}>
                        <h3>{this.props.title}</h3>
                        <h2>{timeDisplay}</h2>                
                        <p>{this.props.description}</p>
                    </Card>
                </>
        }
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
        let browseCard = this.cardReport()
        return(
            <div onClick={this.handleClick}>
                {browseCard}
            </div>
        )
    }
}

export default BrowseHistoryCard;