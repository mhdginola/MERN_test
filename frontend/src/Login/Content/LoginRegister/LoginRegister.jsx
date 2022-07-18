import React, { Fragment, Component, useEffect } from 'react'
import axios from 'axios'
import './LoginRegister.css'

export default class LoginRegister extends Component {
  componentDidMount(){
    axios.defaults.withCredentials=true;
    axios.get("http://localhost:5000/login4")
    .then((respon)=>{
      console.log(respon.data.user);
      if(respon.data.loggedIn){
        this.setState({
          loginStatus: respon.data.user
        })
      }
      else{
        this.setState({
          loginStatus: respon.data.loggedIn
        })
      }
    });
  }
  state={
    post:[],
    formInput:{
      name:'',
      password:''
    },
    loginStatus:'ttt'
  }

  st =(pol)=>{
    this.setState({
      loginStatus: pol
    },()=>{

    });
  }

  handleRegister=()=>{
    this.postDataToAPI();
    // console.log(this.state.formInput);
  }

  postDataToAPI =()=>{
    axios.post('http://localhost:5000/reg', this.state.formInput)
    .then((res)=>{
        this.setState({
          formInput:{
            name:'',
            password:''
          }
        })
    },(err)=>{
        console.log(err);
    })
  }

  handleFormChange =(e)=>{
    let formInputNew ={...this.state.formInput};
    // let timeStamp = new Date().getTime();

    // if(!this.state.isUpdate){
    //   formInputNew["id"]=timeStamp;
    // }
    formInputNew[e.target.name] = e.target.value;

    this.setState({
        formInput: formInputNew
    },()=>{

    });
}

  handleLogin =()=>{
    this.postDataToAPI2();    
  }
  postDataToAPI2 =()=>{
    axios.post('http://localhost:5000/login4', this.state.formInput)
    .then((res)=>{
        this.setState({
          formInput:{
            name:'',
            password:''
          }
        });
        if(res.data.msg){
          this.st(res.data.msg);
        }
        else{
          // this.st(res.data[0].name);
          axios.get("http://localhost:5000/login4")
    .then((respon)=>{
      console.log(respon.data.user);
      if(respon.data.loggedIn){
        this.setState({
          loginStatus: respon.data.user
        })
      }
      else{
        this.setState({
          loginStatus: respon.data.loggedIn
        })
      }
    });
        }
    },(err)=>{
        console.log(err);
    })
  }

  // useEffect(()=>{
  //   axios.get("http://localhost:5000/login4")
  //   .then((respon)=>{
  //     console.log(respon);
  //   });
  // },[]);

  render(){
  return (
    <Fragment>
      <div className="container">
        <div className="register">
            <h1>REGISTER</h1>
            <label htmlFor="name">User Name</label>
            <input type="text" name='name' placeholder='masukan nama user' onChange={this.handleFormChange} value={this.state.formInput.name}/>
            <label htmlFor="pass">Password</label>
            <input type="password" name='password' placeholder='masukan password' onChange={this.handleFormChange} value={this.state.formInput.password}/>
            <button id='register' onClick={this.handleRegister}>REGISTER</button>
        </div>  
        <div className="login">            
            <h1>LOGIN</h1>
            <label htmlFor="name">User Name</label>
            <input type="text" name='name' placeholder='masukan nama user' onChange={this.handleFormChange} value={this.state.formInput.name}/>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' placeholder='masukan password' onChange={this.handleFormChange} value={this.state.formInput.password}/>
            <button id='login' onClick={this.handleLogin}>LOGIN</button>
        </div>
        <div className="status">status : {this.state.loginStatus}</div>
      </div>
    </Fragment>
  )
}
}
