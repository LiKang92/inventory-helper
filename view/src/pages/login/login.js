import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import './css/login.less'
import logo from '../../static/imgs/logo.png'

const {Item} = Form
const Login = () => {
  return (
    <div className='login'>
      <header>
        <img src={logo} alt='logo' />
        <h1>Invenroty-Helper</h1>
      </header>
      <section>
        <h1>log in</h1>
        <Form  className="login-form">
          <Item>
            {/* 下面的大括号代表要写js表达式了 */}
            
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            
          </Item>
          <Item>
            
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Item>
        </Form>
      </section>
    </div>
  )
}

export default Login

