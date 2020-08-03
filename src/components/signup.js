import React from 'react';
import {
    Form,
    Input,
    Alert,
    Checkbox,
    Button,
} from 'antd';
import '../App.css';

var userID = require('../data');

class RegistrationForm extends React.Component {
    state = {
        confirmDirty : false,
        addedSuccessfully : false,
        showSuccess: false,
        showError: false,
        errorCode: 400,
        responseStatus: "nothing",
        errorMessage:""
    };

    //reroute to login if login btn is clicked
    handleLoginClick = e => {
        return(
            this.props.changeState('Login')
        )
    }

    //when form is submitted
    handleSubmit = e => {
         //prevent event from performing it's default function
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values)=> {
            if(!err){

                fetch('https://api-backend-304cem.herokuapp.com/users/signup', {
                    method: 'POST',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({values})
                }).then(res => {
                     //only return result if the information is correct
                    if(res.ok)
                        this.setState({addedSuccessfully:true})
                    else
                        this.setState({
                            addedSuccessfully:false,
                            errorCode: res.status
                        });
                    return res.json()
                }).then(data => this.checkResponse(data))
            }
        });
        
    };
    /****************************************************************
    Title:OktobUI
    Author:Mahmoud Awad
    Date: 2019
    availability : https://github.coventry.ac.uk/ab8505/OktobUI/tree/homePage
  
    ****************************************************************/

    handleUserName = ()=> {
        this.setState({responseStatus:"nothing"})
    }

    handleEmail = ()=> {
        this.setState({responseStatus:"nothing"})
    }
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    //comparing the 2 passwords are the same
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force:true});
        }
        callback();
    };
    //checking if password meets requirements, i.e. length
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty){
            form.validateFields(['confirm'], { force:true });
        }
        callback();
    };
    checkResponse = (data) => {
        //returns the user to login once attempted
        //if all data is valid and the user is successfully created
        if(this.state.addedSuccessfully){
            this.props.form.resetFields();
            this.setState({
                showSuccess:true,
                showError:false
            });
            return(
                this.props.changeState('Login')
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
            //signup form
            <div>
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="signupForm">
                <Form.Item label="username" hasFeedback validateStatus={this.state.responseStatus} help={this.state.errorMessage}>
                    {getFieldDecorator('username', { 
                        rules: [
                        {
                            required:true,
                            message: 'Please input a username',
                        },
                    ],
                    })(<Input onChange={this.handleUserName} />)}
                </Form.Item>
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
                    })(<Input addonBefore={prefixEmail} onChange={this.handleEmail}  />)}
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
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('passwordConfirmation', { 
                        rules: [{
                            required:true,
                            message: 'Please confirm your password',
                        },
                        {
                            validator: this.compareToFirstPassword,
                        },
                    ],
                })(<Input.Password onBlur={this.handleConfirmBlur} /> )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={ () => { 
                    }}>
                        Register
                    </Button>
                </Form.Item>
                {this.state.showSuccess ? <Alert message="account created successfully" type="success" /> || this.invisible() : null}
                {this.state.showError ? <Alert message={this.state.errorMessage} type="error"/>  :null}
                
            </Form>
            <div className = "loginLink">
                <h3>Already have an account?</h3>
                <Button onClick = {this.handleLoginClick}>Login here</Button>
            </div>
            </div>
        );
    }
};
    
const Signup = Form.create({ name: 'register'})(RegistrationForm);

export default Signup;