import React, { Component } from 'react';
import {
  Form, Icon, Input, Button, Typography, Modal
} from 'antd';

const { Title } = Typography;

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.auth = this.props.auth;
    this.app = this.props.app;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.auth.login(values, (success) => {
          if (success) {
            this.app.forceUpdate();
          } else {
            Modal.error({
              title: 'Authentication failed',
              content: 'Please check your username and password',
            });
          }
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          <Title style={{ textAlign:'center' }}>Welcome</Title>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'normal_login' })(LoginForm);