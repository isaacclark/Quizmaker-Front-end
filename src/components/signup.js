import React from 'react';
import {
    Form,
    Input,
    Alert,
    Checkbox,
    Button,
} from 'antd';

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
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values)=> {
            if(!err){
                console.log('Received values of forms: ', values);

                fetch('https://api-backend-304cem.herokuapp.com/api/v1.0/users/signup', {
                    method: 'POST',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({values})
                }).then(res => {
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
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force:true});
        }
        callback();
    };
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty){
            form.validateFields(['confirm'], { force:true });
        }
        callback();
    };
    checkResponse = (data) => {

        if(this.state.addedSuccessfully){
            this.props.form.resetFields();
            this.setState({
                showSuccess:true,
                showError:false
            });
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
                    {getFieldDecorator('agreement', { 
                        valuePropName: 'checked',
                    })(
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>,
                    )}
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
        );
    }
};
    
const Signup = Form.create({ name: 'register'})(RegistrationForm);

export default Signup;