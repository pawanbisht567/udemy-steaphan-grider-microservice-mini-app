const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
const post = {};

const handleEvent = (type, data) => {
    if(type === 'PostCreated') {
        const { id, title } = data;
        post[id] = {
            id,
            title,
            comments: []
        }
    }
    
    if(type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        post[postId].comments.push({ id, content, status });
    }

    if(type === 'UpdateComment') {
        const { id, content, postId, status } = data;
        const comments = post[postId].comments;
        const comment = comments.find(comment => comment.id === id);
        if(comment) {
            comment.content = content;
            comment.status = status;
        }
    }
}

app.get('/posts', (req, res) => {
    return res.status(200).send(post);
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);
    console.log('Query post:', JSON.stringify(post));
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()

    res.send({ status: 'OK' })
})

app.listen(4002, async() => {
    console.log('Query app listening on port 4002');
    const res = await axios.get('http://localhost:4005/events');
    for(let event of res.data) {
        handleEvent(event.type, event.data);
    }
})