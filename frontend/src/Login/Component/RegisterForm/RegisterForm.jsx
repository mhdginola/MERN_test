import React, { Fragment } from 'react'
import './RegisterForm.css'

function RegisterForm() {
  return (
    <Fragment>
        <div className="register">
            <h1>REGISTER</h1>
            <label htmlFor="user">User Name</label>
            <input type="text" name='user' id='user' placeholder='masukan nama user'/>
            <label htmlFor="pass">Password</label>
            <input type="password" name='pass' id='pass' placeholder='masukan password'/>
            <button id='register'>REGISTER</button>
        </div>  
    </Fragment>
  )
}

export default RegisterForm