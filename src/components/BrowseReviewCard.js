import React from 'react';
import {Checkbox, Card} from 'antd';

let answers = []

class BrowseReviewCard extends React.Component{
    
    constructor(props){
        super(props);
    
        this.state = {
            
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
    
    }

    render(){
        let Meta = Card.Meta;
        return(
            <div onClick={this.handleClick}>
                <Card>
                    <h3>{this.props.title}</h3>
                    <img src={this.props.imgSrc}></img>
                    <p>{this.props.description}</p>
                </Card>
            </div>
        );
    }
}

export default BrowseReviewCard;