import React from 'react';
//import { OmitProps } from 'antd/lib/transfer/renderListBody'

class Hello extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            name : this.props.name,
            color: "black"
        }
        this.setColor = this.setColor.bind(this);
        this.revertColor = this.revertColor.bind(this);
    }

    setColor(){
        this.setState({color:"red"});
    }
    revertColor(){
        this.setState({color:"black"});
    }

    render(){
        var greeting;
        if (this.props.name === null || this.props.name === ""){
            greeting = 'Hello world';
        }
        else{
            greeting = 'Hello ' + this.props.name;
        }
        return <h1 onMouseEnter ={this.setColor} onMouseLeave={this.revertColor} style={{color:this.state.color}}>{greeting}</h1>
    }
}

export default Hello;