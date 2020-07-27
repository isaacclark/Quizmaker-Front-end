import React from 'react';
import {Card} from 'antd';


let answers = []

class BrowseCard extends React.Component{
    
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

export default BrowseCard;