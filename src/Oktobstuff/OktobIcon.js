import React from 'react';
import { Icon } from 'antd';

class OktobIcon extends React.Component {
    theme = "outline"

    constructor(props){
        super(props);
        this.state = {
            selected: props.selected
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.setState({selected : !this.state.selected})
    }

    render(){
        let theme;

        if(this.state.selected){
            theme = 'filled';
        }
        else{
            theme = 'outlined';
        }

        return <span><Icon type={this.props.type} onCLick={this.onClick} theme={theme} style={{color:'steelblue'}}/> &nbsp; {this.props.count}</span>;
    }
    
}

export default OktobIcon;