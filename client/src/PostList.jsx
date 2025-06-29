import { useState, useEffect } from "react";
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4000/posts');
        setPosts(res.data);
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    console.log(posts)

    const renderdPosts = Object.values(posts).map(post => {
        return <div 
        className="card" 
        style={{width: '30%', marginBottom: '20px'}}
        key = {post.id}
        >
            <div className="card-body">
                <h3>{post.title}</h3>
            </div>

        </div>
    })

    return (<div className="container">
        {renderdPosts}
    </div>)
}

export default PostList;