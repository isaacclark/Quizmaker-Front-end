import React from 'react';
import { Card, Radio} from 'antd';

class QuestCard extends React.Component{
    state = {
        value = 1,
    };

    constructor(props){
        super(props);
        this.state ={
            value: e.target.value,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.clicked(this.props.id);
    }
    render(){
        let Meta = Card.Meta;

        return <Card
        style={{ width: 800}}
        cover={
            <img 
            alt={this.props.imgAlt}
            src={this.props.imgSrc}
            onClick={this.handleClick}
            />
        }
    >
        <Meta
            title={this.props.title}
            description={this.props.description}

        />
    </Card>;
    }
}

export default QuestCard;