import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ commentsList }) => {

    const [comments, setComments] = useState(commentsList);

    // const fetchData = async () => {
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     setComments(res.data)
    // }

    useEffect(() => {
        // fetchData();
    }, [])

    const renderedComments = comments.map(comment => {
        return <li key ={comment.id}>{comment.content}</li>
    })
    return <div>{renderedComments}</div>
}

export default CommentList;