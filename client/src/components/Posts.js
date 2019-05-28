import React from "react";
import axios from "axios";
import Post from "./Post";

class Posts extends React.Component {
    constructor() {
        super();
        this.state={
            posts : []
        }
    }

    componentDidMount() {
        axios
        .get('http://localhost:5000/api/posts/')
        .then(res => {
            console.log(res.data)
            this.setState({
                posts : res.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return(
            <div>
                {this.state.posts.map( post => (
                    <Post post={post}/>
                ))}
            </div>
        )
    }
}

export default Posts;