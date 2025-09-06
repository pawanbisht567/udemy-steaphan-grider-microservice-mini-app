import React, { useState } from "react";

const CommentList = ({ commentsList }) => {

    const [comments, setComments] = useState(commentsList);

    // const fetchData = async () => {
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     setComments(res.data)
    // }

    // useEffect(() => {
    //     fetchData();
    // }, [])

    const renderedComments = comments.map(comment => {
        console.log('Comment:', comment);
        let commentContent = '';
        switch(comment.status) {
            case 'approved':
                commentContent = comment.content;
                break;
            case 'rejected':
                commentContent = 'Comment has been rejected';
                break;
            case 'pending':
                commentContent = 'Comment is being moderated';
                break;
            default:
                commentContent = 'Comment is being moderated';        
        }
        return <li key ={comment.id}>{commentContent}</li>
    })
    return <div>{renderedComments}</div>
}

export default CommentList;