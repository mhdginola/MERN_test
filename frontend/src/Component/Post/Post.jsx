import React from 'react'
import './Post.css'
function Post(props) {
    return (
        <div>
            <div className="card">
                <h3 className="title">{props.data.title}</h3>
                <hr />
                <h5 className="id">{props.data.id}</h5>
                <p>{props.data.body}</p>
                <button className="remove" onClick={()=>props.remove(props.data.id)}>Remove</button>
                <button className="update" onClick={()=>props.update(props.data)}>Update</button>
            </div>
        </div>
    )
}

export default Post