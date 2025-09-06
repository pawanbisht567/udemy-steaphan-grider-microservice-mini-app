const  express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

const commentsByPostId = {}

app.use(express.json())
app.use(cors())
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});


app.post('/events', (req, res) => {
    console.log('Received event:', req.body);
    const event = req.body;
    if(event.type === 'CommentModerated') {
        const { id, status, postId } = event.data;
        const comments = commentsByPostId[postId];
        let comment;
        if(comments) {
            comment = comments.find(comment => {
                return comment.id === id;
            });
            if(comment) {
                comment.status = status;
            }
        }
        axios.post('http://localhost:4005/events', {
            type: 'UpdateComment',
            data: {
                ...event.data,
            }
        }).then((data) => {
            console.log('Event sent to event bus:', data.data);
        }).catch(err => {console.log('Error sending event:', err.response?.status)});
    }
    res.send({ status: 'OK' });
})



app.post('/post/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    // req.params.id is the Post's Id
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: 'pending' });

    commentsByPostId[req.params.id] = comments;

    // Throws event to event bus running on 4005 port number
    axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending',
        }
    }).then((data) => {
        console.log('Event sent to event bus:', data.data);
    }).catch(err => {console.log('Error sending event:', err.response?.status)})
    res.status(201).send({comments, commentsByPostId});
});

app.listen(4001, () => {
    console.log('Server running at 4001')
})