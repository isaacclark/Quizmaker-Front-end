import React from 'react';
import {Form,Input,Alert,Button} from 'antd';
import '../App.css';
var userID = require('../data');

class LoginForm extends React.Component {
    state = {
        userID: userID.userID,
        showSuccess: false,
        showError: false,
        errorCode: 400,
        responseStatus: "nothing",
        errorMessage:""
    };

    //when form is submitted
    handleSubmit = e => {
        //prevent event from performing it's default function
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values)=> {
            //validate login info against db
            if(!err){
                fetch('https://api-backend-304cem.herokuapp.com/users/login', {
                    method: 'POST',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }).then(res => res.json())
                .then((result) => {
                    //only return result if the information is correct
                    if(result != null){
                        this.setState({showSuccess:true})
                        this.checkResponse(result)
                    }
                    else{
                        this.setState({
                            showSuccess:false,
                            errorCode: result.status
                        });
                        alert("Email or password incorrect")
                    }
                })
            }
        });
    };

    handleEmail = ()=> {
        this.setState({responseStatus:"nothing"})
    }
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    //once login handleSumbit has been completed
    checkResponse = (data) => { 
        if(this.state.showSuccess){
            this.setState({
                showSuccess:true,
                showError:false,
            });
            //set the user id to the userID golbal variable
            userID.userID = data.id;
            userID.userName=data.username;
            return(
                //change state to browse
                this.props.changeState('Browse')
            )
        }
        else{
            this.setState({
                errorMessage: data.message,
                showSuccess:false,
                showError:true,
                responseStatus: "error"
            });
        }
    }

    render() {
        // https://github.coventry.ac.uk/ab8505/OktobUI/tree/homePage
        //formatting for the form we learnt in the labs
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span:24},
                sm: {span:8},
            },
            wrapperCol: {
                xs: {span:24},
                sm: {span:16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span:16,
                    offset:8,
                },
            },
        };

        //add this prefix before the email input
        const prefixEmail = getFieldDecorator('email')(
            <h4>@</h4>,
        );

        return(
            //Login form
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="loginForm">
                <Form.Item label="Email" hasFeedback validateStatus={this.state.responseStatus} help={this.state.errorMessage}>
                    {getFieldDecorator('email', { 
                        rules: [{
                            type: 'email',
                            message: 'The input is not a valid email',
                        },
                        {
                            required:true,
                            message: 'Please input your email',
                        },
                    ],
                    })(<Input addonBefore={prefixEmail} onChange={this.handleEmail} />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', { 
                        rules: [{
                            required: true,
                            message: 'Please input your password',
                        },
                        {
                            min:6,
                            message: 'Password should be atleast 6 characters long',
                        },
                        {
                            validator: this.validateToNextPassword,
                        },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={ () => { 
                    }}>
                        Login
                    </Button>
                </Form.Item>
                {this.state.showSuccess ? <Alert message="successfully logged in" type="success" /> || this.invisible() : null}
                {this.state.showError ? <Alert message={this.state.errorMessage} type="error"/>  :null}
            </Form>
        );
    }
};
    
const Login = Form.create({ name: 'login'})(LoginForm);

export default Login;