import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import './css/login.less'
import logo from '../../static/imgs/logo.png'

const { Item } = Form
const Login = ({ form }) => {

  const getFieldDecorator = form.getFieldDecorator
  //不能用箭头
  function handleSubmit() {

  }

  function testClick() {
    console.log(getFieldDecorator);
  }


  return (
    <div className='login'>
      <header>
        <img src={logo} alt='logo' />
        <h1>Invenroty-Helper</h1>
      </header>
      <section>
        <h1>log in</h1>
        <Form onSubmit={handleSubmit} className="login-form">
          <Item>
            {/* 下面的大括号代表要写js表达式了 
            'username'代表标识，标识这个要装饰的东西
            */}
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' },
                { max: 12, message: 'username must less then 12 digits' },
                { min: 4, message: 'username must longer then 4 digis' },
                { pattern: /^\w+$/, message:'username must contains number, alphbets, underscore'}
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}

          </Item>
          <Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <Button type="primary"
              onClick={testClick}
              className="login-form-button">
              test
            </Button>
          </Item>
        </Form>
      </section>
    </div>
  )
}

export default Form.create()(Login)

