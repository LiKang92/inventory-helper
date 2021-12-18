import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import './css/login.less'
import logo from '../../static/imgs/logo.png'

const { Item } = Form
const Login = ({ form }) => {

  const getFieldDecorator = form.getFieldDecorator
  //不能用箭头
  function handleSubmit(event) {
    //阻止默认事件--禁止form表单提交--通过ajax提交
    event .preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  function testClick() {
    console.log(getFieldDecorator);
  }

  // 验证器式验证，与之相对的是声明式
  function pwdValidator(rule, value, callback) {
    if(!value){
      callback('password cannot be empty')
    }else if(value.length < 4){
      callback('password must longer then 4 digis')
    }else if(value.length > 12){
      callback('password must less then 12 digits')
    } else if (!(/^\w+$/).test(value)){
      callback('password must contains number, alphbets, underscore')
    }else{
      callback()
      // callback 方法必须被调用，即使一切顺利通过验证也要调用，这是规定
    }
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
              rules: [{ validator : pwdValidator }],
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

