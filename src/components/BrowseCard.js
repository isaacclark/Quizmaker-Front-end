import React from 'react';
import {Card} from 'antd';
import '../App.css';


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
            <div onClick={this.handleClick}  >
                <Card className="browseCard" bordered={false} extra={"Author : " + this.props.author} hoverable={true} cover={<img src={this.props.imgSrc} />}>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.description}</p>
                </Card>
            </div>
        );
    }
}

export default BrowseCard;