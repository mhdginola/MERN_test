import axios from 'axios';
import React, { Component, Fragment } from 'react'
import './FormInput.css'

class FormInput extends Component {
    state ={
        formInput:{
            id: 1,
            title: '',
            body: '',
            userId: ''
        }
    }

    postDataToAPI =()=>{
        axios.post('http://localhost:5000/posts', this.state.formInput)
        .then((res)=>{
            console.log(res);
        },(err)=>{
            console.log(err);
        })
    }

    handleFormChange =(e)=>{
        let formInputNew ={...this.state.formInput};
        let timeStamp = new Date().getTime();

        formInputNew["id"]=timeStamp;
        formInputNew[e.target.name] = e.target.value;

        this.setState({
            formInput: formInputNew
        },()=>{

        });
    }

    handleSubmit =()=>{
        this.postDataToAPI();
    }

    render(){
        return (
            <Fragment>
                <h1 className="head">INPUT DATA</h1>
                <div className="form" >
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="masukkan title" onChange={this.handleFormChange}/>
                    <label htmlFor="body">Body Content</label>
                    <textarea name="body" id="body" cols="30" rows="10" placeholder='isi kontent' onChange={this.handleFormChange}></textarea>
                    <button onClick={this.handleSubmit}>SIMPAN</button>
                </div>
            </Fragment>
        )
    }
}

export default FormInput