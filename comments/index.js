const  express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

const commentsByPostId = {
    
}

app.use(express.json())
app.use(cors())
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});


app.post('/events', (req, res) => {
    console.log('Received event:', req.body);
    res.send({ status: 'OK' });
})

app.post('/post/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    // req.params.id is the Post's Id
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;
    axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    }).then((data) => {
        console.log('Event sent to event bus:', data.data);
    }).catch(err => {console.log('Error sending event:', err.response?.status)})
    res.status(201).send({comments, commentsByPostId});
});

app.listen(4001, () => {
    console.log('Server running at 4001')
})