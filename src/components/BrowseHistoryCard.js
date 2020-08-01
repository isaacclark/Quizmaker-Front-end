import React from 'react';
import {Card} from 'antd';
import styles from'../App.css';

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

    render(){
        var timeDisplay = null
        if (this.props.time !== "00:00:00" && this.props.time !== undefined){
            timeDisplay = (this.props.time).slice(0, -3);
        }    
        return(
            <div onClick={this.handleClick} className={styles.BrowseHistoryCar} >
                <Card >
                    <h3 className={styles.browseTitle}>{this.props.title}</h3>
                    <img src={this.props.imgSrc}></img>
                    <h2>{this.props.score}</h2>
                    <h2 >{timeDisplay}</h2>                
                    <p>{this.props.description}</p>
                </Card>
            </div>
        );
    }
}

export default BrowseHistoryCard;