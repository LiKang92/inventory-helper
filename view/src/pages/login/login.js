import React from 'react'
import './css/login.less'
import logo from '../../static/imgs/logo.png'

const Login = () => {
  return (
    <div className='login'>
      <header>
        <img src={logo} alt='logo' />
        <h1>Invenroty-Helper</h1>
      </header> 
      <section>
        <h1>log in</h1>
      </section>
    </div>
  )
}

export default Login

