const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
const post = {};

app.get('/posts', (req, res) => {
    return res.status(200).send(post);
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if(type === 'PostCreated') {
        const { id, title } = data;
        post[id] = {
            id,
            title,
            comments: []
        }
    }
    
    if(type === 'CommentCreated') {
        const { id, content, postId } = data;
        post[postId].comments.push({ id, content });
    }
    console.log(post)
    res.send({ status: 'OK' })
})

app.listen(4002, () => {
    console.log('Query app listening on port 4002')
})