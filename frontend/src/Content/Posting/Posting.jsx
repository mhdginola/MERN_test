import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Post from '../../Component/Post/Post'
// import FormInput from '../../Component/FormInput/FormInput'
import './Posting.css'

export default class Posting extends Component {
  state={
    post:[],
    formInput:{
      id: 1,
      title: '',
      body: '',
      userId: ''
    },
    isUpdate: false
  }
  
  getPostAPI=()=>{
    axios.get('http://localhost:5000/posts?_sort=id&_order=desc')
      .then((res)=>{
        this.setState({
          post: res.data
        })
    })
  }

  handleRemove=(data)=>{
    axios.delete(`http://localhost:5000/posts/${data}`)
    .then((res)=>{
      this.getPostAPI();
    })
  }

  componentDidMount(){
    this.getPostAPI();
  }

    postDataToAPI =()=>{
        axios.post('http://localhost:5000/posts', this.state.formInput)
        .then((res)=>{
            this.getPostAPI();
            this.setState({
              formInput:{
                id: 1,
                title: '',
                body: '',
                userId: ''
              }
            })
        },(err)=>{
            console.log(err);
        })
    }

    handleFormChange =(e)=>{
        let formInputNew ={...this.state.formInput};
        let timeStamp = new Date().getTime();

        if(!this.state.isUpdate){
          formInputNew["id"]=timeStamp;
        }
        formInputNew[e.target.name] = e.target.value;

        this.setState({
            formInput: formInputNew
        },()=>{

        });
    }

    handleSubmit =()=>{
      if(this.state.isUpdate){
        this.putDataToAPI();
      }
      else{
        this.postDataToAPI();
      }
    }

    handleUpdate =(data)=>{
      this.setState({
        formInput: data,
        isUpdate: true
      })
    }

    putDataToAPI =()=>{
      axios.put(`http://localhost:5000/posts/${this.state.formInput.id}`, this.state.formInput)
      .then(()=>{
        this.getPostAPI();
        this.setState({
          isUpdate: false,
          formInput:{
            id: 1,
            title: '',
            body: '',
            userId: ''
          }
        })
      })
    }
  
  render() {
    return (
      <Fragment>
        {/* <FormInput/> */}
        <div className="container">
          <h1 className="head">INPUT DATA</h1>
          <div className="form" >
              <label htmlFor="title">Title</label>
              <input type="text" name="title" placeholder="masukkan title" onChange={this.handleFormChange} value={this.state.formInput.title}/>
              <label htmlFor="body">Body Content</label>
              <textarea name="body" id="body" cols="30" rows="10" placeholder='isi kontent' onChange={this.handleFormChange} value={this.state.formInput.body}></textarea>
              <button onClick={this.handleSubmit}>SIMPAN</button>
          </div>
        </div>
        {
          this.state.post.map((post)=>{
            return (
              <Post 
                key={post.id} 
                data={post}
                remove={this.handleRemove}
                update={this.handleUpdate}
                />
            )
          })
        }
      </Fragment>
    )
  }
}
