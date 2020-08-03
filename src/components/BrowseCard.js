import React from 'react';
import {Card} from 'antd';
import '../App.css';

class BrowseCard extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            
        }
        this.handleClick = this.handleClick.bind(this);
    }

    //returns the id of the component clicked to parent
    handleClick = () => {
        return(
            this.props.selectID(this.props.id)
        )
    }

    render(){
        return( //displays all props in an antD card element, if clicked will trigger the handleClick function
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