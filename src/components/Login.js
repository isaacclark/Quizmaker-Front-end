import React from 'react';
import {
    Form,
    Input,
    Alert,
    Checkbox,
    Button,
} from 'antd';
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
    handleSubmit = e => {
       e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values)=> {
            if(!err){
                fetch('https://api-backend-304cem.herokuapp.com/api/v1.0/users/login', {
                    method: 'POST',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }).then(res => res.json())
                .then((result) => {
                    if(result != null){
                        this.setState({showSuccess:true})
                        this.checkResponse(result)
                    }
                    else{
                        this.setState({
                            showSuccess:false,
                            errorCode: result.status
                        });
                        //return {message: "Email or password incorrect"}
                    }
                })//.then(data => {this.checkResponse(data)})
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
    checkResponse = (data) => { 
        if(this.state.showSuccess){
            this.setState({
                showSuccess:true,
                showError:false,
            });
            userID.userID = data.id;
            userID.userName=data.username;
            console.log(data)
            return(
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

        const prefixEmail = getFieldDecorator('email')(
            <h4>@</h4>,
        );

        return(
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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