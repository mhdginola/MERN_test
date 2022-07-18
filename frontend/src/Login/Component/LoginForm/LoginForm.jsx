import React, { Fragment } from 'react'
import './LoginForm.css'

function LoginForm() {
  return (
    <Fragment>
        <div className="login">            
            <h1>LOGIN</h1>
            <label htmlFor="user">User Name</label>
            <input type="text" name='user' id='user'/>
            <label htmlFor="pass">Password</label>
            <input type="password" name='pass' id='pass'/>
            <button id='login'>LOGIN</button>
        </div>
    </Fragment>
  )
}

export default LoginForm