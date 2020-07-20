import React from 'react';
import { Card} from 'antd';
import OktobIcon from './OktobIcon';

class OktobCard extends React.Component{
    constructor(props){
        super(props);
        this.state ={

        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.clicked(this.props.id);
    }
    render(){
        let Meta = Card.Meta;

        return <Card
        style={{ width: 320}}
        cover={
            <img 
            alt={this.props.imgAlt}
            src={this.props.imgSrc}
            onClick={this.handleClick}
            />
        }
        actions={[
            <OktobIcon type="like" count={this.props.likes} selected={this.props.liked}/>,
            <OktobIcon type="message" count={this.props.comments}/>,
            <OktobIcon type="pushpin" selected={this.props.pinned}/>,

        ]}
    >
        <Meta
            title={this.props.title}
            description={this.props.description}
        />
    </Card>;
    }
}

export default OktobCard;